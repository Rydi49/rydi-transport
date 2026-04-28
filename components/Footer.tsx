import Link from "next/link";
import { Phone, Truck, MapPin, Clock, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-rydi-black border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-6 h-6 text-rydi-accent" />
              <span className="text-lg font-bold text-rydi-white">RYDI <span className="text-rydi-accent">Transport</span></span>
            </div>
            <p className="text-sm text-rydi-muted leading-relaxed">
              Emergency hotshot hauling. Backup capacity for contractors who can not afford delays.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-rydi-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-rydi-muted">
              <li><Link href="/quote" className="hover:text-rydi-accent transition-colors">Get a Quote (15 min)</Link></li>
              <li><Link href="/request-haul" className="hover:text-rydi-accent transition-colors">Request a Haul</Link></li>
              <li><Link href="/contractor" className="hover:text-rydi-accent transition-colors">Contractor Services</Link></li>
              <li>Emergency Dispatch</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-rydi-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-rydi-muted">
              <li>
                <a href="tel:+16049991495" className="hover:text-rydi-accent transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  604-999-1495
                </a>
              </li>
              <li>
                <a href="mailto:builtby.sc@outlook.com" className="hover:text-rydi-accent transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  builtby.sc@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lower Mainland to Interior to Alberta
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-rydi-white mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-rydi-muted">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Mon – Sat: 6:00 AM – 8:00 PM
              </li>
              <li>Sunday: Emergency calls only</li>
              <li className="text-rydi-accent font-medium">Emergency dispatch 24/7</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 text-center text-sm text-rydi-muted">
          <p>&copy; {new Date().getFullYear()} RYDI Transport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
