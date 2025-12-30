import Image from "next/image";
import { Star, BadgeCheck, Languages, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const guides = [
  {
    name: "Elena Rodriguez",
    location: "Barcelona, Spain",
    rating: 4.9,
    reviews: 124,
    specialty: "History & Architecture",
    languages: ["English", "Spanish", "Catalan"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=500",
    isVerified: true,
  },
  {
    name: "Kenji Tanaka",
    location: "Kyoto, Japan",
    rating: 5.0,
    reviews: 89,
    specialty: "Hidden Temples & Zen Gardens",
    languages: ["English", "Japanese"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500",
    isVerified: true,
  },
  {
    name: "Sarah Miller",
    location: "London, UK",
    rating: 4.8,
    reviews: 210,
    specialty: "Street Art & Food Markets",
    languages: ["English", "French"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=500",
    isVerified: true,
  },
];

export default function TopRatedGuides() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Meet Our Top-Rated Guides
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Background-checked professionals ready to show you the heart of their city.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <div key={index} className="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 transition-all hover:shadow-xl">
              {/* Profile Image */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {guide.isVerified && (
                  <Badge className="absolute top-4 right-4 bg-white/90 text-blue-600 hover:bg-white flex gap-1 items-center border-none">
                    <BadgeCheck size={14} /> Verified
                  </Badge>
                )}
              </div>

              {/* Guide Info */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{guide.name}</h3>
                    <div className="flex items-center text-slate-500 text-sm gap-1">
                      <MapPin size={14} /> {guide.location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg text-sm font-bold">
                    <Star size={14} className="fill-yellow-700" />
                    {guide.rating}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-blue-600 mb-1">Expert in:</p>
                  <p className="text-slate-600 text-sm line-clamp-1">{guide.specialty}</p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-slate-400">
                  <Languages size={16} />
                  <div className="flex gap-1">
                    {guide.languages.map((lang) => (
                      <span key={lang} className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className="mt-8 w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors">
                  View Profile
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}