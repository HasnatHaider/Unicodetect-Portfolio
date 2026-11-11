const escapeHtml = (value = "") =>
  String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

export const mailHtmlFormater = (body) => {
  const rows = [
    ["Full name", body.name],
    ["Email address", body.email],
    ["Phone number", body.phone],
    ["Company", body.company],
  ]
    .map(
      ([label, value]) => `
    <tr>
      <th scope="row" align="left" valign="top" style="padding:14px 16px;border-bottom:1px solid #eceef1;color:#666c76;font-size:13px;font-weight:500;width:130px;">${label}</th>
      <td valign="top" style="padding:14px 16px;border-bottom:1px solid #eceef1;color:#151820;font-size:14px;line-height:1.6;word-break:break-word;">${escapeHtml(value)}</td>
    </tr>`,
    )
    .join("");
  const message = escapeHtml(body.message).replace(/\r\n|\r|\n/g, "<br />");
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>New project inquiry — UnicodeTech</title></head>
<body style="margin:0;padding:0;background:#f4f2ef;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">A new project inquiry from ${escapeHtml(body.name)} at ${escapeHtml(body.company)}.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f2ef;">
    <tr><td align="center" style="padding:28px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border:1px solid #e5e2de;border-radius:16px;background:#ffffff;overflow:hidden;">
        <tr><td style="padding:30px 28px;background:#111318;border-top:4px solid #f55733;">
          <p style="margin:0 0 22px;font-size:22px;font-weight:700;color:#ffffff;">Unicode<span style="color:#ff6947;">Tech</span></p>
          <p style="margin:0 0 12px;color:#ff9a80;font-size:11px;letter-spacing:2px;font-weight:700;">WEBSITE CONTACT FORM</p>
          <h1 style="margin:0;font-size:28px;line-height:1.3;color:#ffffff;">New project inquiry</h1>
          <p style="margin:14px 0 0;color:#c4c8d0;font-size:14px;line-height:1.7;word-break:break-word;">${escapeHtml(body.name)} has shared a project with your team.</p>
        </td></tr>
        <tr><td style="padding:28px 24px 12px;">
          <h2 style="margin:0 0 16px;font-size:17px;color:#151820;">Contact details</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#fafafa;border:1px solid #eceef1;">${rows}</table>
        </td></tr>
        <tr><td style="padding:16px 24px 28px;">
          <h2 style="margin:0 0 14px;font-size:17px;color:#151820;">Project details</h2>
          <div style="padding:20px;background:#fff6f1;border-left:3px solid #f55733;color:#343941;font-size:14px;line-height:1.8;word-break:break-word;">${message}</div>
          <p style="margin:20px 0 0;font-size:12px;line-height:1.7;color:#737983;">Use the contact information above to follow up on this inquiry.</p>
        </td></tr>
        <tr><td style="padding:20px 24px;border-top:1px solid #eceef1;background:#fafafa;">
          <p style="margin:0;color:#737983;font-size:11px;line-height:1.7;">Submitted through the UnicodeTech website contact form.<br />This email contains information provided by the sender.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
};
