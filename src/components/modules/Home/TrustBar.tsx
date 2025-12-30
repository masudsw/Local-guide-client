import React from 'react';

const partners = [
  { name: "Forbes", logo: "FORBES" },
  { name: "TechCrunch", logo: "TechCrunch" },
  { name: "Travel + Leisure", logo: "T+L" },
  { name: "BBC Travel", logo: "BBC" },
  { name: "Condé Nast", logo: "CN Traveler" },
  { name: "National Geographic", logo: "NAT GEO" },
];

export default function TrustBar() {
  return (
    <section className="w-full py-10 bg-white border-y border-slate-100">
      <div className="container px-4 mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400 mb-8">
          Featured & Trusted By
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner) => (
            <div 
              key={partner.name} 
              className="flex items-center justify-center"
            >
              {/* Note: In a real project, replace these spans with <img> or <svg> tags */}
              <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">
                {partner.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}