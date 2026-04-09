import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle, ArrowLeft, Clock, Search, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type Treatment = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
};

type Therapist = {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
};

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

const therapists: Therapist[] = [
  { id: "dr-silva", name: "Dr. Ricardo Silva", specialty: "Terapia Manual & Hérnias", avatar: "RS" },
  { id: "dra-costa", name: "Dra. Ana Costa", specialty: "Dor Crónica & Postural", avatar: "AC" },
  { id: "dr-santos", name: "Dr. Miguel Santos", specialty: "Terapia Desportiva", avatar: "MS" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

const BookingSection = () => {
  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Contact fields
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telemovel, setTelemovel] = useState("");

  const fetchBookedSlots = async (date: Date, therapistName: string) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data } = await supabase
      .from("appointments")
      .select("data_hora")
      .eq("terapeuta", therapistName)
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

  const handleSelectTherapist = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setStep(3);
  };

  const handleConfirm = async () => {
    if (!selectedTreatment || !selectedTherapist || !selectedDate || !selectedTime) return;
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
      terapeuta: selectedTherapist.name,
      data_hora: dataHora.toISOString(),
      preco: selectedTreatment.price,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Erro ao guardar o agendamento. Tente novamente.");
      console.error(error);
      return;
    }

    setSubmitted(true);
    toast.success("Agendamento confirmado com sucesso!");
  };

  const handleBack = () => {
    if (step === 2) {
      setSelectedTherapist(null);
      setStep(1);
    } else if (step === 3) {
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setStep(2);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedTreatment(null);
    setSelectedTherapist(null);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSubmitted(false);
    setSearchQuery("");
    setNome("");
    setEmail("");
    setTelemovel("");
  };

  const contactFieldsFilled = nome.trim() && email.trim() && telemovel.trim();

  if (submitted) {
    return (
      <section id="agendar" className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="text-primary" size={32} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Agendamento confirmado!</h2>
          <div className="bg-card border border-border rounded-xl p-6 text-left mb-8 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Nome</span>
              <span className="text-sm font-medium">{nome}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Tratamento</span>
              <span className="text-sm font-medium">{selectedTreatment?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Terapeuta</span>
              <span className="text-sm font-medium">{selectedTherapist?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Data</span>
              <span className="text-sm font-medium">{selectedDate && format(selectedDate, "PPP", { locale: pt })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">Hora</span>
              <span className="text-sm font-medium">{selectedTime}</span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between">
              <span className="text-muted-foreground text-sm">Preço</span>
              <span className="text-sm font-bold text-primary">{selectedTreatment?.price} €</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mb-6">
            Entraremos em contacto consigo para confirmar os detalhes.
          </p>
          <Button onClick={handleReset} variant="outline">Agendar outro tratamento</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="agendar" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">Marque já</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Agende o seu tratamento</h2>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
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
              {s < 3 && (
                <div className={cn("w-12 h-0.5 transition-all", step > s ? "bg-primary" : "bg-secondary")} />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div className="flex justify-center gap-8 mb-8 text-xs text-muted-foreground">
          <span className={cn(step === 1 && "text-primary font-medium")}>Tratamento</span>
          <span className={cn(step === 2 && "text-primary font-medium")}>Terapeuta</span>
          <span className={cn(step === 3 && "text-primary font-medium")}>Data & Hora</span>
        </div>

        {/* Back button */}
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        )}

        {/* Step 1: Treatment */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Pesquisar tratamento..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid gap-3">
              {filteredTreatments.map((treatment) => (
                <button
                  key={treatment.id}
                  onClick={() => handleSelectTreatment(treatment)}
                  className="w-full text-left bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:bg-card/80 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {treatment.name}
                        </h3>
                        <span className="text-primary font-bold text-sm whitespace-nowrap">{treatment.price} €</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{treatment.description}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {treatment.duration}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
              {filteredTreatments.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Nenhum tratamento encontrado.</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Therapist */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-2">
              Selecione o terapeuta para <span className="text-foreground font-medium">{selectedTreatment?.name}</span>
            </p>
            <div className="grid gap-3">
              {therapists.map((therapist) => (
                <button
                  key={therapist.id}
                  onClick={() => handleSelectTherapist(therapist)}
                  className="w-full text-left bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:bg-card/80 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {therapist.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {therapist.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Date, Time & Contact */}
        {step === 3 && (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">{selectedTreatment?.name}</span> com{" "}
              <span className="text-foreground font-medium">{selectedTherapist?.name}</span>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Calendar */}
              <div className="bg-card border border-border rounded-xl p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => { setSelectedDate(d); setSelectedTime(undefined); if (d && selectedTherapist) fetchBookedSlots(d, selectedTherapist.name); }}
                  disabled={(d) => d < new Date() || d.getDay() === 0}
                  locale={pt}
                  className="p-0 pointer-events-auto"
                />
              </div>

              {/* Time slots */}
              <div>
                <p className="text-sm font-medium mb-3">
                  {selectedDate
                    ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: pt })
                    : "Selecione uma data"}
                </p>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "py-2.5 px-3 rounded-lg text-sm font-medium border transition-all",
                          selectedTime === time
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card border-border text-foreground hover:border-primary/50"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 text-muted-foreground text-sm">
                    Selecione uma data no calendário
                  </div>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <p className="text-sm font-medium">Dados de contacto</p>
              <div className="grid md:grid-cols-3 gap-3">
                <Input
                  placeholder="Nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="tel"
                  placeholder="Telemóvel"
                  value={telemovel}
                  onChange={(e) => setTelemovel(e.target.value)}
                />
              </div>
            </div>

            {/* Confirm */}
            <Button
              size="lg"
              className="w-full text-base"
              disabled={!selectedDate || !selectedTime || !contactFieldsFilled || isSubmitting}
              onClick={handleConfirm}
            >
              {isSubmitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> A guardar...</>
              ) : (
                <>Confirmar Agendamento — {selectedTreatment?.price} €</>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Ao confirmar, concorda com a nossa política de privacidade.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookingSection;
