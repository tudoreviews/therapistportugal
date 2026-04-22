import { useState } from "react";
import heroBanner from "@/assets/hero-banner.png";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" className="relative w-full pt-28 md:pt-32 pb-12 md:pb-20 bg-background overflow-hidden px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            SENTE DORES <br className="hidden sm:block" />
            <span className="text-primary">PELO CORPO?</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            Descubra como a terapia não convencional pode ajudar a sua vida, 
            promovendo equilíbrio e bem-estar integral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="text-lg px-8 h-14 rounded-xl shadow-xl shadow-primary/20" asChild>
              <a href="#agendar">Agendar Agora</a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 h-14 rounded-xl border-primary/20" asChild>
              <a href="#servicos">Nossos Serviços</a>
            </Button>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 relative flex justify-center items-center w-full max-w-[300px] md:max-w-none mx-auto">
          <div className="relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center">
            {/* Circular frame for image */}
            <div className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl transition-all duration-1000 ${
              loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}>
              <img
                src={heroBanner}
                alt="Dr. Nuno Santos - Terapia não convencional"
                onLoad={() => setLoaded(true)}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 w-full h-full bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[120%] h-[120%] border border-primary/10 rounded-full animate-[pulse_8s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;