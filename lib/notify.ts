interface NotifyConfig {
  resendApiKey?: string;
  adminEmail?: string;
  webhookUrl?: string;
  adminPhone?: string;
}

export async function sendInstantAlert(
  config: NotifyConfig,
  subject: string,
  body: string,
  submission: Record<string, any>
) {
  const results: string[] = [];

  if (config.resendApiKey && config.adminEmail) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(config.resendApiKey);
      await resend.emails.send({
        from: "RYDI Transport <hauls@rydi-transport.ca>",
        to: [config.adminEmail],
        subject,
        text: body,
        html: `<pre style="font-family:sans-serif;line-height:1.6">${body.replace(/\n/g, "<br>")}</pre>`,
      });
      results.push("Email sent");
    } catch (e: any) {
      results.push(`Email failed: ${e.message}`);
    }
  }

  if (config.webhookUrl) {
    try {
      await fetch(config.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: config.adminPhone,
          message: `RYDI LEAD: ${submission.name || submission.contactName || "New request"} - ${submission.phone || "no phone"}. Check email NOW.`,
          submission,
        }),
      });
      results.push("Webhook triggered");
    } catch (e: any) {
      results.push(`Webhook failed: ${e.message}`);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("🔥 RYDI TRANSPORT — NEW LEAD ALERT");
  console.log("=".repeat(50));
  console.log(body);
  console.log("=".repeat(50) + "\n");
  results.push("Console logged");

  return results;
}
