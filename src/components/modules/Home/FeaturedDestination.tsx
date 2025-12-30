import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
    {
        city: "Paris",
        country: "France",
        guides: 42,
        price: 85,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800",
    },
    {
        city: "Tokyo",
        country: "Japan",
        guides: 38,
        price: 95,
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
    },
    {
        city: "Rome",
        country: "Italy",
        guides: 29,
        price: 70,
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800",
    },
    {
        city: "New York",
        country: "USA",
        guides: 55,
        price: 110,
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800",
    },
];

export default function FeaturedDestinations() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container px-4 mx-auto">
                {/* Header with "View All" button */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Popular Destinations
                        </h2>
                        <p className="text-slate-600">
                            Explore the world through the eyes of locals. Verified guides available in over 100+ cities worldwide.
                        </p>
                    </div>
                    <Button variant="outline" className="hidden md:flex items-center gap-2">
                        View All Cities <ArrowRight size={16} />
                    </Button>
                </div>

                {/* Destination Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-4/5 w-full">
                                <Image
                                    src={dest.image}
                                    alt={`${dest.city}, ${dest.country}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Text Overlay (Bottom) */}
                                <div className="absolute bottom-0 left-0 p-5 w-full text-white">
                                    <p className="text-sm font-medium text-blue-400 mb-1">{dest.country}</p>
                                    <h3 className="text-2xl font-bold mb-2">{dest.city}</h3>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Users size={16} />
                                            <span>{dest.guides} Guides</span>
                                        </div>
                                        <div className="text-sm">
                                            from <span className="font-bold text-lg">${dest.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile-only View All Button */}
                <Button variant="outline" className="w-full mt-8 md:hidden">
                    View All Cities
                </Button>
            </div>
        </section>
    );
}