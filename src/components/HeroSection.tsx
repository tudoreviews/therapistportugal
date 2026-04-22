import { useState } from "react";
import heroBanner from "@/assets/hero-banner.png";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex flex-col md:flex-row bg-[#000000] overflow-hidden pt-20 md:pt-0">
      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:py-20 md:px-12 lg:px-24 z-10 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-white">
          SENTE DORES <br className="hidden sm:block" />
          <span className="text-primary">PELO CORPO?</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-8 leading-relaxed mx-auto md:mx-0">
          Descubra como a terapia não convencional pode ajudar a sua vida, 
          promovendo equilíbrio e bem-estar integral.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Button size="lg" className="text-lg px-8 h-14 rounded-xl shadow-xl shadow-primary/20" asChild>
            <a href="#agendar">Agendar Agora</a>
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 h-14 rounded-xl border-white/20 text-white hover:bg-white/10" asChild>
            <a href="#servicos">Nossos Serviços</a>
          </Button>
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full md:w-1/2 h-[300px] md:h-full min-h-[300px] md:min-h-screen">
        <img
          src={heroBanner}
          alt="Dr. Nuno Santos - Terapia não convencional"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
