export async function getContactToken() {
  const response = await fetch("/api/contact", {
    signal: AbortSignal.timeout(10000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Contact service is unavailable.");
  const data = await response.json();
  return data.token;
}
export async function sendMailHelper({ body, token, website }) {
  const issued = Number(String(token).split(".")[0]);
  const remaining = Math.min(1600, 1600 - (Date.now() - issued));
  if (remaining > 0)
    await new Promise((resolve) => setTimeout(resolve, remaining));
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: AbortSignal.timeout(30000),
    body: JSON.stringify({ ...body, token, website }),
  });
  const result = await response.json();
  if (!response.ok || result.success !== true)
    throw new Error("The message could not be sent.");
  return result;
}
