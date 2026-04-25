import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle, ArrowLeft, Clock, Search, Loader2, Copy } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

type Treatment = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
};

const THERAPIST_NAME = "Dr. Nuno Therapist";

const treatments: Treatment[] = [
  { id: "hernia", name: "Recuperação de Hérnia Discal", price: 65, duration: "60 min", description: "Tratamento especializado para hérnias discais com técnicas manuais avançadas" },
  { id: "ciatica", name: "Tratamento de Ciática", price: 60, duration: "50 min", description: "Alívio da dor ciática com abordagem integrativa e personalizada" },
  { id: "cervical", name: "Dor Cervical e Tensão", price: 55, duration: "45 min", description: "Resolução de tensões cervicais e cefaleias de origem muscular" },
  { id: "postural", name: "Correção Postural", price: 50, duration: "45 min", description: "Avaliação e correção de desequilíbrios posturais crónicos" },
  { id: "desportiva", name: "Terapia Desportiva", price: 70, duration: "60 min", description: "Recuperação de lesões desportivas e otimização de desempenho" },
  { id: "relaxamento", name: "Relaxamento Profundo", price: 45, duration: "50 min", description: "Sessão de relaxamento terapêutico para alívio de stress e ansiedade" },
  { id: "atm", name: "Disfunção da ATM", price: 60, duration: "45 min", description: "Tratamento da articulação temporomandibular e bruxismo" },
  { id: "fascial", name: "Libertação Miofascial", price: 55, duration: "50 min", description: "Técnicas de libertação de tecido fascial para maior mobilidade" },
];

const timeSlots = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${String(hours).padStart(2, "0")}:${minutes}`;
});

const isUrgencyTime = (time?: string) => {
  if (!time) return false;
  const [hours, minutes] = time.split(":").map(Number);
  const timeInMinutes = hours * 60 + minutes;
  
  const urgencyStart = 21 * 60 + 30; // 21:30
  const urgencyEnd = 8 * 60; // 08:00
  
  // Handles crossing midnight
  return timeInMinutes >= urgencyStart || timeInMinutes <= urgencyEnd;
};

const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [paymentReference] = useState("524 732 496");

  const fetchBookedSlots = async (date: Date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data } = await supabase
      .from("appointments")
      .select("data_hora")
      .eq("terapeuta", THERAPIST_NAME)
      .gte("data_hora", startOfDay.toISOString())
      .lte("data_hora", endOfDay.toISOString());

    if (data) {
      setBookedSlots(data.map((a) => {
        const d = new Date(a.data_hora);
        return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
      }));
    } else {
      setBookedSlots([]);
    }
  };

  const filteredTreatments = treatments.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTreatment = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setStep(2);
  };

  const handleConfirm = async () => {
    if (!selectedTreatment || !selectedDate || !selectedTime) return;
    if (!acceptedTerms) {
      toast.error("Por favor aceite a Política de Privacidade e os Termos de Uso.");
      return;
    }
    if (!nome.trim() || !email.trim() || !telemovel.trim()) {
      toast.error("Por favor preencha todos os dados de contacto.");
      return;
    }

    setIsSubmitting(true);

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const dataHora = new Date(selectedDate);
    dataHora.setHours(hours, minutes, 0, 0);

    const { error } = await supabase.from("appointments").insert({
      nome: nome.trim(),
      email: email.trim(),
      telemovel: telemovel.trim(),
      servico: selectedTreatment.name,
      terapeuta: THERAPIST_NAME,
      data_hora: dataHora.toISOString(),
      preco: selectedTreatment.price,
      status: "pending",
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Erro ao guardar o agendamento. Tente novamente.");
      console.error(error);
      return;
    }

    supabase.functions.invoke("make-webhook", {
      body: {
        nome: nome.trim(),
        email: email.trim(),
        telemovel: telemovel.trim(),
        servico: selectedTreatment.name,
        terapeuta: THERAPIST_NAME,
        data_hora: dataHora.toISOString(),
        preco: selectedTreatment.price,
      },
    }).catch((err) => console.error("Webhook error:", err));

    setSubmitted(true);
    toast.success("Agendamento confirmado com sucesso!");
  };

  const handleBack = () => {
    if (step === 2) {
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setStep(1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedTreatment(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSubmitted(false);
    setSearchQuery("");
    setNome("");
    setEmail("");
    setTelemovel("");
    setAcceptedTerms(false);
  };

  const contactFieldsFilled = nome.trim() && email.trim() && telemovel.trim();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ''));
    toast.success(`${label} copiado!`);
  };

  if (submitted) {
    return (
      <section id="agendar" className="py-12 md:py-24 px-6 bg-muted/30">
        <div className="max-w-lg mx-auto text-center animate-fade-in">
          <img src={logo} alt="Unconventional Therapist" className="h-16 w-auto object-contain mx-auto mb-8" />
          
          <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="text-primary" size={40} />
          </div>
          
          <h2 className="text-3xl font-bold tracking-tight mb-2">Agendamento confirmado!</h2>
          <p className="text-muted-foreground mb-8">O seu pedido foi recebido. Finalize o pagamento para validar.</p>
          
          {/* Summary */}
          <div className="bg-card border border-border rounded-2xl p-6 text-left mb-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 border-b border-border pb-2">Resumo da Marcação</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Nome</span>
                <span className="text-sm font-semibold">{nome}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Tratamento</span>
                <span className="text-sm font-semibold">{selectedTreatment?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Terapeuta</span>
                <span className="text-sm font-semibold">{THERAPIST_NAME}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Data</span>
                <span className="text-sm font-semibold">{selectedDate && format(selectedDate, "PPP", { locale: pt })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Hora</span>
                <span className="text-sm font-semibold">{selectedTime}</span>
              </div>
              <div className="pt-3 flex justify-between items-center border-t border-border">
                <span className="font-bold text-sm">Valor Total</span>
                <span className="text-lg font-black text-primary">{selectedTreatment?.price} €</span>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-left mb-8 shadow-sm">
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Efetue o Pagamento para Validar
            </h3>
            
            <div className="space-y-6">
              {/* Multibanco */}
              <div className="p-4 bg-[#1A1A1A] rounded-xl border border-[#B4D600]/30 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#005ca9] rounded-lg flex items-center justify-center text-white font-black text-[8px] leading-tight text-center shrink-0">
                    MULTI<br/>BANCO
                  </div>
                  <p className="text-sm font-bold uppercase text-white">Entidade e Referência</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <span className="text-xs text-white font-medium uppercase">Entidade</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#B4D600]">21 312</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-[#B4D600] hover:bg-[#B4D600]/10" onClick={() => copyToClipboard("21312", "Entidade")}>
                        <Copy size={12} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-white/5 rounded-lg transition-colors border-y border-white/10 py-3">
                    <span className="text-xs text-white font-medium uppercase">Referência</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#B4D600]">{paymentReference}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-[#B4D600] hover:bg-[#B4D600]/10" onClick={() => copyToClipboard(paymentReference, "Referência")}>
                        <Copy size={12} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-xs text-white font-medium uppercase">Valor</span>
                    <span className="font-mono font-extrabold text-[#B4D600] text-base">{selectedTreatment?.price} €</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <p className="text-[11px] font-bold text-white italic text-center">
                    Após boa cobrança não existem devoluções!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center bg-primary/5 py-3 px-4 rounded-lg border border-primary/10">
              <p className="text-[11px] text-muted-foreground italic">
                O agendamento será validado após a receção do comprovativo.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`https://wa.me/351936342632?text=${encodeURIComponent(
                `Olá Dr. Nuno, o meu nome é ${nome}. Acabei de agendar o serviço ${selectedTreatment?.name} para o dia ${selectedDate ? format(selectedDate, "d 'de' MMMM", { locale: pt }) : ""} às ${selectedTime}. Segue em anexo o meu comprovativo de pagamento. Obrigado!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button size="lg" className="w-full text-base bg-[#25D366] hover:bg-[#1da851] text-white py-6 shadow-md hover:shadow-lg transition-all h-auto">
                <div className="flex flex-col">
                  <span>Enviar Comprovativo via WhatsApp</span>
                  <span className="text-[10px] opacity-80 font-normal">Clique para anexar o seu comprovativo</span>
                </div>
              </Button>
            </a>
            
            <Button onClick={handleReset} variant="outline" className="w-full h-12 text-muted-foreground hover:text-foreground">
              Agendar outro tratamento
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agendar" className="py-12 md:py-24 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-primary text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-3">Marque já</p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Agende o seu tratamento</h2>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {s}
              </div>
              {s < 2 && (
                <div className={cn("w-12 h-0.5 transition-all", step > s ? "bg-primary" : "bg-secondary")} />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="flex justify-center gap-8 mb-8 text-xs text-muted-foreground">
          <span className={cn(step === 1 && "text-primary font-medium")}>Tratamento</span>
          <span className={cn(step === 2 && "text-primary font-medium")}>Data & Hora</span>
        </div>

        {/* Back button */}
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 min-h-[44px]"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        )}

        {/* Step 1: Treatment */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Pesquisar tratamento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 md:h-14 text-base"
              />
            </div>
            <div className="grid gap-3">
              {filteredTreatments.map((treatment) => (
                <button
                  key={treatment.id}
                  onClick={() => handleSelectTreatment(treatment)}
                  className="w-full text-left bg-card border border-border rounded-xl p-5 md:p-6 hover:border-primary/50 hover:bg-card/80 transition-all group min-h-[80px]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base md:text-lg">
                          {treatment.name}
                        </h3>
                        <span className="text-primary font-bold text-sm md:text-base whitespace-nowrap">{treatment.price} €</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{treatment.description}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {treatment.duration}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {filteredTreatments.length === 0 && (
                <p className="text-center text-muted-foreground py-12">Nenhum tratamento encontrado.</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Date, Time & Contact */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg">
              Selecionado: <span className="text-foreground font-semibold">{selectedTreatment?.name}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-xl p-4 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => { 
                    setSelectedDate(d); 
                    setSelectedTime(undefined); 
                    if (d) fetchBookedSlots(d); 
                  }}
                  disabled={(d) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return d < today;
                  }}
                  locale={pt}
                  className="p-0 pointer-events-auto"
                />
              </div>

              <div>
                <p className="text-sm font-bold mb-4">
                  {selectedDate
                    ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: pt })
                    : "Selecione uma data"}
                </p>
                {selectedDate ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Madrugada", "Manhã", "Tarde", "Noite"].map((period) => (
                        <Button
                          key={period}
                          variant="outline"
                          size="sm"
                          className={cn(
                            "rounded-full px-4",
                            (period === "Madrugada" && parseInt(selectedTime?.split(":")[0] || "0") < 8) ||
                            (period === "Manhã" && parseInt(selectedTime?.split(":")[0] || "0") >= 8 && parseInt(selectedTime?.split(":")[0] || "0") < 13) ||
                            (period === "Tarde" && parseInt(selectedTime?.split(":")[0] || "0") >= 13 && parseInt(selectedTime?.split(":")[0] || "0") < 19) ||
                            (period === "Noite" && parseInt(selectedTime?.split(":")[0] || "0") >= 19)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "hover:bg-primary/10"
                          )}
                          onClick={() => {
                            const firstInPeriod = timeSlots.find(time => {
                              const h = parseInt(time.split(":")[0]);
                              if (period === "Madrugada") return h < 8;
                              if (period === "Manhã") return h >= 8 && h < 13;
                              if (period === "Tarde") return h >= 13 && h < 19;
                              if (period === "Noite") return h >= 19;
                              return false;
                            });
                            if (firstInPeriod) setSelectedTime(firstInPeriod);
                          }}
                        >
                          {period}
                        </Button>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-primary/20">
                      {timeSlots.map((time) => {
                        const isBooked = bookedSlots.includes(time);
                        
                        return (
                          <button
                            key={time}
                            onClick={() => !isBooked && setSelectedTime(time)}
                            disabled={isBooked}
                            className={cn(
                              "h-14 rounded-lg text-sm font-bold border transition-all flex flex-col items-center justify-center relative",
                              isBooked
                                ? "bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed line-through"
                                : selectedTime === time
                                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                  : isUrgencyTime(time)
                                    ? "bg-amber-500/5 border-amber-500/30 text-foreground hover:border-amber-500/60"
                                    : "bg-card border-border text-foreground hover:border-primary/50 active:scale-95"
                            )}
                          >
                            <span>{time}</span>
                            {isUrgencyTime(time) && (
                              <span className="text-[9px] font-medium text-amber-600 mt-0.5 animate-pulse">(Urgência)</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl bg-muted/20">
                    Selecione uma data no calendário
                  </div>
                )}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <p className="text-base font-bold">Os seus dados</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nome</label>
                  <Input placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Telemóvel</label>
                  <Input type="tel" placeholder="Telemóvel" value={telemovel} onChange={(e) => setTelemovel(e.target.value)} className="h-12" />
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 bg-muted/20 rounded-xl border border-border">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms} 
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                className="mt-1"
              />
              <Label 
                htmlFor="terms" 
                className="text-xs md:text-sm text-muted-foreground leading-relaxed cursor-pointer"
              >
                Li e aceito a <a href="/politica-privacidade" target="_blank" className="text-primary hover:underline">Política de Privacidade</a> e os <a href="/termos-uso" target="_blank" className="text-primary hover:underline">Termos de Uso</a>
              </Label>
            </div>

            <Button
              size="lg"
              className="w-full h-14 md:h-16 text-lg font-bold rounded-xl shadow-xl shadow-primary/20"
              disabled={!selectedDate || !selectedTime || !contactFieldsFilled || !acceptedTerms || isSubmitting}
              onClick={handleConfirm}
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> A guardar...</>
              ) : (
                <>Confirmar Agendamento — {selectedTreatment?.price} €</>
              )}
            </Button>

            <p className="text-[10px] md:text-xs text-muted-foreground text-center px-4 leading-relaxed">
              Ao confirmar o agendamento, declara que aceita os nossos termos de serviço e política de privacidade.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
