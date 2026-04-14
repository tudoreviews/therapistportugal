import { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import drNunoImg from "@/assets/dr-nuno-santos.jpeg";

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const whatsappLink =
    "https://wa.me/351936342632?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20os%20seus%20servi%C3%A7os.";

  return (
    <section id="sobre" className="py-24 px-6" ref={sectionRef}>
      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl bg-card border border-border overflow-hidden">
              <img
                src={drNunoImg}
                alt="Dr. Nuno Santos - Unconventional Therapist"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-2xl -z-10" />
          </div>

          {/* Text */}
          <div>
            <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">
              Sobre nós
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              O Especialista: Nuno Santos
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                O Dr. Nuno Santos é o fundador e terapeuta principal da
                Unconventional Therapist. Com mais de uma década de experiência
                clínica, especializou-se em abordagens terapêuticas inovadoras
                que combinam métodos tradicionais com técnicas de última geração.
              </p>
              <p>
                A sua visão é clara: cada pessoa merece uma abordagem
                personalizada e centrada nas suas necessidades reais. O objetivo
                não é apenas tratar sintomas, mas promover uma transformação
                profunda e duradoura na qualidade de vida dos seus pacientes.
              </p>
              <p>
                Num ambiente acolhedor e confidencial, o Dr. Nuno Santos
                acompanha cada caso com dedicação, rigor científico e uma
                perspetiva humana que faz toda a diferença.
              </p>
            </div>

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
              >
                <MessageCircle size={18} />
                Contactar via WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
