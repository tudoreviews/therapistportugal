import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana M.",
    text: "A abordagem da Unconventional Therapist mudou completamente a minha perspetiva. Sinto-me mais leve e confiante do que nunca.",
    rating: 5,
  },
  {
    name: "Pedro S.",
    text: "Depois de anos a tentar diferentes terapias, finalmente encontrei algo que realmente funciona. Recomendo vivamente.",
    rating: 5,
  },
  {
    name: "Mariana L.",
    text: "Profissionalismo, empatia e resultados. As sessões de mindfulness transformaram a minha rotina diária.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testemunhos" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-3">Testemunhos</p>
          <h2 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold tracking-tight">O que dizem os nossos pacientes</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-card border-border hover:border-primary/30 transition-colors duration-300 rounded-2xl">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="text-primary fill-primary" size={18} />
                  ))}
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 italic flex-grow">"{t.text}"</p>
                <p className="text-sm font-bold tracking-wide uppercase text-foreground/80">{t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
