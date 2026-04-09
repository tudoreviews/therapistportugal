import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BookingSection = () => {
  const [date, setDate] = useState<Date>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Pedido de agendamento enviado com sucesso!");
  };

  if (submitted) {
    return (
      <section id="agendar" className="py-24 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="text-primary" size={32} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Pedido enviado!</h2>
          <p className="text-muted-foreground mb-8">
            Entraremos em contacto consigo em breve para confirmar a sua consulta.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">Agendar outra consulta</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="agendar" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-3">Marque já</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Agende a sua consulta</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" placeholder="O seu nome" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="email@exemplo.pt" required />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="tel" placeholder="+351 900 000 000" required />
            </div>
            <div className="space-y-2">
              <Label>Serviço pretendido</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tcc">Terapia Cognitivo-Comportamental</SelectItem>
                  <SelectItem value="emocional">Terapia Emocional Integrativa</SelectItem>
                  <SelectItem value="mindfulness">Mindfulness & Meditação</SelectItem>
                  <SelectItem value="hipnoterapia">Hipnoterapia Clínica</SelectItem>
                  <SelectItem value="ansiedade">Gestão de Ansiedade</SelectItem>
                  <SelectItem value="casal">Terapia de Casal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Data preferida</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: pt }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date() || d.getDay() === 0}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Textarea id="notes" placeholder="Conte-nos brevemente o motivo da consulta..." rows={4} />
          </div>

          <Button type="submit" size="lg" className="w-full text-base">
            Enviar Pedido de Agendamento
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Ao submeter este formulário, concorda com a nossa política de privacidade.
          </p>
        </form>
      </div>
    </section>
  );
};

export default BookingSection;
