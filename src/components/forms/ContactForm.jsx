"use client";

import { ArrowUpRight, Mail, MessageCircle, Send } from "lucide-react";
import { useMemo, useState } from "react";
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

const initialState = {
  name: "",
  business: "",
  email: "",
  phone: "",
  projectType: serviceInterests[0],
  budgetRange: budgetRanges[0],
  timeline: timelines[1],
  preferredContact: "WhatsApp",
  message: "",
};

function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!form.email.trim() && !form.phone.trim()) errors.contact = "Add an email address or phone number.";
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Please enter a valid email address.";
  if (form.message.trim().length < 10) errors.message = "Please share a little more about the project.";
  return errors;
}

export default function ContactForm({ source = "contact-page" }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [response, setResponse] = useState(null);

  const whatsappMessage = useMemo(() => (
    `Hello Sati Tech, I would like to discuss a project. Name: ${form.name}. Business: ${form.business || "Not specified"}. Service: ${form.projectType}. Budget: ${form.budgetRange}. Timeline: ${form.timeline}. Preferred contact: ${form.preferredContact}. Project: ${form.message}`
  ), [form]);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: "", contact: "" }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("submitting");
    setResponse(null);
    const deliveryMessage = `${whatsappMessage}. Source: ${source}. Email: ${form.email || "Not specified"}. Phone: ${form.phone || "Not specified"}.`;
    const popup = window.open(createWhatsAppUrl(deliveryMessage), "_blank", "noopener,noreferrer");

    if (!popup) {
      setStatus("error");
      setResponse({ error: "Your browser blocked the WhatsApp window." });
      return;
    }

    setStatus("success");
    setResponse({ delivery: "whatsapp" });
    setForm(initialState);
  };

  return (
    <form onSubmit={submit} className="min-w-0 rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_24px_90px_rgba(21,21,21,0.08)] sm:rounded-[3rem] sm:p-7" noValidate>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">
        <Field label="Name" value={form.name} onChange={update("name")} placeholder="Your name" autoComplete="name" error={errors.name} />
        <Field label="Company / business" value={form.business} onChange={update("business")} placeholder="Business or brand" autoComplete="organization" />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} placeholder="you@business.com" autoComplete="email" error={errors.email || errors.contact} />
        <Field label="Phone" type="tel" value={form.phone} onChange={update("phone")} placeholder="+91 …" autoComplete="tel" error={!errors.email ? errors.contact : ""} />

        <label className="block min-w-0">
          <span className="field-label">Service interest</span>
          <select value={form.projectType} onChange={update("projectType")} className="form-field">
            {serviceInterests.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label className="block min-w-0">
          <span className="field-label">Budget range</span>
          <select value={form.budgetRange} onChange={update("budgetRange")} className="form-field">
            {budgetRanges.map((range) => <option key={range} value={range}>{range}</option>)}
          </select>
        </label>
        <label className="block min-w-0">
          <span className="field-label">Project timeline</span>
          <select value={form.timeline} onChange={update("timeline")} className="form-field">
            {timelines.map((timeline) => <option key={timeline} value={timeline}>{timeline}</option>)}
          </select>
        </label>
        <label className="block min-w-0">
          <span className="field-label">Preferred contact</span>
          <select value={form.preferredContact} onChange={update("preferredContact")} className="form-field">
            {["WhatsApp", "Email", "Phone call"].map((method) => <option key={method} value={method}>{method}</option>)}
          </select>
        </label>

        <label className="block min-w-0 sm:col-span-2">
          <span className="field-label">Project description</span>
          <textarea value={form.message} onChange={update("message")} className="form-field min-h-40 resize-y" placeholder="What are you building, improving or launching?" aria-invalid={Boolean(errors.message)} />
          {errors.message ? <span className="field-error">{errors.message}</span> : null}
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "submitting"} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#151515] px-5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#4C5CFF] disabled:cursor-not-allowed disabled:opacity-60">
          {status === "submitting" ? "Sending enquiry..." : "Send enquiry"} <Send className="h-4 w-4" aria-hidden="true" />
        </button>
        <a href={createWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/10 bg-[#CFFF72] px-5 text-xs font-black uppercase tracking-[0.14em] text-neutral-950" data-cursor="OPEN ↗">
          Continue on WhatsApp <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {status === "success" ? (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-900" role="status">
          Your enquiry is ready and WhatsApp has opened in a new tab. Send the prepared message to connect with Sati Tech.
        </div>
      ) : null}

      {status === "error" ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-900" role="alert">{response?.error} You can still contact Sati Tech directly on WhatsApp.</div> : null}

      <div className="mt-5 grid gap-2 rounded-2xl bg-[#F7F7F2] p-4 text-sm leading-6 text-neutral-600">
        <p><strong className="text-neutral-950">WhatsApp:</strong> {siteConfig.whatsappDisplay}</p>
        <a href={`mailto:${siteConfig.contactEmail}`} className="inline-flex items-center gap-2 font-bold text-neutral-950"><Mail className="h-4 w-4" aria-hidden="true" /> {siteConfig.contactEmail} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></a>
      </div>
    </form>
  );
}

function Field({ label, error, ...props }) {
  return (
    <label className="block min-w-0">
      <span className="field-label">{label}</span>
      <input {...props} className="form-field" aria-invalid={Boolean(error)} />
      {error ? <span className="field-error">{error}</span> : null}
    </label>
  );
}
