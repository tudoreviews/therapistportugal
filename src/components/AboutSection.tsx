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
    <section id="sobre" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" ref={sectionRef}>
      <div
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] sm:aspect-[3/4] rounded-2xl md:rounded-[2rem] bg-card border border-border overflow-hidden shadow-2xl">
              <img
                src={drNunoImg}
                alt="Dr. Nuno Santos - Unconventional Therapist"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-2xl -z-10 blur-2xl" />
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <p className="text-primary text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Sobre nós
            </p>
            <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight mb-6 leading-tight">
              O Especialista: Nuno Santos
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10 text-base md:text-lg">
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

            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block sm:inline-block">
              <Button
                variant="outline"
                size="default"
                className="w-full sm:w-auto gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary h-11 px-8 text-base font-semibold rounded-xl"
              >
                <MessageCircle size={20} />
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
