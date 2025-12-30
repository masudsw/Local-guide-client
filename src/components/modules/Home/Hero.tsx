// This is a Server Component by default

import { HeroSearchForm } from "@/components/hero-search-form";


export default function Hero() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-slate-900">
              Discover Your City With Verified Local Guides
            </h1>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              Experience authentic tours with background-checked guides.
            </p>
          </div>

          {/* This is the Client Component injected into the Server Component */}
          <HeroSearchForm />
          
        </div>
      </div>
    </section>
  );
}