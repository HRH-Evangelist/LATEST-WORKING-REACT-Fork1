import { useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { InteractiveExperience } from './components/InteractiveExperience';
import { CustomizationSection } from './components/CustomizationSection';
import { ActivateCard } from './components/ActivateCard';
import { SocialProof } from './components/SocialProof';
import { SupportSection } from './components/SupportSection';
import { Footer } from './components/Footer';

export default function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <Header />
      
      <main>
        <HeroSection />
        <ProductShowcase />
        <InteractiveExperience />
        <ActivateCard />
        <SocialProof />
        <CustomizationSection />
        <SupportSection />
      </main>
      
      <Footer />
    </div>
  );
}