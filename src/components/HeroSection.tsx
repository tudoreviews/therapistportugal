import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="bg-black min-h-[60vh] lg:min-h-[70vh] w-full flex items-center pt-24 lg:pt-32 pb-4 lg:pb-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-[20px] md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end relative">
          
          {/* Lado Esquerdo: Texto */}
          <div className="flex flex-col text-left order-1 z-10">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight uppercase tracking-tight">
              TENS <span className="text-[#B4D600]">DORES</span> NO <span className="text-[#B4D600]">CORPO</span>?
            </h1>
            
            <p className="text-lg md:text-xl mb-10 max-w-xl font-light">
              Especialistas em terapia não convencional focada na eliminação da dor e recuperação total da sua mobilidade de forma rápida e segura.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button 
                size="lg" 
                className="bg-[#B4D600] hover:bg-[#B4D600]/90 text-black font-bold h-14 px-8 text-lg rounded-none transition-all"
                asChild
              >
                <a href="#agendar">AGENDAR CONSULTA</a>
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-white text-white hover:bg-[#B4D600] hover:border-[#B4D600] hover:text-black font-bold h-14 px-8 text-lg rounded-none transition-all bg-transparent"
                asChild
              >
                <a href="#servicos">VER SERVIÇOS</a>
              </Button>
            </div>
          </div>
          
          {/* Lado Direito: Imagem */}
          <div className="flex justify-center lg:justify-end items-end order-2 w-full">
            <img
              src="/foto_nuno_santosterapia.png"
              alt="Nuno Santos Terapia"
              className="w-full lg:w-auto max-h-[400px] lg:max-h-[600px] object-contain brightness-110 origin-bottom transform scale-[1.6] translate-y-10"
              style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
              }}
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;