import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Elena made our Barcelona trip unforgettable. We saw hidden plazas we never would have found in a guidebook. Truly an authentic experience!",
    author: "James Wilson",
    role: "Traveler from USA",
    guideName: "Elena Rodriguez",
    destination: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "The background-check badge gave us peace of mind. Kenji was professional, knowledgeable, and spoke perfect English. Highly recommend!",
    author: "Marie Lefebvre",
    role: "Traveler from France",
    guideName: "Kenji Tanaka",
    destination: "Kyoto, Japan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100",
  },
  {
    quote: "I've used many travel apps, but the personal touch here is different. It felt like walking around London with an old friend who knows all the secrets.",
    author: "David Chen",
    role: "Digital Nomad",
    guideName: "Sarah Miller",
    destination: "London, UK",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Stories from Our Community
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover why thousands of travelers trust our verified local guides for their adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col relative"
            >
              {/* Quote Icon Decoration */}
              <Quote className="absolute top-6 right-8 text-slate-100 h-12 w-12 -z-0" />
              
              <div className="relative z-10 flex-grow">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-slate-700 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-50 relative z-10">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.author}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>

              {/* Context Tag */}
              <div className="mt-4 bg-blue-50 text-blue-700 text-[10px] uppercase tracking-wider font-bold py-1 px-3 rounded-md self-start">
                Toured with {t.guideName.split(' ')[0]} • {t.destination}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}