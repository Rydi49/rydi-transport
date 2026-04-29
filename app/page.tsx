"use client";

import { useState, useEffect, useRef } from "react";

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
          if (entry.isIntersecting) entry.target.classList.add("active");
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
      alert("Something went wrong. Please call or text 604-999-1495.");
    }
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-[#f1f5f9]">
      {/* ─── Urgency Bar ─── */}
      <div className="fixed top-0 left-0 right-0 z-[1000] bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg">
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="hidden sm:inline">Need something moved today? We respond within minutes.</span>
        <span className="sm:hidden">We respond in minutes.</span>
        <a href="tel:6049991495" className="underline font-bold ml-1">Call 604-999-1495</a>
      </div>

      {/* ─── Navigation ─── */}
      <nav className={`fixed top-10 left-0 right-0 z-[999] px-5 transition-all duration-300 ${navScrolled ? "bg-[#020617]/98 shadow-lg" : "bg-[#0f172a]/95 backdrop-blur-xl"} border-b border-white/5`}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-14">
          <a href="#" className="text-2xl font-black text-white tracking-tight no-underline">
            RYDI<span className="text-orange-500">.</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollTo("#services")} className="text-[#f1f5f9] text-sm font-medium hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer">Services</button>
            <button onClick={() => scrollTo("#pricing")} className="text-[#f1f5f9] text-sm font-medium hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => scrollTo("#motorcycles")} className="text-[#f1f5f9] text-sm font-medium hover:text-orange-500 transition-colors bg-transparent border-none cursor-pointer">Motorcycles</button>
            <button onClick={() => scrollTo("#quote")} className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-orange-600 transition-all">Get a Quote</button>
          </div>
          <button className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
            <span className="w-6 h-0.5 bg-white" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0f172a] px-5 py-4 flex flex-col gap-3 border-b border-white/5">
            <button onClick={() => scrollTo("#services")} className="text-[#f1f5f9] text-base py-2 text-left bg-transparent border-none cursor-pointer">Services</button>
            <button onClick={() => scrollTo("#pricing")} className="text-[#f1f5f9] text-base py-2 text-left bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => scrollTo("#motorcycles")} className="text-[#f1f5f9] text-base py-2 text-left bg-transparent border-none cursor-pointer">Motorcycles</button>
            <button onClick={() => scrollTo("#quote")} className="text-orange-500 font-bold text-base py-2 text-left bg-transparent border-none cursor-pointer">Get a Quote</button>
          </div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center justify-center text-center px-5 pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] -z-20" />
        <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.08)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-[900px]">
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-500 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Same-Day Service Available
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-5 tracking-tight">
            Fast Local Transport<br />
            <span className="text-orange-500">Lower Mainland & Island</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-[640px] mx-auto mb-10 leading-relaxed">
            Motorcycles, marketplace pickups, equipment, and anything that needs to move — fast. Based in the Lower Mainland. Serving Vancouver Island routes. We show up.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mb-10">
            <button onClick={() => scrollTo("#quote")} className="inline-flex items-center gap-2 bg-orange-500 text-white px-7 py-4 rounded-lg text-base font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all cursor-pointer border-none">
              ⚡ Get a Quote
            </button>
            <a href="tel:6049991495" className="inline-flex items-center gap-2 bg-transparent text-[#f1f5f9] border-2 border-white/20 px-7 py-4 rounded-lg text-base font-bold hover:border-orange-500 hover:text-orange-500 transition-all no-underline">
              📞 Call / Text Now
            </a>
          </div>
          <div className="flex gap-6 justify-center flex-wrap text-[13px] text-slate-500">
            <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> Same-Day Available</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> Motorcycle Specialists</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> Island Routes</span>
            <span className="flex items-center gap-1.5"><span className="text-green-500 font-bold">✓</span> No Hidden Fees</span>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="py-20 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">What We Move</h2>
            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">From bikes to equipment to marketplace finds — if it fits on our trailer, we haul it.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🏍️", title: "Motorcycle Transport", desc: "Sport bikes, cruisers, dirt bikes, scooters. Secure tie-downs. Zero damage. Our specialty." },
              { icon: "📦", title: "Marketplace Pickup & Delivery", desc: "Bought something on Facebook Marketplace, Craigslist, or Kijiji? We pick it up and deliver it to you." },
              { icon: "🏗️", title: "Equipment Hauling", desc: "Dirt bikes, quads, tools, small machinery. We handle the heavy stuff so you don't have to." },
              { icon: "🚐", title: "Island & Long Distance", desc: "Vancouver Island, Interior BC, and beyond. Willing to travel anywhere for the right job." },
            ].map((s, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 hover:bg-white/[0.05] hover:border-orange-500/30 hover:-translate-y-1 transition-all reveal">
                <div className="w-12 h-12 bg-orange-500/15 rounded-xl flex items-center justify-center text-[22px] mb-4">{s.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Motorcycle Niche Section ─── */}
      <section id="motorcycles" className="py-20 px-5 bg-gradient-to-b from-[#0f172a] to-[#020617]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-500 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                Our Specialty
              </div>
              <h2 className="text-3xl md:text-[40px] font-extrabold text-white mb-4 tracking-tight">Motorcycle Transport Done Right</h2>
              <p className="text-slate-400 mb-6">We don't just throw bikes in a truck. We transport them the way they should be — secure, protected, and damage-free.</p>
              <div className="flex flex-col gap-3">
                {[
                  "Proper tie-downs and wheel chocks — no movement, no scratches",
                  "Covered and enclosed options available for weather protection",
                  "Dealership-to-home, home-to-shop, shop-to-track",
                  "Dirt bikes, sport bikes, cruisers, vintage — all types",
                  "Buying or selling? We handle the pickup or delivery",
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 min-w-[24px] bg-orange-500/15 rounded-full flex items-center justify-center text-orange-500 text-xs font-bold mt-0.5">✓</div>
                    <div className="text-slate-400 text-sm">{r}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
                <img
                  src="/truck-and-trailer.jpg"
                  alt="RYDI Ram 3500 truck with MAXX-D trailer hauling a CASE excavator"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">Simple Pricing. No Surprises.</h2>
            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">We quote upfront. You know exactly what you're paying before we move an inch.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center reveal">
              <h3 className="text-lg font-bold text-white">Local Runs</h3>
              <div className="text-5xl font-black text-white my-3">$80<span className="text-base text-slate-500 font-medium">–$120</span></div>
              <p className="text-slate-400 text-sm">Lower Mainland same-day<br/>Marketplace pickups, small items</p>
            </div>
            <div className="bg-orange-500/5 border border-orange-500 rounded-2xl p-8 text-center relative reveal">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold">Most Popular</div>
              <h3 className="text-lg font-bold text-white">Motorcycle Transport</h3>
              <div className="text-5xl font-black text-white my-3">$100<span className="text-base text-slate-500 font-medium">+</span></div>
              <p className="text-slate-400 text-sm">Any bike, any location<br/>Secure transport guaranteed</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 text-center reveal">
              <h3 className="text-lg font-bold text-white">Long Distance</h3>
              <div className="text-5xl font-black text-white my-3">Custom</div>
              <p className="text-slate-400 text-sm">Vancouver Island, Interior, Alberta<br/>Quote in under 15 minutes</p>
            </div>
          </div>
          <p className="text-center text-slate-500 text-[13px]">* Final price depends on distance, item size, and urgency. We always quote before we move.</p>
        </div>
      </section>

      {/* ─── Service Area ─── */}
      <section id="areas" className="py-20 px-5 bg-[#0f172a]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">Where We Go</h2>
            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">Based in the Lower Mainland. Willing to travel anywhere for the right job.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { region: "📍 Lower Mainland", cities: ["Vancouver", "Surrey", "Burnaby", "Richmond", "Langley", "Abbotsford", "Coquitlam", "Delta", "North Van", "West Van"] },
              { region: "📍 Vancouver Island", cities: ["Victoria", "Nanaimo", "Courtenay", "Campbell River", "Duncan", "Parksville", "Port Alberni"] },
              { region: "📍 Long Distance", cities: ["Kelowna", "Kamloops", "Penticton", "Whistler", "Seattle Area", "Anywhere for the right price"] },
            ].map((area, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 reveal">
                <h3 className="text-lg font-bold text-white mb-3">{area.region}</h3>
                <div className="flex flex-wrap gap-2">
                  {area.cities.map((city, j) => (
                    <span key={j} className="bg-white/5 px-3 py-1.5 rounded-full text-[13px] text-slate-400">{city}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust / Why Us ─── */}
      <section className="py-20 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14 reveal">
            <h2 className="text-3xl md:text-[42px] font-extrabold text-white mb-3 tracking-tight">Why People Call RYDI</h2>
            <p className="text-slate-400 text-lg max-w-[600px] mx-auto">We're not a big trucking company. We're fast, local, and we actually care about your stuff.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "⚡", title: "Fast Response", desc: "Text or call and we reply within minutes. No waiting days for a quote." },
              { icon: "🏍️", title: "Bike Specialists", desc: "We know motorcycles. Proper tie-downs, wheel chocks, and careful handling every time." },
              { icon: "🛡️", title: "Fully Insured", desc: "Your load is protected. Peace of mind from pickup to drop-off." },
              { icon: "💬", title: "Real Communication", desc: "We text updates, send photos, and keep you in the loop. No ghosting." },
              { icon: "📍", title: "Local & Island", desc: "Lower Mainland same-day. Vancouver Island regular runs. We go where you need us." },
              { icon: "🤝", title: "No Bullshit Pricing", desc: "Quote upfront. No hidden fees. No surprises when we arrive." },
            ].map((t, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 text-center reveal">
                <div className="w-12 h-12 bg-orange-500/15 rounded-xl flex items-center justify-center text-[22px] mx-auto mb-4">{t.icon}</div>
                <h3 className="text-[17px] font-bold text-white mb-2">{t.title}</h3>
                <p className="text-slate-400 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quote Form ─── */}
      <section id="quote" className="py-20 px-5 bg-[#020617] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        <div className="max-w-[640px] mx-auto">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-[20px] p-8 md:p-12 reveal">
            <h2 className="text-[28px] md:text-[32px] font-extrabold text-white text-center mb-2">Get a Quote in Minutes</h2>
            <p className="text-slate-400 text-center mb-8">Tell us what, where, and when. We reply fast with a firm price.</p>

            {!formSubmitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                <div className="hidden">
                  <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pickup" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Pickup Location *</label>
                    <input type="text" id="pickup" name="pickup" required placeholder="City or full address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="dropoff" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Drop-off Location *</label>
                    <input type="text" id="dropoff" name="dropoff" required placeholder="City or full address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="item" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">What are we moving? *</label>
                  <input type="text" id="item" name="item" required placeholder="Motorcycle, equipment, marketplace item, etc." className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="timeframe" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">When do you need it? *</label>
                    <select id="timeframe" name="timeframe" required className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer">
                      <option value="" disabled selected className="bg-[#0f172a]">Select timeframe</option>
                      <option value="today" className="bg-[#0f172a]">Today (ASAP)</option>
                      <option value="tomorrow" className="bg-[#0f172a]">Tomorrow</option>
                      <option value="this_week" className="bg-[#0f172a]">This Week</option>
                      <option value="next_week" className="bg-[#0f172a]">Next Week</option>
                      <option value="flexible" className="bg-[#0f172a]">Flexible</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" required placeholder="604-999-1495" pattern="[0-9\\-\\+\\s\\(\\)]{10,}" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Email (Optional)</label>
                  <input type="email" id="email" name="email" placeholder="you@email.com" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="details" className="text-[13px] font-semibold text-slate-300 uppercase tracking-wide">Anything else?</label>
                  <textarea id="details" name="details" rows={3} placeholder="Dimensions, weight, special handling needs..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] focus:outline-none focus:border-orange-500 focus:bg-white/[0.07] transition-all placeholder:text-slate-600 resize-y" />
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-white px-8 py-4 rounded-lg text-base font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-0.5 transition-all cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                  {isSubmitting ? "Sending..." : "⚡ Get My Quote Now"}
                </button>
              </form>
            ) : (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                <h3 className="text-green-500 text-xl font-bold mb-2">✅ Quote Request Sent!</h3>
                <p className="text-slate-400">We got your request and will text or call you back within minutes with a firm quote. If this is urgent, call us now at <a href="tel:6049991495" className="text-orange-500 font-bold">604-999-1495</a>.</p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-slate-500 text-sm mb-1">Rather text or call?</p>
              <a href="tel:6049991495" className="text-orange-500 text-2xl font-extrabold no-underline">604-999-1495</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-[#020617] border-t border-white/[0.05] pt-12 pb-6 px-5">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <a href="#" className="text-[26px] font-black text-white tracking-tight no-underline inline-block mb-3">
              RYDI<span className="text-orange-500">.</span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[300px]">Fast local transport for motorcycles, marketplace pickups, and equipment. Lower Mainland & Vancouver Island. Same-day available.</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-4">Services</h4>
            <button onClick={() => scrollTo("#services")} className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Motorcycle Transport</button>
            <button onClick={() => scrollTo("#services")} className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Marketplace Delivery</button>
            <button onClick={() => scrollTo("#services")} className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Equipment Hauling</button>
            <button onClick={() => scrollTo("#services")} className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Island & Long Distance</button>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-4">Company</h4>
            <button onClick={() => scrollTo("#areas")} className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Service Areas</button>
            <button onClick={() => scrollTo("#pricing")} className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Pricing</button>
            <button onClick={() => scrollTo("#motorcycles")} className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Motorcycles</button>
            <button onClick={() => scrollTo("#quote")} className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors text-left bg-transparent border-none cursor-pointer">Get a Quote</button>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wide mb-4">Contact</h4>
            <a href="tel:6049991495" className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors no-underline">604-999-1495</a>
            <a href="mailto:builtby.sc@outlook.com" className="block text-slate-500 text-sm mb-2 hover:text-orange-500 transition-colors no-underline">builtby.sc@outlook.com</a>
            <span className="block text-slate-500 text-sm">Lower Mainland, BC</span>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto pt-6 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-slate-600 text-[13px]">© 2026 RYDI Transport. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-green-500 text-[13px] font-semibold">
            🔒 Insured & Licensed — Lower Mainland BC
          </div>
        </div>
      </footer>

      {/* ─── Sticky Call/Text Button ─── */}
      <a href="tel:6049991495" className="fixed bottom-5 right-5 z-[998] bg-orange-500 text-white px-5 py-3 rounded-full font-bold text-sm shadow-lg shadow-orange-500/40 hover:bg-orange-600 transition-all flex items-center gap-2 no-underline md:bottom-5 md:right-5">
        📞 Call / Text
      </a>
    </main>
  );
}
