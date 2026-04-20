import { useState } from "react";
import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" className="relative w-full pt-24 bg-background">
      <img
        src={heroBanner}
        alt="Sente dores pelo corpo? Descubra como a terapia não convencional pode ajudar a sua vida."
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto object-cover object-center transition-all duration-1000 ease-out ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
        }`}
      />
    </section>
  );
};

export default HeroSection;
