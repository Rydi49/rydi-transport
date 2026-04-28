"use client";

import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";
import LeadForm from "@/components/LeadForm";

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-rydi-black">
      <div className="bg-rydi-dark border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-rydi-white hover:text-rydi-accent transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-rydi-accent" />
            <span className="text-lg font-bold text-rydi-white">RYDI <span className="text-rydi-accent">Transport</span></span>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8 p-4 rounded-lg bg-rydi-accent/10 border border-rydi-accent/20">
          <p className="text-rydi-accent font-bold text-sm text-center">
            We respond to every quote request within 15 minutes. Emergency? Call 604-999-1495 now.
          </p>
        </div>

        <LeadForm
          formType="quote"
          title="Get a Quote Fast"
          subtitle="No fluff. Just route, load, and phone. We will call you back in 15 minutes with a firm price."
          showTimeline={true}
          showLoadType={true}
          showJobDetails={false}
          showFrequency={false}
          showCompany={false}
        />
      </div>
    </div>
  );
}
