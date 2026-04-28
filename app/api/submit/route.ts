import { NextRequest, NextResponse } from "next/server";
import { addSubmission } from "@/lib/store";
import { sendInstantAlert } from "@/lib/notify";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const formType = data.formType || "general";

    const submission = {
      id: crypto.randomUUID(),
      formType,
      data,
      submittedAt: new Date().toISOString(),
    };

    addSubmission(submission);

    const name = data.name || data.contactName || "Unknown";
    const phone = data.phone || "No phone";
    const email = data.email || "No email";
    const pickup = data.pickup || "N/A";
    const dropoff = data.dropoff || "N/A";
    const loadType = data.loadType || data.jobDetails || "N/A";
    const timeline = data.timeline || data.frequency || "N/A";

    const subject = `🔥 NEW RYDI LEAD — ${formType.toUpperCase()} from ${name}`;
    const body = `
FORM TYPE: ${formType.toUpperCase()}
NAME: ${name}
PHONE: ${phone}
EMAIL: ${email}
PICKUP: ${pickup}
DROPOFF: ${dropoff}
LOAD / JOB: ${loadType}
TIMELINE: ${timeline}
DETAILS: ${data.details || data.notes || "N/A"}
SUBMITTED: ${submission.submittedAt}
ID: ${submission.id}
    `.trim();

    const notifyResults = await sendInstantAlert(
      {
        resendApiKey: process.env.RESEND_API_KEY,
        adminEmail: process.env.ADMIN_EMAIL,
        webhookUrl: process.env.WEBHOOK_URL,
        adminPhone: process.env.ADMIN_PHONE,
      },
      subject,
      body,
      data
    );

    return NextResponse.json(
      { success: true, id: submission.id, alerts: notifyResults },
      { status: 200 }
    );
  } catch (error) {
    console.error("[RYDI] Submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
