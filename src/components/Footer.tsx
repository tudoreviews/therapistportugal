import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Unconventional Therapist" className="h-12 w-auto object-contain" />
              <h3 className="font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span className="text-primary">U</span>nconventional <span className="text-primary">T</span>herapist
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Terapias inovadoras e personalizadas para transformar a sua saúde e bem-estar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Contactos</h4>
            <div className="space-y-3">
              <a href="mailto:info@unconventionaltherapist.pt" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={16} className="text-primary" />
                info@unconventionaltherapist.pt
              </a>
              <a href="tel:+351900000000" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone size={16} className="text-primary" />
                +351 900 000 000
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary shrink-0" />
                Lisboa, Portugal
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">Horário</h4>
            <div className="space-y-2 text-sm text-muted-foreground mb-5">
              <p>Segunda a Sexta: 09:00 — 19:00</p>
              <p>Sábado: 09:00 — 13:00</p>
              <p>Domingo: Encerrado</p>
            </div>
            <a
              href="tel:+351936342632"
              className="block bg-primary text-primary-foreground rounded-lg px-4 py-3 font-bold text-sm leading-snug shadow-lg hover:brightness-110 transition"
            >
              24H DE EMERGÊNCIAS:{" "}
              <span className="underline underline-offset-2">+351 936 342 632</span>
              <span className="block text-xs font-semibold opacity-80 mt-1">
                (VALOR SOB CONSULTA)
              </span>
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Unconventional Therapist. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
