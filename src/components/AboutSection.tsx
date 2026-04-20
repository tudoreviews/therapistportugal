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
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
              <p>
                Sou Nuno Santos, terapeuta não convencional apaixonado pelo que faço desde 1995.
              </p>
              <p>
                O meu percurso iniciou-se no Batalhão de Serviços e Saúde das Forças Armadas, em Coimbra. Ao longo de mais de 25 anos, especializei-me em terapias alternativas focadas no equilíbrio e bem-estar integral.
              </p>
              <p>
                Com formação em Osteopatia, Socorrismo, Saúde Ocupacional e Técnico de Fisioterapia, ofereço uma abordagem personalizada e abrangente adaptada às necessidades de cada pessoa.
              </p>
              <p>
                Acredito no poder das terapias não convencionais para tratar, prevenir lesões e promover uma vida mais saudável e autónoma.
              </p>
              <p>
                Cada sessão decorre num ambiente acolhedor e seguro, utilizando técnicas avançadas como trigger points, para proporcionar uma experiência única de recuperação e transformação.
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
