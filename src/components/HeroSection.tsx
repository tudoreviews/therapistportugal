import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-6">
          Terapias que desafiam o convencional
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          A sua jornada de
          <br />
          <span className="text-primary">bem-estar</span> começa aqui
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Abordagens terapêuticas inovadoras e personalizadas para transformar a sua saúde física e mental.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => scrollTo("agendar")} size="lg" className="text-base px-8">
            Agendar Consulta
          </Button>
          <Button onClick={() => scrollTo("servicos")} variant="outline" size="lg" className="text-base px-8">
            Explorar Serviços
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollTo("servicos")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
};

export default HeroSection;
