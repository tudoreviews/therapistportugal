import { Card, CardContent } from "@/components/ui/card";
import caso1Antes from "@/assets/caso1-antes.jpeg";
import caso1Depois from "@/assets/caso1-depois.jpeg";
import caso2Antes from "@/assets/caso2-antes.jpeg";
import caso2Depois from "@/assets/caso2-depois.jpeg";
import caso3Antes from "@/assets/caso3-antes.jpeg";
import caso3Depois from "@/assets/caso3-depois.jpeg";

const cases = [
  {
    title: "Caso 1",
    subtitle: "Recuperação plantar e alívio de tensão nos pés",
    description:
      "Tratamento focado em trigger points na fáscia plantar e cadeia posterior dos membros inferiores. Após as sessões, observou-se relaxamento muscular evidente, melhoria da circulação e redução significativa das dores ao caminhar.",
    before: caso1Antes,
    after: caso1Depois,
  },
  {
    title: "Caso 2",
    subtitle: "Libertação cervical e tensão dos trapézios",
    description:
      "Aplicação de técnicas manuais e trigger points na região cervical e trapézio superior. Resultado: descontração muscular visível, alinhamento postural mais natural e diminuição da rigidez na zona do pescoço e ombros.",
    before: caso2Antes,
    after: caso2Depois,
  },
  {
    title: "Caso 3",
    subtitle: "Bem-estar facial e relaxamento profundo",
    description:
      "Sessão de osteopatia e descontração neuromuscular focada no rosto e zona ocular. O paciente apresentou redução notória da tensão facial, alívio dos sintomas de irritação ocular e uma sensação geral de calma e equilíbrio.",
    before: caso3Antes,
    after: caso3Depois,
  },
];

const ResultsSection = () => {
  return (
    <section id="resultados" className="py-12 md:py-24 px-6 md:px-8 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-3">
            Resultados Reais
          </p>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight mb-4">
            Antes & Depois
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Casos clínicos reais que demonstram a eficácia das terapias não convencionais
            aplicadas pelo Dr. Nuno Santos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cases.map((c) => (
            <Card
              key={c.title}
              className="bg-card border-border/60 overflow-hidden hover:border-primary/40 transition-colors duration-300 rounded-2xl md:rounded-3xl"
            >
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-1 p-1">
                {/* Antes */}
                <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none">
                  <img
                    src={c.before}
                    alt={`${c.title} - Antes do tratamento`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-secondary/90 text-secondary-foreground text-[10px] font-semibold tracking-[0.2em] px-2.5 py-1 rounded backdrop-blur-sm">
                    ANTES
                  </span>
                </div>
                {/* Depois */}
                <div className="relative aspect-[4/3] sm:aspect-[3/4] overflow-hidden rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none">
                  <img
                    src={c.after}
                    alt={`${c.title} - Depois do tratamento`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold tracking-[0.2em] px-2.5 py-1 rounded shadow-lg">
                    DEPOIS
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-1">{c.title}</h3>
                <p className="text-primary text-xs md:text-sm font-medium mb-3">{c.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {c.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
