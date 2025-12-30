import { Search, UserCheck, Map } from "lucide-react";

const steps = [
  {
    title: "Find Your Destination",
    description: "Enter the city you're visiting and discover a curated list of the best local experts available.",
    icon: Search,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pick a Verified Guide",
    description: "Browse detailed profiles, read reviews, and choose a guide who has passed our rigorous background checks.",
    icon: UserCheck,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Explore Like a Local",
    description: "Book your tour and enjoy a personalized, safe adventure away from the typical tourist crowds.",
    icon: Map,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How LocalGuide Works
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Your safety is our priority. We’ve made it simple to find and book
            authentic experiences with people you can trust.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-slate-200 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Icon Circle */}
              <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:scale-110 duration-300`}>
                <step.icon size={36} />
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
              
              {/* Mobile Step Indicator */}
              <span className="mt-4 text-sm font-bold text-slate-300 md:hidden">
                Step {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}