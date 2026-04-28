"use client";

import Link from "next/link";
import { Phone, Truck, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-rydi-black/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Truck className="w-7 h-7 text-rydi-accent" />
            <span className="text-xl font-bold tracking-tight text-rydi-white">
              RYDI <span className="text-rydi-accent">Transport</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-rydi-white hover:text-rydi-accent transition-colors">Home</Link>
            <Link href="/quote" className="text-sm font-bold text-rydi-accent hover:text-rydi-white transition-colors">Get a Quote</Link>
            <Link href="/request-haul" className="text-sm font-medium text-rydi-white hover:text-rydi-accent transition-colors">Request a Haul</Link>
            <Link href="/contractor" className="text-sm font-medium text-rydi-white hover:text-rydi-accent transition-colors">Contractor Services</Link>
            <a href="tel:+16049991495" className="flex items-center gap-2 text-sm font-semibold text-rydi-accent hover:text-rydi-white transition-colors">
              <Phone className="w-4 h-4" />
              604-999-1495
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-rydi-white">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-rydi-dark border-b border-white/10 px-4 py-4 space-y-4">
          <Link href="/" className="block text-sm font-medium text-rydi-white hover:text-rydi-accent" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/quote" className="block text-sm font-bold text-rydi-accent hover:text-rydi-white" onClick={() => setOpen(false)}>Get a Quote</Link>
          <Link href="/request-haul" className="block text-sm font-medium text-rydi-white hover:text-rydi-accent" onClick={() => setOpen(false)}>Request a Haul</Link>
          <Link href="/contractor" className="block text-sm font-medium text-rydi-white hover:text-rydi-accent" onClick={() => setOpen(false)}>Contractor Services</Link>
          <a href="tel:+16049991495" className="flex items-center gap-2 text-sm font-semibold text-rydi-accent">
            <Phone className="w-4 h-4" />
            604-999-1495
          </a>
        </div>
      )}
    </nav>
  );
}
