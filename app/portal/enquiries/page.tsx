import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Mail, Phone, MessageCircle, Paperclip } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Card, Badge, EmptyState } from "@/components/portal/ui";
import DeleteEnquiryButton from "@/components/portal/DeleteEnquiryButton";

export const metadata: Metadata = { title: "Enquiries" };
export const dynamic = "force-dynamic";

const fmt = (d: Date) =>
  d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function whatsapp(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;
}

const linkClass = "inline-flex min-h-9 items-center gap-1.5 text-sm font-medium text-navy hover:text-brand";

export default async function EnquiriesPage() {
  const me = await getCurrentUser();
  if (!me) redirect("/login");
  if (me.role !== "OWNER") redirect("/portal");

  const [messages, applications] = await Promise.all([
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
    prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" }, take: 200 }),
  ]);

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-navy">Enquiries</h1>
        <p className="mt-1 text-sm text-slate">Everything submitted through the website contact and careers forms.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-navy">
          Contact enquiries <span className="text-slate">({messages.length})</span>
        </h2>
        <div className="mt-4 space-y-4">
          {messages.length === 0 && <EmptyState message="No enquiries yet." />}
          {messages.map((m) => (
            <Card key={m.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base font-semibold text-navy">{m.name}</p>
                  {m.company && <p className="text-sm text-slate">{m.company}</p>}
                </div>
                <div className="flex items-center gap-3">
                  {m.interest && <Badge tone="info">{m.interest}</Badge>}
                  <span className="text-xs text-slate">{fmt(m.createdAt)}</span>
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-navy/85">{m.message}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-3">
                <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: your enquiry to JSS Innovative Solutions")}`} className={linkClass}>
                  <Mail className="h-4 w-4" /> {m.email}
                </a>
                {m.phone && (
                  <>
                    <a href={`tel:${m.phone.replace(/\s/g, "")}`} className={linkClass}>
                      <Phone className="h-4 w-4" /> {m.phone}
                    </a>
                    <a href={whatsapp(m.phone)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                  </>
                )}
                <span className="ml-auto">
                  <DeleteEnquiryButton kind="contact" id={m.id} />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy">
          Job applications <span className="text-slate">({applications.length})</span>
        </h2>
        <div className="mt-4 space-y-4">
          {applications.length === 0 && <EmptyState message="No applications yet." />}
          {applications.map((a) => (
            <Card key={a.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-base font-semibold text-navy">{a.name}</p>
                  <p className="text-sm text-slate">Applied for {a.position}</p>
                </div>
                <span className="text-xs text-slate">{fmt(a.createdAt)}</span>
              </div>

              {a.coverNote && (
                <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-relaxed text-navy/85">{a.coverNote}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-3">
                <a href={`mailto:${a.email}`} className={linkClass}>
                  <Mail className="h-4 w-4" /> {a.email}
                </a>
                {a.phone && (
                  <a href={`tel:${a.phone.replace(/\s/g, "")}`} className={linkClass}>
                    <Phone className="h-4 w-4" /> {a.phone}
                  </a>
                )}
                {a.resumeUrl && /^https?:\/\//i.test(a.resumeUrl) && (
                  <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <Paperclip className="h-4 w-4" /> Resume
                  </a>
                )}
                <span className="ml-auto">
                  <DeleteEnquiryButton kind="application" id={a.id} />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}