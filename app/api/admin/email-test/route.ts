import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, unauthorized, forbidden } from "@/lib/auth";
import { emailConfigStatus, sendNotificationEmail, renderEmail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const me = await getCurrentUser();
  if (!me) return unauthorized();
  if (me.role !== "OWNER") return forbidden();

  // 1) database check
  let database: Record<string, unknown>;
  try {
    const [messages, applications] = await Promise.all([prisma.contactMessage.count(), prisma.jobApplication.count()]);
    database = { ok: true, savedEnquiries: messages, savedApplications: applications };
  } catch (err) {
    database = { ok: false, problem: err instanceof Error ? err.message : String(err) };
  }

  // 2) email check
  const status = emailConfigStatus();
  if (!status.configured) {
    return NextResponse.json({
      email: {
        ok: false,
        problem: "Email settings are missing on THIS deployment.",
        missing: status.missing,
        fix: "Add them in Vercel → Settings → Environment Variables (Production), then redeploy.",
      },
      database,
    });
  }

  const result = await sendNotificationEmail({
    subject: "JSS website — test email",
    text: "If you can read this, enquiry emails from your website are working.",
    html: renderEmail("Test email from your website", [["Status", "Email notifications are working"]]),
  });

  return NextResponse.json({
    email: result.sent
      ? { ok: true, message: `Test email sent to ${process.env.CONTACT_NOTIFY_TO}. Check the inbox and the Spam folder.` }
      : {
          ok: false,
          problem: result.reason,
          hint: "Gmail error 535 = wrong app password (use a 16-character App Password with 2-Step Verification on, SMTP_PORT=465).",
        },
    database,
  });
}