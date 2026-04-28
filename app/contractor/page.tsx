"use client";

import Link from "next/link";
import { ArrowLeft, Truck, Zap, Clock, Shield, Building2 } from "lucide-react";
import LeadForm from "@/components/LeadForm";

export default function ContractorPage() {
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

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rydi-accent/10 border border-rydi-accent/20 mb-6">
            <Building2 className="w-4 h-4 text-rydi-accent" />
            <span className="text-sm font-medium text-rydi-accent">For Pipeline & Construction Companies</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-rydi-white mb-4">
            Reliable Hauling for Your Projects
          </h1>
          <p className="text-rydi-muted max-w-xl mx-auto">
            Need a hauling partner you can count on? We provide fast dispatch, clear communication,
            and flexible scheduling for contractors who can not afford delays.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-xl bg-rydi-dark border border-white/5 text-center">
            <div className="w-12 h-12 rounded-lg bg-rydi-accent/10 flex items-center justify-center text-rydi-accent mx-auto mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-rydi-white mb-1">Fast Dispatch</h3>
            <p className="text-sm text-rydi-muted">Same-day or next-day pickup, guaranteed.</p>
          </div>
          <div className="p-5 rounded-xl bg-rydi-dark border border-white/5 text-center">
            <div className="w-12 h-12 rounded-lg bg-rydi-accent/10 flex items-center justify-center text-rydi-accent mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-rydi-white mb-1">Flexible Scheduling</h3>
            <p className="text-sm text-rydi-muted">Work around your project timeline, not ours.</p>
          </div>
          <div className="p-5 rounded-xl bg-rydi-dark border border-white/5 text-center">
            <div className="w-12 h-12 rounded-lg bg-rydi-accent/10 flex items-center justify-center text-rydi-accent mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-rydi-white mb-1">Ongoing Contracts</h3>
            <p className="text-sm text-rydi-muted">Weekly, bi-weekly, or on-call — we scale with you.</p>
          </div>
        </div>

        <div className="mb-10 p-6 rounded-xl bg-rydi-gold/5 border border-rydi-gold/20">
          <h3 className="text-lg font-bold text-rydi-gold mb-2">Your Backup Hauling Capacity</h3>
          <p className="text-rydi-muted text-sm leading-relaxed">
            You already have a primary carrier. But when they are booked, broken down, or behind schedule —
            RYDI is your overflow and emergency fill-in. No long-term contract. No minimums.
            Just reliable hauling when you need it most. Call 604-999-1495 to set it up.
          </p>
        </div>

        <LeadForm
          formType="contractor"
          title="Tell Us About Your Needs"
          subtitle=""
          showTimeline={false}
          showLoadType={false}
          showJobDetails={true}
          showFrequency={true}
          showCompany={true}
        />
      </div>
    </div>
  );
}
