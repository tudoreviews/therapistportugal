import { Instagram, Phone, MapPin, ShieldCheck, FileText, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <img src={logo} alt="Unconventional Therapist" className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105" />
              <h3 className="font-bold text-xl md:text-2xl tracking-tight">
                <span className="text-primary">U</span>nconventional <span className="text-primary">T</span>herapist
              </h3>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              Terapias inovadoras e personalizadas para transformar a sua saúde e bem-estar integral.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground mb-8">Contactos</h4>
            <div className="space-y-5">
              <a href="https://www.instagram.com/nuno.therapist.pt" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-4 text-base text-muted-foreground hover:text-primary transition-all group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram size={18} className="text-primary" />
                </div>
                @nuno.therapist.pt
              </a>
              <a href="tel:+351936342632" className="flex items-center justify-center md:justify-start gap-4 text-base text-muted-foreground hover:text-primary transition-all group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone size={18} className="text-primary" />
                </div>
                +351 936 342 632
              </a>
              <div className="flex items-center justify-center md:justify-start gap-4 text-base text-muted-foreground group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin size={18} className="text-primary shrink-0" />
                </div>
                Lisboa, Portugal
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground mb-8">Horário</h4>
            <div className="space-y-3 text-base text-muted-foreground mb-8">
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Segunda a Sexta: 09:00 — 19:00
              </p>
              <p className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Sábado: 09:00 — 13:00
              </p>
              <p className="flex items-center gap-3 opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Domingo: Encerrado
              </p>
            </div>
            <a
              href="tel:+351936342632"
              className="group inline-flex items-center gap-3 bg-destructive text-destructive-foreground rounded-2xl px-6 py-4 font-black text-sm tracking-wide hover:scale-105 active:scale-95 transition-all shadow-xl shadow-destructive/20"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              24H EMERGÊNCIAS: +351 936 342 632
            </a>
            <p className="text-[10px] text-muted-foreground mt-3 uppercase tracking-widest font-bold opacity-60 italic">Valor sob consulta prévia</p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-foreground mb-8">Informação Legal</h4>
            <div className="space-y-4 mb-8">
              <Link to="/politica-privacidade" className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <ShieldCheck size={16} className="text-primary/70 group-hover:text-primary" />
                Política de Privacidade
              </Link>
              <Link to="/termos-uso" className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <FileText size={16} className="text-primary/70 group-hover:text-primary" />
                Termos de Uso
              </Link>
            </div>
            
            <a 
              href="https://www.livroreclamacoes.pt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 inline-block transition-transform hover:scale-105"
              title="Livro de Reclamações Eletrónico"
            >
              <img 
                src="https://www.livroreclamacoes.pt/assets/img/logo-livro-reclamacoes.png" 
                alt="Livro de Reclamações Eletrónico" 
                className="h-14 md:h-16 w-auto"
              />
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-10 text-center space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto italic">
            Em caso de litígio, o consumidor pode recorrer a uma Entidade de Resolução Alternativa de Litígios de Consumo (ex: CNIACC - Centro Nacional de Informação e Arbitragem de Conflitos de Consumo).
          </p>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} Unconventional Therapist. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
