import Link from "next/link";
import Image from "next/image";
import {
  Phone, MapPin, Clock, Shield, Truck, ArrowRight,
  CheckCircle, ChevronRight, Zap, Route, AlertTriangle,
  BadgeDollarSign, Timer
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-rydi-black">
      <Navbar />
      <Hero />
      <UrgencyBanner />
      <Services />
      <PricingHook />
      <WhyChoose />
      <CoverageMap />
      <BackupPitch />
      <CTASection />
      <TrustSection />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: "40px 40px"
      }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rydi-accent/10 border border-rydi-accent/20 mb-6 animate-pulse">
          <AlertTriangle className="w-4 h-4 text-rydi-accent" />
          <span className="text-sm font-bold text-rydi-accent">Emergency Hotshot Available 24/7</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-rydi-white leading-tight mb-6">
          Fast, Reliable<br />
          <span className="text-rydi-accent">Hotshot Hauling</span><br />
          Across BC & Western Canada
        </h1>

        <p className="text-lg md:text-xl text-rydi-muted max-w-2xl mx-auto mb-8 leading-relaxed">
          Same-day and next-day hauling for equipment, motorcycles, and materials.
          Professional dispatch. No delays. No excuses.
        </p>

        <div className="flex items-center justify-center gap-2 text-sm text-rydi-muted mb-10">
          <Route className="w-4 h-4 text-rydi-accent" />
          <span>Lower Mainland to Interior to Alberta Pipeline Routes</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-rydi-accent text-white font-bold rounded-lg hover:bg-red-700 transition-colors text-lg shadow-lg shadow-rydi-accent/20">
            Get a Quote in 15 Min
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/contractor"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-rydi-dark border border-white/15 text-rydi-white font-semibold rounded-lg hover:bg-white/5 transition-colors text-lg">
            Contractor Services
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-8">
          <a href="tel:+16049991495"
            className="inline-flex items-center gap-3 text-rydi-white hover:text-rydi-accent transition-colors">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-rydi-accent/20 animate-pulse-ring" />
              <div className="relative w-12 h-12 rounded-full bg-rydi-accent/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-rydi-accent" />
              </div>
            </div>
            <div className="text-left">
              <p className="text-xs text-rydi-muted uppercase tracking-wider">Call Now — Emergency Line</p>
              <p className="text-xl font-bold">604-999-1495</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function UrgencyBanner() {
  return (
    <div className="bg-rydi-accent py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Zap className="w-4 h-4" />
          Emergency dispatch available
        </div>
        <div className="hidden sm:block w-px h-4 bg-white/30" />
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Timer className="w-4 h-4" />
          Quotes in under 15 minutes
        </div>
        <div className="hidden sm:block w-px h-4 bg-white/30" />
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <Phone className="w-4 h-4" />
          First responder gets the job
        </div>
      </div>
    </div>
  );
}

function Services() {
  const services = [
    { icon: <Truck className="w-8 h-8" />, title: "Equipment Transport", desc: "Excavators, skid steers, generators, and job site equipment moved fast and safe." },
    { icon: <MapPin className="w-8 h-8" />, title: "Motorcycle Transport", desc: "Secure, damage-free motorcycle hauling for dealers, shops, and private owners." },
    { icon: <Clock className="w-8 h-8" />, title: "Hotshot Delivery", desc: "Urgent same-day and next-day hauling when timelines matter most." },
    { icon: <Shield className="w-8 h-8" />, title: "Materials & Freight", desc: "Lumber, steel, pallets, and bulk materials delivered to your job site." },
  ];

  return (
    <section className="py-20 px-4 bg-rydi-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-rydi-white mb-4">What We Haul</h2>
          <p className="text-rydi-muted max-w-xl mx-auto">From heavy equipment to urgent deliveries — we handle it all with speed and care.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={i} className="p-6 rounded-xl bg-rydi-black border border-white/5 hover:border-rydi-accent/30 transition-all group">
              <div className="w-14 h-14 rounded-lg bg-rydi-accent/10 flex items-center justify-center text-rydi-accent mb-4 group-hover:bg-rydi-accent/20 transition-colors">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-rydi-white mb-2">{s.title}</h3>
              <p className="text-sm text-rydi-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingHook() {
  return (
    <section className="py-16 px-4 bg-rydi-black border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rydi-green/10 border border-rydi-green/20 mb-6">
          <BadgeDollarSign className="w-4 h-4 text-rydi-green" />
          <span className="text-sm font-bold text-rydi-green">Transparent Pricing — No Hidden Fees</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-rydi-white mb-6">Typical Jobs Start at $250</h2>
        <p className="text-rydi-muted text-lg mb-8 max-w-2xl mx-auto">
          Local runs in the Lower Mainland start around $250. Long-haul to the Interior or Alberta depends on load size and distance.
          We will give you a firm quote in under 15 minutes — no surprises.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-lg bg-rydi-dark border border-white/5">
            <p className="text-2xl font-bold text-rydi-accent">$250+</p>
            <p className="text-sm text-rydi-muted">Local Lower Mainland</p>
          </div>
          <div className="p-4 rounded-lg bg-rydi-dark border border-white/5">
            <p className="text-2xl font-bold text-rydi-accent">$450+</p>
            <p className="text-sm text-rydi-muted">Interior BC Routes</p>
          </div>
          <div className="p-4 rounded-lg bg-rydi-dark border border-white/5">
            <p className="text-2xl font-bold text-rydi-accent">$650+</p>
            <p className="text-sm text-rydi-muted">Alberta Pipeline Runs</p>
          </div>
        </div>
        <p className="text-xs text-rydi-muted mt-4">* Prices are estimates. Final quote depends on load size, weight, and urgency. Emergency rates may apply.</p>
      </div>
    </section>
  );
}

function WhyChoose() {
  const reasons = [
    "Same-day & next-day dispatch",
    "2500 Cummins + professional trailer setup",
    "Available across BC & Western Canada",
    "Clear communication from pickup to drop-off",
    "Competitive rates, no hidden fees",
    "Reliable for one-offs or ongoing contracts",
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-rydi-white mb-6">
              Why Contractors & Businesses Choose RYDI
            </h2>
            <p className="text-rydi-muted mb-8 leading-relaxed">
              We know delays cost money. That is why we prioritize fast response times,
              clear updates, and reliable delivery — every single haul.
            </p>
            <ul className="space-y-4">
              {reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-rydi-accent mt-0.5 shrink-0" />
                  <span className="text-rydi-white">{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden bg-rydi-dark border border-white/5">
              <Image
                src="/truck.jpg"
                alt="RYDI Transport - 2500 Cummins hauling equipment"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverageMap() {
  return (
    <section className="py-16 px-4 bg-rydi-dark">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-rydi-white mb-4">Where We Operate</h2>
        <p className="text-rydi-muted mb-10 max-w-xl mx-auto">
          Based in the Lower Mainland with regular runs to the Interior and Alberta pipeline corridors.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-xl bg-rydi-black border border-white/5">
            <MapPin className="w-8 h-8 text-rydi-accent mx-auto mb-3" />
            <h3 className="font-bold text-rydi-white mb-1">Lower Mainland</h3>
            <p className="text-sm text-rydi-muted">Vancouver, Surrey, Abbotsford, Langley</p>
          </div>
          <div className="p-6 rounded-xl bg-rydi-black border border-white/5">
            <Route className="w-8 h-8 text-rydi-accent mx-auto mb-3" />
            <h3 className="font-bold text-rydi-white mb-1">Interior BC</h3>
            <p className="text-sm text-rydi-muted">Kamloops, Kelowna, Prince George, Fort St. John</p>
          </div>
          <div className="p-6 rounded-xl bg-rydi-black border border-white/5">
            <Truck className="w-8 h-8 text-rydi-accent mx-auto mb-3" />
            <h3 className="font-bold text-rydi-white mb-1">Alberta</h3>
            <p className="text-sm text-rydi-muted">Calgary, Edmonton, Grande Prairie, Pipeline routes</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BackupPitch() {
  return (
    <section className="py-20 px-4 bg-rydi-black border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rydi-gold/10 border border-rydi-gold/20 mb-6">
          <Zap className="w-4 h-4 text-rydi-gold" />
          <span className="text-sm font-bold text-rydi-gold">Strategic Partnership</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-rydi-white mb-6">
          Your Backup Hauling Capacity<br />When Primary Carriers Fail
        </h2>
        <p className="text-rydi-muted text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Every contractor has a primary carrier. But equipment breaks down, drivers call in sick,
          and deadlines do not move. That is where RYDI comes in — reliable overflow and emergency
          hauling when your main guy can not deliver.
        </p>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          <div className="p-5 rounded-lg bg-rydi-dark border border-white/5">
            <AlertTriangle className="w-8 h-8 text-rydi-accent mx-auto mb-3" />
            <h3 className="font-bold text-rydi-white mb-1">Emergency Fill-In</h3>
            <p className="text-sm text-rydi-muted">Primary carrier no-show? We are on the road in hours, not days.</p>
          </div>
          <div className="p-5 rounded-lg bg-rydi-dark border border-white/5">
            <Clock className="w-8 h-8 text-rydi-accent mx-auto mb-3" />
            <h3 className="font-bold text-rydi-white mb-1">Overflow Capacity</h3>
            <p className="text-sm text-rydi-muted">Too many loads, not enough trucks? We handle the overflow.</p>
          </div>
          <div className="p-5 rounded-lg bg-rydi-dark border border-white/5">
            <Shield className="w-8 h-8 text-rydi-accent mx-auto mb-3" />
            <h3 className="font-bold text-rydi-white mb-1">No Long-Term Contract</h3>
            <p className="text-sm text-rydi-muted">Use us when you need us. No minimums, no lock-in.</p>
          </div>
        </div>
        <Link href="/contractor"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rydi-gold text-rydi-black font-bold rounded-lg hover:bg-yellow-500 transition-colors text-lg">
          Set Up Backup Hauling
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 px-4 bg-rydi-accent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Need Something Hauled Right Now?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Tell us what, where, and when. We will get back to you within 15 minutes with a firm quote and availability.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-rydi-accent font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg">
            Get a Quote in 15 Min
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a href="tel:+16049991495"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-rydi-accent/20 border border-white/30 text-white font-semibold rounded-lg hover:bg-rydi-accent/30 transition-colors text-lg">
            <Phone className="w-5 h-5" />
            Call 604-999-1495
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="py-20 px-4 bg-rydi-dark">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-rydi-white mb-4">Built on Trust</h2>
          <p className="text-rydi-muted max-w-xl mx-auto">Professional hauling starts with professional people and reliable equipment.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-rydi-accent/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-rydi-accent" />
            </div>
            <h3 className="text-lg font-bold text-rydi-white mb-2">Fully Insured</h3>
            <p className="text-sm text-rydi-muted">Your load is protected from pickup to delivery. Peace of mind included.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-rydi-accent/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-rydi-accent" />
            </div>
            <h3 className="text-lg font-bold text-rydi-white mb-2">On-Time, Every Time</h3>
            <p className="text-sm text-rydi-muted">We do not miss deadlines. Real-time updates so you always know where your load is.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-rydi-accent/10 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-rydi-accent" />
            </div>
            <h3 className="text-lg font-bold text-rydi-white mb-2">Heavy-Duty Setup</h3>
            <p className="text-sm text-rydi-muted">2500 Cummins diesel + professional trailer. Built for the tough hauls.</p>
          </div>
        </div>

        <div className="mt-16 p-8 rounded-xl bg-rydi-black border border-white/5 text-center">
          <h3 className="text-xl font-bold text-rydi-white mb-4">What Our Clients Say</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              { text: "RYDI delivered our excavator same-day with zero hassle. Communication was clear from start to finish.", name: "Mike T., Pipeline Foreman" },
              { text: "We have used RYDI for 6 months straight. Never missed a deadline. That is rare in this business.", name: "Sarah L., Construction PM" },
              { text: "Called at 7 AM, load was picked up by 10. Fair price, no surprises. Will call again.", name: "Jake R., Equipment Dealer" },
            ].map((t, i) => (
              <div key={i} className="p-4 rounded-lg bg-rydi-dark border border-white/5">
                <p className="text-rydi-muted text-sm italic mb-3">&ldquo;{t.text}&rdquo;</p>
                <p className="text-rydi-white font-semibold text-sm">&mdash; {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
