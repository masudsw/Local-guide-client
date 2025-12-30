import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container px-4 mx-auto pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="text-blue-500" />
              LocalGuide
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Connecting travelers with verified local experts for authentic, 
              safe, and unforgettable city adventures worldwide.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-blue-500 transition-colors"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Explore</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Find a Guide</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">All Destinations</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Travel Stories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Safety for Travelers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Become a Guide</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Stay Inspired</h3>
            <p className="text-sm text-slate-400 mb-4">
              Get travel tips and exclusive guide deals in your inbox.
            </p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} LocalGuide Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}