import { CheckCircle } from "lucide-react";

const highlights = [
  "Mais de 10 anos de experiência clínica",
  "Abordagem personalizada e centrada no paciente",
  "Técnicas inovadoras baseadas em evidência",
  "Ambiente confidencial e acolhedor",
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">Sobre nós</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Terapia fora da caixa, resultados reais
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Na Unconventional Therapist, acreditamos que cada pessoa é única e merece uma abordagem terapêutica à sua medida. Combinamos métodos tradicionais com técnicas inovadoras para oferecer resultados transformadores e duradouros.
            </p>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-primary shrink-0" size={18} />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-card border border-border overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-primary text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>UT</span>
                </div>
                <p className="text-muted-foreground text-sm italic">"O caminho para a cura começa com a coragem de ser diferente."</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/5 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
