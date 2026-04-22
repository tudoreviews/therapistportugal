import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo-wide.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 md:h-24 flex items-center justify-between">
        <button 
          onClick={() => scrollTo("hero")} 
          className="flex items-center shrink-0 hover:opacity-80 transition-opacity"
        >
          <img src={logo} alt="Unconventional Therapist" className="h-10 sm:h-12 md:h-16 w-auto object-contain" />
        </button>

        <div className="hidden md:flex items-center gap-8 lg:gap-14">
          <button onClick={() => scrollTo("servicos")} className="text-sm lg:text-base font-medium text-muted-foreground hover:text-primary transition-colors">Serviços</button>
          <button onClick={() => scrollTo("sobre")} className="text-sm lg:text-base font-medium text-muted-foreground hover:text-primary transition-colors">Sobre</button>
          <button onClick={() => scrollTo("resultados")} className="text-sm lg:text-base font-medium text-muted-foreground hover:text-primary transition-colors">Resultados</button>
          <Button onClick={() => scrollTo("agendar")} size="lg" className="text-sm lg:text-base px-6 h-11">Agendar Consulta</Button>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-[81px] bg-background/98 backdrop-blur-xl z-40 md:hidden transition-all duration-300 ease-in-out origin-top",
        isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
      )}>
        <div className="flex flex-col items-center justify-start h-full pt-10 px-6 gap-8">
          <button onClick={() => scrollTo("servicos")} className="text-2xl font-semibold text-foreground">Serviços</button>
          <button onClick={() => scrollTo("sobre")} className="text-2xl font-semibold text-foreground">Sobre</button>
          <button onClick={() => scrollTo("resultados")} className="text-2xl font-semibold text-foreground">Resultados</button>
          <Button 
            onClick={() => scrollTo("agendar")} 
            size="lg" 
            className="w-full text-lg h-14 mt-4"
          >
            Agendar Consulta
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
