import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RYDI Transport | Emergency Hotshot Hauling BC & Western Canada",
  description: "Same-day hotshot hauling for equipment, motorcycles & materials. Quotes in 15 min. Available Lower Mainland to Interior to Alberta pipeline routes. Emergency dispatch. Call 604-999-1495.",
  keywords: "hotshot hauling, emergency transport, BC hauling, pipeline transport, equipment hauling, same day delivery, Lower Mainland, Alberta, 604-999-1495",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
