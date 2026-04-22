import { useState } from "react";
import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" className="relative w-full pt-20 md:pt-24 bg-background overflow-hidden">
      <div className="relative w-full aspect-[16/9] md:aspect-[1920/1080] min-h-[400px] md:min-h-0">
        <img
          src={heroBanner}
          alt="Sente dores pelo corpo? Descubra como a terapia não convencional pode ajudar a sua vida."
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-[center_top] sm:object-center transition-all duration-1000 ease-out ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
          }`}
        />
      </div>
    </section>
  );
};

export default HeroSection;
