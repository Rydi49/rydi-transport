"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const honeypot = form.querySelector('input[name="_gotcha"]') as HTMLInputElement;
    if (honeypot?.value) return;

    const required = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[required]");
    let valid = true;
    required.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = "#ef4444";
      } else {
        field.style.borderColor = "";
      }
    });
    if (!valid) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mrerwovr", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setFormSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      setIsSubmitting(false);
      alert("Something went wrong. Please call us directly at 604-999-1495.");
    }
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-[#f1f5f9]">
      {/* Emergency Bar */}
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-2 flex items-center justify-center gap-3 text-sm font-semibold animate-pulse shadow-lg">
        <span className="w-2 h-2 bg-white rounded-full animate-blink" />
        <span>24/7 Emergency Dispatch Available</span>
        <a href="tel:6049991495" className="underline font-bold">Call 604-999-1495</a>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-8 left-0 right-0 z-[999] px-6 transition-all duration-300 ${navScrolled ? "bg-[#020617]/98 shadow-lg" : "bg-[#0f172a]/95 backdrop-blur-xl"} border-b border-white/5`}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16">
          <a href="#" className="text-[26px] font-black text-white tracking-tight no-underline">
            RYDI<span className="text-orange-500">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("#services")} className="text-[#f1f5f9] text-sm font-medium hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer">Services</button>
            <button onClick={() => scrollTo("#pricing")} className="text-[#f1f5f9] text-sm font-medium hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => scrollTo("#areas")} className="text-[#f1f5f9] text-sm font-medium hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer">Areas</button>
            <button onClick={() => scrollTo("#backup")} className="text-[#f1f5f9] text-sm font-medium hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer">Backup</button>
            <button onClick={() => scrollTo("#quote")} className="bg-orange-500 text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-orange-600 transition-all hover:-translate-y-0.5">Get a Quote</button>
          </div>
          <button className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="w-6 h-0.5 bg-white transition-all" />
            <span className="w-6 h-0.5 bg-white transition-all" />
            <span className="w-6 h-0.5 bg-white transition-all" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0f172a] px-5 py-5 flex flex-col gap-4 border-b border-white/5">
            <button onClick={() => scrollTo("#services")} className="text-[#f1f5f9] text-base py-2 text-left bg-transparent border-none cursor-pointer">Services</button>
            <button onClick={() => scrollTo("#pricing")} className="text-[#f1f5f9] text-base py-2 text-left bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => scrollTo("#areas")} className="text-[#f1f5f9] text-base py-2 text-left bg-transparent border-none cursor-pointer">Areas</button>
            <button onClick={() => scrollTo("#backup")} className="text-[#f1f5f9] text-base py-2 text-left bg-transparent border-none cursor-pointer">Backup</button>
            <button onClick={() => scrollTo("#quote")} className="text-orange-500 font-bold text-base py-2 text-left bg-transparent border-none cursor-pointer">Get a Quote</button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center text-center px-6 pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] -z-20" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.08)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-[900px]">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-500 px-5 py-2 rounded-full text-[13px] font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Emergency Hotshot Available 24/7
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-5 tracking-tight">
            Your Backup When <span className="text-orange-500">Something Goes Wrong</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-[640px] mx-auto mb-10 leading-relaxed">
            Same-day and next-day hauling for equipment, motorcycles, and materials across BC and Western Canada. Professional dispatch. No delays. No excuses.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <button onClick={() => scrollTo("#quote")} className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg text-base font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all cursor-pointer border-none">
              ⚡ Get a Quote in 15 Min
            </button>
            <a href="tel:6049991495" className="inline-flex items-center gap-2 bg-transparent text-[#f1f5f9] border-2 border-white/20 px-8 py-4 rounded-lg text-base font-bold hover:border-orange-500 hover:text-orange-500 transition-all no-underline">
              📞 Call 604-999-1495
            </a>
          </div>
          <div className="flex gap-8 justify-center flex-wrap text-[13px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> Same-Day Dispatch</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> Fully Insured</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> No Hidden Fees</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> BC & Alberta</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">What We Haul</h2>
            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">From heavy equipment to urgent deliveries — we handle it all with speed and care.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏗️", title: "Equipment Transport", desc: "Excavators, skid steers, generators, and job site equipment moved fast and safe." },
              { icon: "🏍️", title: "Motorcycle Transport", desc: "Secure, damage-free motorcycle hauling for dealers, shops, and private owners." },
              { icon: "⚡", title: "Hotshot Delivery", desc: "Urgent same-day and next-day hauling when timelines matter most." },
              { icon: "📦", title: "Materials & Freight", desc: "Lumber, steel, pallets, and bulk materials delivered to your job site." },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.05] hover:border-orange-500/30 hover:-translate-y-1 transition-all reveal">
                <div className="w-12 h-12 bg-orange-500/15 rounded-xl flex items-center justify-center text-[22px] mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-[#0f172a] to-[#020617]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">Transparent Pricing — No Hidden Fees</h2>
            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">Typical jobs start at $250. We give you a firm quote in under 15 minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 text-center reveal">
              <h3 className="text-xl font-bold text-white">Local Lower Mainland</h3>
              <div className="text-5xl font-black text-white my-4">$250<span className="text-base text-slate-500 font-medium">+</span></div>
              <p className="text-slate-400 text-sm">Vancouver, Surrey, Abbotsford, Langley<br/>Same-day available</p>
            </div>
            <div className="bg-orange-500/5 border border-orange-500 rounded-2xl p-10 text-center relative reveal">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">Most Popular</div>
              <h3 className="text-xl font-bold text-white">Interior BC Runs</h3>
              <div className="text-5xl font-black text-white my-4">$450<span className="text-base text-slate-500 font-medium">+</span></div>
              <p className="text-slate-400 text-sm">Kamloops, Kelowna, Prince George<br/>Next-day dispatch</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-10 text-center reveal">
              <h3 className="text-xl font-bold text-white">Alberta Pipeline</h3>
              <div className="text-5xl font-black text-white my-4">$650<span className="text-base text-slate-500 font-medium">+</span></div>
              <p className="text-slate-400 text-sm">Calgary, Edmonton, Grande Prairie<br/>Scheduled & emergency</p>
            </div>
          </div>
          <p className="text-center text-slate-500 text-[13px]">* Prices are estimates. Final quote depends on load size, weight, and urgency. Emergency rates may apply.</p>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <h2 className="text-3xl md:text-[40px] font-extrabold text-white mb-4 tracking-tight">Why Contractors & Businesses Choose RYDI</h2>
              <p className="text-slate-400 mb-8">We know delays cost money. That is why we prioritize fast response times, clear updates, and reliable delivery — every single haul.</p>
              <div className="flex flex-col gap-4">
                {[
                  "Same-day & next-day dispatch — No waiting around for days",
                  "3500 Cummins + professional trailer setup — Built for heavy loads",
                  "Available across BC & Western Canada — From coast to pipeline",
                  "Clear communication — Real-time updates from pickup to drop-off",
                  "Competitive rates, no hidden fees — What we quote is what you pay",
                  "Reliable for one-offs or ongoing contracts — Use us when you need us",
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 min-w-[24px] bg-green-500/15 rounded-full flex items-center justify-center text-green-500 text-xs font-bold mt-0.5">✓</div>
                    <div className="text-slate-400 text-sm"><strong className="text-white font-semibold">{r.split(" — ")[0]}</strong> — {r.split(" — ")[1]}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
                <Image
                  src="/truck-and-trailer.jpg"
                  alt="RYDI Ram 3500 truck with MAXX-D trailer hauling a CASE excavator"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section id="areas" className="py-24 px-6 bg-[#0f172a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">Where We Operate</h2>
            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">Based in the Lower Mainland with regular runs to the Interior and Alberta pipeline corridors.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { region: "📍 Lower Mainland", cities: ["Vancouver", "Surrey", "Abbotsford", "Langley", "Burnaby", "Coquitlam"] },
              { region: "📍 Interior BC", cities: ["Kamloops", "Kelowna", "Prince George", "Fort St. John", "Vernon", "Penticton"] },
              { region: "📍 Alberta", cities: ["Calgary", "Edmonton", "Grande Prairie", "Red Deer", "Pipeline Routes"] },
            ].map((area, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 reveal">
                <h3 className="text-lg font-bold text-white mb-3">{area.region}</h3>
                <div className="flex flex-wrap gap-2">
                  {area.cities.map((city, j) => (
                    <span key={j} className="bg-white/5 px-3.5 py-1.5 rounded-full text-[13px] text-slate-400">{city}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Backup */}
      <section id="backup" className="py-24 px-6 bg-gradient-to-br from-[#1e1b4b] to-[#0f172a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">Your Backup Hauling Capacity</h2>
            <p className="text-slate-400 text-lg max-w-[700px] mx-auto">When primary carriers fail, RYDI steps in. Every contractor has a primary carrier — but equipment breaks down, drivers call in sick, and deadlines do not move.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: "🚨", title: "Emergency Fill-In", desc: "Primary carrier no-show? We are on the road in hours, not days. No contract required." },
              { icon: "📈", title: "Overflow Capacity", desc: "Too many loads, not enough trucks? We handle the overflow so you never miss a deadline." },
              { icon: "🤝", title: "No Long-Term Contract", desc: "Use us when you need us. No minimums, no lock-in, no monthly fees." },
            ].map((b, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center reveal">
                <div className="w-14 h-14 bg-orange-500/15 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">{b.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-slate-400 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => scrollTo("#quote")} className="inline-flex items-center gap-2 bg-orange-500 text-white px-10 py-4 rounded-lg text-base font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all cursor-pointer border-none">
              Set Up Backup Hauling
            </button>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-24 px-6 bg-[#020617] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <div className="max-w-[640px] mx-auto">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-12 md:p-12 reveal">
            <h2 className="text-[32px] font-extrabold text-white text-center mb-2">Need Something Hauled Right Now?</h2>
            <p className="text-slate-400 text-center mb-8">Tell us what, where, and when. We will get back to you within 15 minutes with a firm quote and availability.</p>

            {!formSubmitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                {/* Honeypot */}
                <div className="hidden">
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Full Name *</label>
                    <input type="text" id="name" name="name" required placeholder="John Smith" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Company (Optional)</label>
                    <input type="text" id="company" name="company" placeholder="ABC Construction" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required placeholder="604-999-1495" pattern="[0-9\\-\\+\\s\\(\\)]{10,}" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Email *</label>
                    <input type="email" id="email" name="email" required placeholder="you@company.com" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="load" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Load Type *</label>
                    <select id="load" name="load_type" required className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer">
                      <option value="" disabled selected className="bg-[#0f172a]">Select load type</option>
                      <option value="equipment" className="bg-[#0f172a]">Equipment (Excavator, Skid Steer, etc.)</option>
                      <option value="motorcycle" className="bg-[#0f172a]">Motorcycle</option>
                      <option value="materials" className="bg-[#0f172a]">Materials / Freight</option>
                      <option value="hotshot" className="bg-[#0f172a]">Hotshot / Urgent Delivery</option>
                      <option value="other" className="bg-[#0f172a]">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="urgency" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Urgency *</label>
                    <select id="urgency" name="urgency" required className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer">
                      <option value="" disabled selected className="bg-[#0f172a]">Select urgency</option>
                      <option value="same_day" className="bg-[#0f172a]">Same Day (Emergency)</option>
                      <option value="next_day" className="bg-[#0f172a]">Next Day</option>
                      <option value="this_week" className="bg-[#0f172a]">This Week</option>
                      <option value="scheduled" className="bg-[#0f172a]">Scheduled / Future</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pickup" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Pickup Location *</label>
                    <input type="text" id="pickup" name="pickup" required placeholder="City or Address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="dropoff" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Drop-off Location *</label>
                    <input type="text" id="dropoff" name="dropoff" required placeholder="City or Address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="details" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Job Details</label>
                  <textarea id="details" name="details" rows={3} placeholder="Weight, dimensions, special requirements..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600 resize-y" />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-white px-8 py-4 rounded-lg text-base font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                  {isSubmitting ? "Sending..." : "⚡ Get My Quote Now"}
                </button>
              </form>
            ) : (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                <h3 className="text-green-500 text-xl font-bold mb-2">✅ Quote Request Sent!</h3>
                <p className="text-slate-400">We have received your request and will call you back within 15 minutes with a firm quote. If this is urgent, call us directly at <a href="tel:6049991495" className="text-orange-500 font-bold">604-999-1495</a>.</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-slate-500 text-sm mb-1">Prefer to call?</p>
              <a href="tel:6049991495" className="text-orange-500 text-2xl font-extrabold no-underline">604-999-1495</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Testimonials */}
      <section className="py-24 px-6 bg-[#0f172a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">Built on Trust</h2>
            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">Professional hauling starts with professional people and reliable equipment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: "🛡️", title: "Fully Insured", desc: "Your load is protected from pickup to delivery. Peace of mind included on every haul." },
              { icon: "⏱️", title: "On-Time, Every Time", desc: "We do not miss deadlines. Real-time updates so you always know where your load is." },
              { icon: "💪", title: "Heavy-Duty Setup", desc: "3500 Cummins diesel + professional trailer. Built for the tough hauls others turn down." },
            ].map((t, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center reveal">
                <div className="w-12 h-12 bg-orange-500/15 rounded-xl flex items-center justify-center text-[22px] mx-auto mb-4">{t.icon}</div>
                <h3 className="text-[17px] font-bold text-white mb-2">{t.title}</h3>
                <p className="text-slate-400 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white tracking-tight">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "RYDI delivered our excavator same-day with zero hassle. Communication was clear from start to finish. Will definitely use again.", name: "Mike T.", role: "Pipeline Foreman" },
              { text: "We have used RYDI for 6 months straight. Never missed a deadline. That is rare in this business. Reliable backup when our primary carrier fails.", name: "Sarah L.", role: "Construction PM" },
              { text: "Called at 7 AM, load was picked up by 10. Fair price, no surprises. Will call again for our next equipment move.", name: "Jake R.", role: "Equipment Dealer" },
            ].map((t, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-7 relative reveal">
                <div className="text-6xl text-orange-500/30 leading-none absolute top-3 left-5">&ldquo;</div>
                <p className="text-slate-300 text-[15px] leading-relaxed mb-4 relative z-10">{t.text}</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name} <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full text-[11px] font-semibold ml-2">✓ Verified</span></div>
                    <div className="text-slate-500 text-[13px]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] border-t border-white/[0.05] pt-12 pb-6 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <a href="#" className="text-[26px] font-black text-white tracking-tight no-underline inline-block mb-3">
              RYDI<span className="text-orange-500">.</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[300px]">Emergency hotshot hauling across BC and Western Canada. Your backup when primary carriers fail. Same-day dispatch available 24/7.</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-4">Services</h4>
            <button onClick={() => scrollTo("#services")} className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Equipment Transport</button>
            <button onClick={() => scrollTo("#services")} className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Motorcycle Hauling</button>
            <button onClick={() => scrollTo("#services")} className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Hotshot Delivery</button>
            <button onClick={() => scrollTo("#services")} className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Materials & Freight</button>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-4">Company</h4>
            <button onClick={() => scrollTo("#areas")} className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Service Areas</button>
            <button onClick={() => scrollTo("#pricing")} className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => scrollTo("#backup")} className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Backup Hauling</button>
            <button onClick={() => scrollTo("#quote")} className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Get a Quote</button>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-4">Contact</h4>
            <a href="tel:6049991495" className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors no-underline">604-999-1495</a>
            <a href="mailto:builtby.sc@outlook.com" className="block text-slate-500 text-sm mb-2.5 hover:text-orange-500 transition-colors no-underline">builtby.sc@outlook.com</a>
            <span className="block text-slate-500 text-sm">Lower Mainland, BC</span>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto pt-6 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-[13px]">© 2026 RYDI Transport. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-green-500 text-[13px] font-semibold">
            🔒 Secure & Insured — Licensed & Bonded
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <a href="#quote" onClick={(e) => { e.preventDefault(); scrollTo("#quote"); }} className="fixed bottom-6 right-6 z-[998] bg-orange-500 text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/40 hover:bg-orange-600 hover:-translate-y-0.5 transition-all flex items-center gap-2 no-underline md:bottom-6 md:right-6 max-md:bottom-4 max-md:right-4 max-md:left-4 max-md:justify-center">
        ⚡ Get Quote
      </a>
    </main>
  );
}
