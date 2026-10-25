import nodemailer from "nodemailer";
import type Transport from "nodemailer/lib/mailer";

let cachedTransport: Transport | null = null;

const REQUIRED = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD", "CONTACT_NOTIFY_TO"] as const;

/** Which email settings are missing on this deployment. */
export function emailConfigStatus() {
  const missing = REQUIRED.filter((k) => !process.env[k]?.trim());
  return { configured: missing.length === 0, missing };
}

function getTransport() {
  if (cachedTransport) return cachedTransport;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return null;

  const port = Number(SMTP_PORT) || 587;
  const host = SMTP_HOST.trim();
  // Google shows app passwords in groups with spaces — strip them
  const pass = host.includes("gmail") ? SMTP_PASSWORD.replace(/\s/g, "") : SMTP_PASSWORD;

  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER.trim(), pass },
    // never let a slow mail server hang the visitor's request
    connectionTimeout: 6000,
    greetingTimeout: 6000,
    socketTimeout: 8000,
  });
  return cachedTransport;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/** Clean, readable HTML email for notifications. */
export function renderEmail(title: string, rows: [string, string][], body?: string) {
  const tr = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#64748b;font-size:13px;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 0;color:#0b1f4b;font-size:14px;font-weight:600">${escapeHtml(v || "-")}</td></tr>`
    )
    .join("");
  return (
    `<div style="font-family:Arial,sans-serif;max-width:560px">` +
    `<div style="border-top:4px solid #d7141f;padding-top:16px"><h2 style="margin:0 0 14px;color:#0b1f4b;font-size:18px">${escapeHtml(title)}</h2>` +
    `<table style="border-collapse:collapse">${tr}</table>` +
    (body
      ? `<div style="margin-top:16px;padding:14px;background:#f5f7fa;border-radius:8px;color:#0b1f4b;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(body)}</div>`
      : "") +
    `</div></div>`
  );
}

type SendResult = { sent: true } | { sent: false; reason: string };

export async function sendNotificationEmail(opts: {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}): Promise<SendResult> {
  const status = emailConfigStatus();
  if (!status.configured) {
    const reason = `Email not configured. Missing: ${status.missing.join(", ")}`;
    console.warn(`[mailer] ${reason}`);
    return { sent: false, reason };
  }

  const transport = getTransport();
  if (!transport) return { sent: false, reason: "SMTP transport could not be created." };

  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM?.trim() || process.env.SMTP_USER,
      to: process.env.CONTACT_NOTIFY_TO!.trim(), // comma-separated list is fine
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
    });
    return { sent: true };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error("[mailer] send failed:", reason);
    cachedTransport = null; // rebuild the connection next time
    return { sent: false, reason };
  }
}