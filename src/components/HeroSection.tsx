import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="bg-black min-h-screen w-full flex items-center pt-24 lg:pt-0 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-[20px] md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-end relative">
          
          {/* Lado Esquerdo: Texto */}
          <div className="flex flex-col text-left order-1 z-10">
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight uppercase tracking-tight">
              SENTE <span className="text-[#B4D600]">DORES</span> PELO <span className="text-[#B4D600]">CORPO</span>?
            </h1>
            
            <p className="text-white text-lg md:text-xl leading-relaxed mb-10 max-w-xl font-light">
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
                className="border-white text-white hover:bg-white/10 font-bold h-14 px-8 text-lg rounded-none transition-all bg-transparent"
                asChild
              >
                <a href="#servicos">VER SERVIÇOS</a>
              </Button>
            </div>
          </div>
          
          {/* Lado Direito: Imagem */}
          <div className="flex justify-center lg:justify-end items-end order-2 w-full lg:h-full lg:relative">
            <img
              src="/foto_nuno_santosterapia.png"
              alt="Nuno Santos Terapia"
              className="w-full lg:w-auto lg:h-[350%] object-contain brightness-110 lg:absolute lg:bottom-0 lg:right-0 lg:-translate-x-10 lg:translate-y-20"
              style={{
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 98%)'
              }}
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;