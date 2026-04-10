import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
          <img src={logo} alt="Unconventional Therapist" className="h-10 w-auto object-contain" />
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="text-primary">U</span>nconventional <span className="text-primary">T</span>herapist
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("servicos")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Serviços</button>
          <button onClick={() => scrollTo("sobre")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sobre</button>
          <button onClick={() => scrollTo("testemunhos")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testemunhos</button>
          <Button onClick={() => scrollTo("agendar")} size="sm">Agendar Consulta</Button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-4 flex flex-col gap-3">
          <button onClick={() => scrollTo("servicos")} className="text-sm text-muted-foreground hover:text-foreground text-left py-1">Serviços</button>
          <button onClick={() => scrollTo("sobre")} className="text-sm text-muted-foreground hover:text-foreground text-left py-1">Sobre</button>
          <button onClick={() => scrollTo("testemunhos")} className="text-sm text-muted-foreground hover:text-foreground text-left py-1">Testemunhos</button>
          <Button onClick={() => scrollTo("agendar")} size="sm" className="w-fit">Agendar Consulta</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
