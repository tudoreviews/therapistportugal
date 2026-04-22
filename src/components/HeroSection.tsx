import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#000000] overflow-hidden">
      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 z-10 text-center md:text-left pt-32 md:pt-0">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[1] mb-8 text-white uppercase italic">
            SENTE DORES <br className="hidden sm:block" />
            <span className="text-primary not-italic">PELO CORPO?</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed mx-auto md:mx-0 font-medium">
            Descubra como a terapia não convencional pode transformar a sua qualidade de vida, 
            promovendo o equilíbrio e bem-estar que o seu corpo merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <Button size="lg" className="text-lg px-10 h-16 rounded-full shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-transform hover:scale-105" asChild>
              <a href="#agendar">Agendar Agora</a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 h-16 rounded-full border-white/20 text-white hover:bg-white/10 font-bold transition-all" asChild>
              <a href="#servicos">Nossos Serviços</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full md:w-1/2 h-[400px] md:h-screen relative overflow-hidden">
        <img
          src={heroBanner}
          alt="Dr. Nuno Santos - Terapia não convencional"
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>
    </section>
  );
};

export default HeroSection;
