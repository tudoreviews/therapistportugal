import { Users, Briefcase, Stethoscope, Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Users,
    title: "Parcerias Corporativas",
    description: "Empresas convencionadas e não convencionadas. Oferecemos serviços especializados adaptados à sua empresa.",
    price: "Sob consulta",
    tag: "Soluções para Empresas"
  },
  {
    icon: Briefcase,
    title: "Intervenção In-Company",
    description: "Levamos até si intervenção clínica especializada para reduzir a dor e prevenir lesões no local de trabalho.",
    price: "Sob consulta",
    tag: "Intra Empresas"
  },
  {
    icon: Stethoscope,
    title: "Consulta Geral",
    description: "Atendimento especializado em gabinete ou no conforto do seu domicílio.",
    details: "Gabinete: 65€ | Domicílio: 75€",
    tag: "Atendimento ao Público"
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
    <section id="servicos" className="py-24 px-6 bg-background text-foreground relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-20">
          <p className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4">Os Nossos Serviços</p>
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-[1.1]">
                Soluções Estratégicas <br />
                <span className="text-primary/80">para o Bem-Estar</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Desenvolvo programas estratégicos de prevenção que ajudam organizações a reduzir custos indiretos associados a baixas médicas, melhorar o desempenho das equipas e aumentar o engagement interno. Através de intervenções práticas no local de trabalho — avaliação ergonómica, sessões preventivas, acompanhamento direcionado — é possível reduzir significativamente queixas de dor e otimizar o rendimento dos colaboradores.
              </p>
            </div>
            <div className="bg-card/40 backdrop-blur-sm border border-border/60 p-10 rounded-3xl shadow-2xl shadow-black/20">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <span className="w-8 h-1 bg-primary rounded-full" />
                Benefícios para a sua Organização
              </h3>
              <ul className="grid sm:grid-cols-1 gap-5">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-lime-500/10 flex items-center justify-center group-hover:bg-lime-500/20 transition-colors">
                      <Check className="text-lime-500" size={18} strokeWidth={3} />
                    </div>
                    <span className="text-foreground/90 font-semibold text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service) => (
            <Card key={service.title} className="bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/40 hover:translate-y-[-8px] transition-all duration-500 group relative overflow-hidden flex flex-col h-full rounded-3xl">
              <CardContent className="p-10 flex flex-col h-full">
                <div className="mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                    {service.tag}
                  </span>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow text-lg italic opacity-80">{service.description}</p>
                <div className="pt-8 border-t border-border/60">
                  {'price' in service ? (
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-bold opacity-60">Investimento</span>
                      <span className="text-2xl font-black text-primary tracking-tight">{service.price}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-bold opacity-60">Valores</span>
                      <span className="text-base font-bold text-primary leading-tight">{service.details}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-gradient-to-br from-primary/10 via-background to-background rounded-[3rem] p-10 md:p-20 border border-primary/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h3 className="text-3xl md:text-4xl font-bold mb-10 max-w-4xl mx-auto leading-tight">
            Gostaria de agendar uma breve reunião para apresentar uma proposta adaptada à vossa realidade e objetivos estratégicos.
          </h3>
          <Button size="lg" className="rounded-full text-xl px-12 h-16 shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 font-bold" asChild>
            <a href="#agendar">
              Agendar Reunião de Diagnóstico
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;