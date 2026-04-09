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
    <section id="testemunhos" className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">Testemunhos</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">O que dizem os nossos pacientes</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="text-primary fill-primary" size={16} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">"{t.text}"</p>
                <p className="text-sm font-semibold">{t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
