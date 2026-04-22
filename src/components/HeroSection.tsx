import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#000000] overflow-hidden"
    >
      {/* Conteúdo da Esquerda (Texto) */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-20 md:px-12 lg:px-24 z-10 text-center md:text-left pt-32 md:pt-0">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white uppercase leading-tight">
            SENTE <span style={{ color: '#B4D600' }}>DORES</span> PELO <span style={{ color: '#B4D600' }}>CORPO</span>?
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-xl mb-10 leading-relaxed mx-auto md:mx-0">
            Descubra como a terapia não convencional pode transformar a sua qualidade de vida, 
            promovendo o equilíbrio e bem-estar que o seu corpo merece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="text-lg px-8 h-14 rounded-md bg-[#B4D600] hover:bg-[#B4D600]/90 text-black font-bold transition-all shadow-[0_0_20px_rgba(180,214,0,0.4)] hover:shadow-[0_0_30px_rgba(180,214,0,0.6)]" 
              asChild
            >
              <a href="#agendar">Agendar Agora</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 h-14 rounded-md border-white bg-transparent text-white hover:bg-white/10 font-bold transition-all" 
              asChild
            >
              <a href="#servicos">Nossos Serviços</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo da Direita (Imagem) */}
      <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end h-[450px] md:h-screen relative overflow-hidden bg-black">
        <img
          src={heroBanner}
          alt="Terapeutas - Terapia não convencional"
          className="w-full h-full object-contain md:object-right-bottom mix-blend-screen"
        />
      </div>
    </section>
  );
};

export default HeroSection;