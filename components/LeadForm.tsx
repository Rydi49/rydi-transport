"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle, Phone } from "lucide-react";

interface LeadFormProps {
  formType: string;
  title: string;
  subtitle?: string;
  extraFields?: React.ReactNode;
  showTimeline?: boolean;
  showLoadType?: boolean;
  showJobDetails?: boolean;
  showFrequency?: boolean;
  showCompany?: boolean;
}

export default function LeadForm({
  formType,
  title,
  subtitle,
  extraFields,
  showTimeline = true,
  showLoadType = true,
  showJobDetails = false,
  showFrequency = false,
  showCompany = false,
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.formType = formType;

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Something went wrong. Please call us directly.");
      }
    } catch {
      alert("Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-rydi-white mb-4">Request Received!</h2>
        <p className="text-rydi-muted mb-2 max-w-md mx-auto">
          We have got your request and will respond within <span className="text-rydi-accent font-bold">15 minutes</span> with a quote.
        </p>
        <p className="text-rydi-muted mb-8 text-sm">
          If it is urgent, call us now — we answer emergency calls immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+16049991495"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rydi-accent text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call 604-999-1495
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-rydi-white mb-3">{title}</h1>
        {subtitle && <p className="text-rydi-muted">{subtitle}</p>}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Pickup Location *</label>
            <input name="pickup" type="text" required placeholder="City or address"
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Drop-off Location *</label>
            <input name="dropoff" type="text" required placeholder="City or address"
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors" />
          </div>
        </div>

        {showLoadType && (
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Load Type *</label>
            <select name="loadType" required
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors appearance-none">
              <option value="">Select...</option>
              <option value="equipment">Equipment / Machinery</option>
              <option value="motorcycle">Motorcycle(s)</option>
              <option value="materials">Materials / Lumber / Steel</option>
              <option value="pallets">Pallets / Freight</option>
              <option value="vehicle">Vehicle / ATV / UTV</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-rydi-white mb-2">Size / Weight (approx)</label>
          <input name="sizeWeight" type="text" placeholder="e.g. 5,000 lbs, 12ft long"
            className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors" />
        </div>

        {showTimeline && (
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Timeline *</label>
            <select name="timeline" required
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors appearance-none">
              <option value="">When do you need it?</option>
              <option value="emergency">Emergency — Need it NOW</option>
              <option value="same-day">Same Day</option>
              <option value="next-day">Next Day</option>
              <option value="this-week">This Week</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        )}

        {showJobDetails && (
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Job / Project Details *</label>
            <textarea name="jobDetails" rows={3} required placeholder="Equipment types, typical routes, project locations..."
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors resize-none" />
          </div>
        )}

        {showFrequency && (
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Frequency *</label>
            <select name="frequency" required
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors appearance-none">
              <option value="">How often?</option>
              <option value="one-time">One-time project</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
              <option value="on-call">On-call / As needed</option>
              <option value="ongoing">Ongoing contract</option>
            </select>
          </div>
        )}

        {showCompany && (
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Company Name *</label>
            <input name="company" type="text" required placeholder="Your company"
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors" />
          </div>
        )}

        {extraFields}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Your Name *</label>
            <input name="name" type="text" required placeholder="Full name"
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-rydi-white mb-2">Phone *</label>
            <input name="phone" type="tel" required placeholder="604-999-1495"
              className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-rydi-white mb-2">Email (optional)</label>
          <input name="email" type="email" placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-medium text-rydi-white mb-2">Additional Notes</label>
          <textarea name="notes" rows={3} placeholder="Any special requirements..."
            className="w-full px-4 py-3 rounded-lg bg-rydi-dark border border-white/10 focus:border-rydi-accent focus:outline-none transition-colors resize-none" />
        </div>

        <div className="pt-2">
          <button type="submit" disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-rydi-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg disabled:opacity-50">
            {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : <><>Get My Quote</><ArrowRight className="w-5 h-5" /></>}
          </button>
          <p className="text-center text-sm text-rydi-muted mt-4">
            Or call now: <a href="tel:+16049991495" className="text-rydi-accent hover:underline font-semibold">604-999-1495</a>
          </p>
        </div>
      </form>
    </div>
  );
}
