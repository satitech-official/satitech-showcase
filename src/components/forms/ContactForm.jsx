"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Mail, MessageCircle, Send } from "lucide-react";
import { createWhatsAppUrl, siteConfig } from "@/config/site";

const serviceInterests = [
  "Web Development",
  "E-Commerce Development",
  "UI / UX Design",
  "Custom Web Application",
  "Website Redesign",
  "SEO & Performance",
  "Deployment & Domain Setup",
  "Website Maintenance",
  "Digital Consulting",
];
const budgetRanges = ["Need guidance", "Under ₹50,000", "₹50,000 – ₹1,50,000", "₹1,50,000 – ₹5,00,000", "₹5,00,000+"];
const timelines = ["As soon as practical", "Within 1 month", "1–3 months", "3–6 months", "Exploring for later"];

function createEnquiryMessage(values) {
  return [
    "Hello Sati Tech, I would like to discuss a project.",
    "",
    `Name: ${values.name || "Not provided"}`,
    `Business: ${values.business || "Not provided"}`,
    `Email: ${values.email || "Not provided"}`,
    `Phone: ${values.phone || "Not provided"}`,
    `Service: ${values.projectType || "Not provided"}`,
    `Budget: ${values.budgetRange || "Not provided"}`,
    `Timeline: ${values.timeline || "Not provided"}`,
    `Preferred contact: ${values.preferredContact || "Not provided"}`,
    "",
    `Project details: ${values.message || "Not provided"}`,
  ].join("\n");
}

export default function ContactForm({ source = "contact-page" }) {
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (!showToast) return undefined;
    const timeout = window.setTimeout(() => setShowToast(false), 5000);
    return () => window.clearTimeout(timeout);
  }, [showToast]);

  function handleSubmit(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    setName(values.name?.trim() || "there");
    setSubmitted(true);
    setShowToast(true);
    window.open(createWhatsAppUrl(createEnquiryMessage(values)), "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <>
        {showToast ? (
          <div role="status" aria-live="polite" className="enquiry-toast">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Enquiry ready — WhatsApp opened.
          </div>
        ) : null}
        <section className="premium-enquiry-success" aria-live="polite">
          <div className="premium-enquiry-success-icon"><CheckCircle2 className="h-7 w-7" aria-hidden="true" /></div>
          <p className="page-kicker">Enquiry ready</p>
          <h2>Thanks, {name}.</h2>
          <p>Your project details have been prepared in WhatsApp. Review the message there and send it when you’re ready.</p>
          <button type="button" onClick={() => setSubmitted(false)} className="premium-enquiry-reset">Send another enquiry <ArrowUpRight className="h-4 w-4" aria-hidden="true" /></button>
        </section>
      </>
    );
  }

  return (
    <>
      {showToast ? (
        <div role="status" aria-live="polite" className="enquiry-toast">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" /> Enquiry ready — WhatsApp opened.
        </div>
      ) : null}
      <form onSubmit={handleSubmit} className="min-w-0 rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-7">
        <input type="hidden" name="source" value={source} />
        <div className="grid min-w-0 gap-4 sm:grid-cols-2">
          <Field label="Name" name="name" placeholder="Your name" autoComplete="name" required />
          <Field label="Company / business" name="business" placeholder="Business or brand" autoComplete="organization" />
          <Field label="Email" name="email" type="email" placeholder="you@business.com" autoComplete="email" />
          <Field label="Phone" name="phone" type="tel" placeholder="+91 …" autoComplete="tel" />

          <SelectField label="Service interest" name="projectType" options={serviceInterests} />
          <SelectField label="Budget range" name="budgetRange" options={budgetRanges} />
          <SelectField label="Project timeline" name="timeline" options={timelines} defaultValue={timelines[1]} />
          <SelectField label="Preferred contact" name="preferredContact" options={["WhatsApp", "Email", "Phone call"]} />

          <label className="block min-w-0 sm:col-span-2">
            <span className="field-label">Project description</span>
            <textarea name="message" required minLength="10" className="form-field min-h-40 resize-y" placeholder="What are you building, improving or launching?" />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#4C5CFF]">
            Send enquiry <Send className="h-4 w-4" aria-hidden="true" />
          </button>
          <a href={createWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#CFFF72] px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950" data-cursor="OPEN ↗">
            Continue on WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <p className="mt-4 text-sm leading-6 text-neutral-600">No page refresh: the enquiry opens in WhatsApp for your review and confirmation.</p>

        <div className="mt-5 grid gap-2 rounded-2xl bg-[#F7F7F2] p-4 text-sm leading-6 text-neutral-600">
          <p><strong className="text-neutral-950">WhatsApp:</strong> {siteConfig.whatsappDisplay}</p>
          <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex items-center gap-2 font-bold text-neutral-950"><Mail className="h-4 w-4" aria-hidden="true" /> {siteConfig.contactEmail} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
        </div>
      </form>
    </>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block min-w-0">
      <span className="field-label">{label}</span>
      <input {...props} className="form-field" />
    </label>
  );
}

function SelectField({ label, name, options, defaultValue }) {
  return (
    <label className="block min-w-0">
      <span className="field-label">{label}</span>
      <select name={name} defaultValue={defaultValue || options[0]} className="form-field">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select>
    </label>
  );
}
