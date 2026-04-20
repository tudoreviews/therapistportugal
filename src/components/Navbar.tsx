import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-wide.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center shrink-0">
          <img src={logo} alt="Unconventional Therapist" className="h-14 md:h-16 w-auto object-contain" />
        </button>

        <div className="hidden md:flex items-center gap-10 lg:gap-14">
          <button onClick={() => scrollTo("servicos")} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Serviços</button>
          <button onClick={() => scrollTo("sobre")} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Sobre</button>
          <button onClick={() => scrollTo("resultados")} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">Resultados</button>
          <Button onClick={() => scrollTo("agendar")} size="lg" className="text-base px-6">Agendar Consulta</Button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-5 flex flex-col gap-4">
          <button onClick={() => scrollTo("servicos")} className="text-base font-medium text-muted-foreground hover:text-foreground text-left py-1">Serviços</button>
          <button onClick={() => scrollTo("sobre")} className="text-base font-medium text-muted-foreground hover:text-foreground text-left py-1">Sobre</button>
          <button onClick={() => scrollTo("resultados")} className="text-base font-medium text-muted-foreground hover:text-foreground text-left py-1">Resultados</button>
          <Button onClick={() => scrollTo("agendar")} size="lg" className="w-fit">Agendar Consulta</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
