import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendNotificationEmail, renderEmail } from "@/lib/mailer";
import { logActivity } from "@/lib/activity";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email.").max(160),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(120).optional(),
  interest: z.string().trim().max(80).optional(),
  message: z.string().trim().min(5, "Please add a short message.").max(4000),
});

export async function POST(req: NextRequest) {
  if (!rateLimit(`contact:${clientIp(req)}`, 5, 60 * 60 * 1000).ok) {
    return NextResponse.json({ error: "Too many messages from this device. Please try again later or call us." }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }
  const { name, email, phone, company, interest, message } = parsed.data;

  // 1) save to the database (a failure here must not lose the lead — we still try email)
  let saved = false;
  try {
    await prisma.contactMessage.create({
      data: { name, email, phone: phone || undefined, company: company || undefined, interest: interest || undefined, message },
    });
    saved = true;
  } catch (err) {
    console.error("[contact] database save failed:", err);
  }

  // 2) email the team
  const mail = await sendNotificationEmail({
    subject: `New website enquiry — ${name}${company ? ` (${company})` : ""}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nCompany: ${company || "-"}\nInterest: ${interest || "-"}\n\n${message}`,
    html: renderEmail(
      "New website enquiry",
      [
        ["Name", name],
        ["Email", email],
        ["Phone", phone || "-"],
        ["Company", company || "-"],
        ["Interested in", interest || "-"],
      ],
      message
    ),
  });
  if (!mail.sent) console.error("[contact] notification email not sent:", mail.reason);

  // only report success if the lead actually reached us somewhere
  if (!saved && !mail.sent) {
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please call or email us directly — our details are on this page." },
      { status: 500 }
    );
  }

  if (saved) {
    try {
      await logActivity("CONTACT_FORM", `New enquiry from ${name} (${email}).`);
    } catch {
      /* activity log is optional */
    }
  }

  return NextResponse.json({ ok: true });
}