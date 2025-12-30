import FeaturedDestinations from '@/components/modules/Home/FeaturedDestination';
import Hero from '@/components/modules/Home/Hero';
import HowItWorks from '@/components/modules/Home/HowItWorks';
import Testimonials from '@/components/modules/Home/Testimonial';
import TopRatedGuides from '@/components/modules/Home/TopRatedGuides';
import TrustBar from '@/components/modules/Home/TrustBar';
import Footer from '@/components/shared/PublicFooter';



const Home = () => {
    return (
        <>
            <Hero />
            <TrustBar />
            <HowItWorks/>
            <FeaturedDestinations/>
            <TopRatedGuides/>
            <Testimonials/>
            <Footer/>
        </>
    );
};

export default Home;