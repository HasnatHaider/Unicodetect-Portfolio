import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { mailHtmlFormater } from "./mail-template.js";

const json = (data, status = 200) =>
  Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const limits = {
  name: 120,
  email: 254,
  phone: 40,
  company: 160,
  message: 2000,
};
const quotaScript = `local n = redis.call('INCR', KEYS[1]); if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end; return n`;

export function createContactHandler({
  env = process.env,
  fetcher = fetch,
  now = Date.now,
} = {}) {
  const sign = (value) =>
    createHmac("sha256", env.CONTACT_TOKEN_SECRET).update(value).digest("hex");
  async function redis(command) {
    const response = await fetcher(env.UPSTASH_REDIS_REST_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      signal: AbortSignal.timeout(5000),
    });
    const data = await response.json();
    if (!response.ok || data.error)
      throw new Error("Quota service unavailable");
    return data.result;
  }
  return async function handle(request) {
    if (!["GET", "POST"].includes(request.method))
      return new Response(null, {
        status: 405,
        headers: { Allow: "GET, POST" },
      });
    const origin = env.SITE_URL || "https://unicodetech-react.vercel.app";
    if (
      (request.headers.get("origin") &&
        request.headers.get("origin") !== origin) ||
      request.headers.get("sec-fetch-site") === "cross-site" ||
      (request.method === "POST" && request.headers.get("origin") !== origin)
    )
      return json({ success: false }, 403);
    if (
      !env.PUSH_API_KEY ||
      !env.CONTACT_TOKEN_SECRET ||
      env.CONTACT_TOKEN_SECRET.length < 32 ||
      !env.UPSTASH_REDIS_REST_URL ||
      !env.UPSTASH_REDIS_REST_TOKEN
    )
      return json(
        {
          success: false,
          error:
            "Contact service is unavailable. Please email info@unicodetech.com.",
        },
        503,
      );
    // Vercel supplies this trusted forwarding header; never accept an IP from the body.
    const ip = request.headers
      .get("x-vercel-forwarded-for")
      ?.split(",")[0]
      ?.trim();
    if (!ip) return json({ success: false }, 503);
    const identity = sign(ip);
    try {
      const quota = await redis([
        "EVAL",
        quotaScript,
        "1",
        `contact:${request.method}:${identity}:${Math.floor(now() / 3600000)}`,
        "3600",
      ]);
      if (!Number.isFinite(Number(quota)) || Number(quota) < 1)
        throw new Error("Invalid quota response");
      if (quota > (request.method === "GET" ? 30 : 5))
        return new Response(
          JSON.stringify({ success: false, error: "Please try again later." }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
              "Retry-After": "3600",
            },
          },
        );
      if (request.method === "GET") {
        const value = `${now()}.${randomBytes(16).toString("hex")}`;
        return json({ token: `${value}.${sign(`${identity}:${value}`)}` });
      }
      if (!request.headers.get("content-type")?.startsWith("application/json"))
        return json({ success: false }, 415);
      if (Number(request.headers.get("content-length")) > 16000)
        return json({ success: false }, 413);
      // Bound reads even for a body without Content-Length.
      const reader = request.body?.getReader();
      if (!reader) return json({ success: false }, 400);
      let bytes = 0;
      const chunks = [];
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        bytes += chunk.value.byteLength;
        if (bytes > 16000) {
          await reader.cancel();
          return json({ success: false }, 413);
        }
        chunks.push(Buffer.from(chunk.value));
      }
      let body;
      try {
        body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch {
        return json({ success: false }, 400);
      }
      if (!body || typeof body !== "object" || Array.isArray(body))
        return json({ success: false }, 400);
      if (body.website) return json({ success: false }, 400);
      const details = {};
      for (const [key, max] of Object.entries(limits)) {
        if (typeof body[key] !== "string") return json({ success: false }, 400);
        details[key] = body[key].trim();
        if (!details[key] || details[key].length > max)
          return json({ success: false }, 400);
      }
      if (!emailPattern.test(details.email))
        return json({ success: false }, 400);
      const match =
        typeof body.token === "string" &&
        body.token.match(/^(\d{13})\.([a-f0-9]{32})\.([a-f0-9]{64})$/);
      if (!match) return json({ success: false }, 400);
      const age = now() - Number(match[1]);
      const expected = sign(`${identity}:${match[1]}.${match[2]}`);
      if (
        age < 1500 ||
        age > 3600000 ||
        !timingSafeEqual(Buffer.from(expected), Buffer.from(match[3]))
      )
        return json({ success: false }, 400);
      const reserved = await redis([
        "SET",
        `contact:used:${match[3]}`,
        "1",
        "EX",
        "3600",
        "NX",
      ]);
      if (reserved !== "OK") return json({ success: false }, 409);
      const result = await fetcher(
        "https://dev-push-notification-backend.vercel.app/api/notification/send-mail-push",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": env.PUSH_API_KEY,
          },
          signal: AbortSignal.timeout(20000),
          body: JSON.stringify({
            from: "UnicodeTech",
            mails: "info@unicodetech.com",
            subject: `Project inquiry from ${details.name} — ${details.company}`
              .replace(/[\r\n]/g, " ")
              .slice(0, 240),
            htmlContent: mailHtmlFormater(details),
          }),
        },
      );
      const response = await result.json();
      if (!result.ok || response?.success !== true)
        return json({ success: false }, 502);
      return json({ success: true });
    } catch {
      // Do not log contact details, tokens or provider errors that could contain secrets.
      console.error("Contact service request failed");
      return json(
        { success: false, error: "Contact service is unavailable." },
        503,
      );
    }
  };
}
