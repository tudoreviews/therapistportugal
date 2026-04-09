import { Brain, Heart, Leaf, Sparkles, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Brain,
    title: "Terapia Cognitivo-Comportamental",
    description: "Reestruture padrões de pensamento e desenvolva estratégias eficazes para o dia-a-dia.",
    duration: "60 min",
  },
  {
    icon: Heart,
    title: "Terapia Emocional Integrativa",
    description: "Explore e processe emoções profundas num ambiente seguro e acolhedor.",
    duration: "75 min",
  },
  {
    icon: Leaf,
    title: "Mindfulness & Meditação",
    description: "Técnicas de atenção plena para reduzir o stress e aumentar a clareza mental.",
    duration: "45 min",
  },
  {
    icon: Sparkles,
    title: "Hipnoterapia Clínica",
    description: "Aceda ao subconsciente para transformar hábitos e superar bloqueios.",
    duration: "90 min",
  },
  {
    icon: Shield,
    title: "Gestão de Ansiedade",
    description: "Ferramentas práticas e personalizadas para controlar a ansiedade no quotidiano.",
    duration: "60 min",
  },
  {
    icon: Users,
    title: "Terapia de Casal",
    description: "Fortaleça a comunicação e reconecte-se com o seu parceiro(a).",
    duration: "90 min",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">O que oferecemos</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Os nossos serviços</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="bg-card border-border hover:border-primary/30 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                <span className="text-xs text-primary font-medium">{service.duration}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
