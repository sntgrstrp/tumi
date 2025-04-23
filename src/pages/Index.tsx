
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import StepByStepFinder from "@/components/StepByStepFinder";
import ResultsSection from "@/components/ResultsSection";
import ComparisonSection from "@/components/ComparisonSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [finderResetKey, setFinderResetKey] = useState(0);

  const handleResetFinder = () => {
    setFinderResetKey((v) => v + 1);
    setTimeout(() => {
      // Scroll al finder
      const finder = document.getElementById("step-by-step-finder");
      if (finder) {
        finder.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <StepByStepFinder resetKey={finderResetKey} />
        <ResultsSection onResetFinder={handleResetFinder} />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
