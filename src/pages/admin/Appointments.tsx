import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Appointments = () => {
  const queryClient = useQueryClient();
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("data_hora", { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from("appointments")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      toast.success("Estado atualizado!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar: " + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      toast.success("Agendamento apagado!");
    },
    onError: (error) => {
      toast.error("Erro ao apagar: " + error.message);
    }
  });

  const filteredAppointments = appointments?.filter(app => {
    const matchesName = app.nome.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesDate = dateFilter ? app.data_hora.startsWith(dateFilter) : true;
    return matchesName && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado": return "text-primary";
      case "Pendente": return "text-orange-500";
      case "Concluído": return "text-blue-500";
      case "Cancelado": return "text-destructive";
      default: return "";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Agendamentos</h1>
            <p className="text-muted-foreground">Gerir todas as marcações da clínica.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-card p-4 rounded-xl border border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Filtrar por nome..." 
              className="pl-10"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              type="date" 
              className="pl-10"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <Button variant="secondary" onClick={() => { setNameFilter(""); setDateFilter(""); }}>
            Limpar Filtros
          </Button>
        </div>

        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data / Hora</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">Carregando...</TableCell>
                </TableRow>
              ) : filteredAppointments?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Nenhum agendamento encontrado.</TableCell>
                </TableRow>
              ) : (
                filteredAppointments?.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">
                      {format(new Date(app.data_hora), "dd 'de' MMMM, HH:mm", { locale: pt })}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{app.nome}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{app.servico}</TableCell>
                    <TableCell>
                      <Select 
                        defaultValue={app.status || "Pendente"} 
                        onValueChange={(value) => updateStatusMutation.mutate({ id: app.id, status: value })}
                      >
                        <SelectTrigger className={cn("w-[140px] h-9 border-none bg-secondary/50", getStatusColor(app.status || "Pendente"))}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Confirmado">Confirmado</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                          <SelectItem value="Cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          if (confirm("Tem a certeza que deseja apagar este agendamento?")) {
                            deleteMutation.mutate(app.id);
                          }
                        }}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Appointments;
