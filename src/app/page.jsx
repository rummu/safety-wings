import HeroSlider from '@/components/HeroSlider';
import CategoryGrid from '@/components/CategoryGrid';
import BrandsSection from '@/components/BrandsSection';
import AboutPreview from '@/components/AboutPreview';
import ClientsSection from '@/components/ClientsSection';
import CTABanner from '@/components/CTABanner';

export default function HomePage() {
    return (
        <>
            <HeroSlider />
            <CategoryGrid />
            <BrandsSection />
            <AboutPreview />
            <ClientsSection />
            <CTABanner />
        </>
    );
}
