import { Users, Briefcase, Stethoscope, Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Users,
    title: "Parcerias Corporativas",
    description: "Empresas convencionadas e não convencionadas. Oferecemos serviços especializados adaptados à sua empresa.",
    price: "Sob consulta",
  },
  {
    icon: Briefcase,
    title: "Intervenção In-Company",
    description: "Levamos até si intervenção clínica especializada para reduzir a dor e prevenir lesões no local de trabalho.",
    price: "Sob consulta",
  },
  {
    icon: Stethoscope,
    title: "Consulta Geral",
    description: "Atendimento especializado em gabinete ou no conforto do seu domicílio.",
    details: "Gabinete: 65€ | Domicílio: 75€",
  },
];

const benefits = [
  "Menos dias de baixa",
  "Maior produtividade",
  "Redução de custos com substituições",
  "Melhoria do clima organizacional",
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 px-6 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">Os Nossos Serviços</p>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Soluções Estratégicas para o Bem-Estar</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Desenvolvo programas estratégicos de prevenção que ajudam organizações a reduzir custos indiretos associados a baixas médicas, melhorar o desempenho das equipas e aumentar o engagement interno. Através de intervenções práticas no local de trabalho — avaliação ergonómica, sessões preventivas, acompanhamento direcionado — é possível reduzir significativamente queixas de dor e otimizar o rendimento dos colaboradores.
              </p>
            </div>
            <div className="bg-card/50 border border-border p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6">Benefícios para a sua Organização</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-lime-500/20 flex items-center justify-center">
                      <Check className="text-lime-500" size={16} />
                    </div>
                    <span className="text-foreground/90 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <Card key={service.title} className="bg-card border-border hover:border-primary/40 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
              <CardContent className="p-8 flex flex-col h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300">
                  <service.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{service.description}</p>
                <div className="pt-6 border-t border-border">
                  {'price' in service ? (
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1 font-medium">Investimento</span>
                      <span className="text-lg font-bold text-primary">{service.price}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider mb-1 font-medium">Valores</span>
                      <span className="text-sm font-semibold text-primary">{service.details}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-primary/5 rounded-3xl p-10 md:p-16 border border-primary/10">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 max-w-3xl mx-auto">
            Gostaria de agendar uma breve reunião para apresentar uma proposta adaptada à vossa realidade e objetivos estratégicos.
          </h3>
          <Button size="lg" className="rounded-full text-lg px-8 h-14 hover:scale-105 transition-transform" asChild>
            <a href="#contacto">
              Agendar Reunião de Diagnóstico
              <ArrowRight className="ml-2" size={20} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;