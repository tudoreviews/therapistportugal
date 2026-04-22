import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="bg-[#000000] min-h-screen w-full flex items-center pt-24 lg:pt-0 overflow-hidden"
    >
      <div className="container mx-auto px-8 md:px-12 lg:px-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Coluna 1: Texto (50% no Desktop) */}
          <div className="flex flex-col text-center lg:text-left order-1 z-10 py-8 lg:py-20">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black leading-[0.9] text-white mb-8 uppercase tracking-tighter">
              SENTE <span className="text-[#B4D600]">DORES</span> <br className="hidden lg:block" />
              PELO <span className="text-[#B4D600]">CORPO</span>?
            </h1>
            
            <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 font-medium">
              Especialistas em terapia não convencional focada na eliminação da dor e recuperação total da sua mobilidade de forma rápida e segura.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-[#B4D600] hover:bg-[#B4D600]/90 text-black font-extrabold h-16 px-10 text-xl rounded-md transition-all shadow-[0_0_20px_rgba(180,214,0,0.4)]"
                asChild
              >
                <a href="#agendar">AGENDAR CONSULTA</a>
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-white text-white hover:bg-white/10 font-extrabold h-16 px-10 text-xl rounded-md transition-all"
                asChild
              >
                <a href="#servicos">VER SERVIÇOS</a>
              </Button>
            </div>
          </div>
          
          {/* Coluna 2: Imagem (Recorte limpo com tratamento) */}
          <div className="flex justify-center items-end order-2 h-[35vh] sm:h-[40vh] lg:h-[85vh] w-full relative overflow-hidden">
            <img
              src={heroBanner}
              alt="Terapeutas Profissionais"
              className="w-full h-full object-contain object-bottom mix-blend-screen brightness-[1.1] contrast-[1.1]"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;