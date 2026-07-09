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
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, Trash2, Download, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Appointment = {
  id: string;
  nome: string;
  email: string;
  telemovel: string;
  servico: string;
  terapeuta: string;
  data_hora: string;
  preco: number | null;
  status: string;
  created_at: string;
};

const Appointments = () => {
  const queryClient = useQueryClient();
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("data_hora", { ascending: false });
      if (error) throw error;
      return data as Appointment[];
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      toast.success("Estado atualizado!");
    },
    onError: (error: any) => {
      if (error.code === "42501" || error.status === 403 || error.message?.includes("permission")) {
        toast.error("Erro: Sem permissão para atualizar dados. Verifica as políticas RLS.");
      } else {
        toast.error("Erro ao atualizar: " + error.message);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData(["admin-appointments"], (oldData: Appointment[] | undefined) =>
        oldData?.filter((app) => app.id !== deletedId)
      );
      toast.success("Sessão eliminada com sucesso");
    },
    onError: (error: any) => {
      if (error.code === "42501" || error.status === 403 || error.message?.includes("permission")) {
        toast.error("Erro: Sem permissão para apagar dados. Verifica as políticas RLS.");
      } else {
        toast.error("Erro ao apagar: " + error.message);
      }
    },
  });

  const filteredAppointments = appointments?.filter((app) => {
    const matchesName = app.nome.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesDate = dateFilter ? app.data_hora.startsWith(dateFilter) : true;
    return matchesName && matchesDate;
  });

  // Agrupamento por paciente (email como chave principal, fallback para telemovel)
  const grouped = (filteredAppointments || []).reduce((acc, app) => {
    const key = (app.email || app.telemovel || app.nome).toLowerCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(app);
    return acc;
  }, {} as Record<string, Appointment[]>);

  const groups = Object.entries(grouped).map(([key, sessions]) => {
    const sorted = [...sessions].sort(
      (a, b) => new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime()
    );
    // Estado geral: se todas iguais → esse; senão "Misto"
    const statuses = Array.from(new Set(sorted.map((s) => s.status || "Pendente")));
    const overallStatus = statuses.length === 1 ? statuses[0] : "Misto";
    const servicos = Array.from(new Set(sorted.map((s) => s.servico)));
    return {
      key,
      nome: sorted[0].nome,
      email: sorted[0].email,
      telemovel: sorted[0].telemovel,
      servico: servicos.join(", "),
      count: sorted.length,
      overallStatus,
      sessions: sorted,
    };
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "text-primary";
      case "Pendente":
        return "text-orange-500";
      case "Concluído":
        return "text-blue-500";
      case "Cancelado":
        return "text-destructive";
      case "Misto":
        return "text-yellow-500";
      default:
        return "";
    }
  };

  const exportToCSV = () => {
    if (!filteredAppointments || filteredAppointments.length === 0) {
      toast.error("Não há dados para exportar");
      return;
    }
    const headers = ["Data/Hora", "Nome", "Email", "Telemóvel", "Serviço", "Terapeuta", "Estado"];
    const csvContent = [
      headers.join(","),
      ...filteredAppointments.map((app) =>
        [
          `"${format(new Date(app.data_hora), "dd/MM/yyyy HH:mm")}"`,
          `"${app.nome}"`,
          `"${app.email}"`,
          `"${app.telemovel || ""}"`,
          `"${app.servico}"`,
          `"${app.terapeuta || ""}"`,
          `"${app.status || "Pendente"}"`,
        ].join(",")
      ),
    ].join("\n");
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `agendamentos_${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exportado com sucesso!");
  };

  const toggle = (key: string) => setExpanded((e) => ({ ...e, [key]: !e[key] }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Agendamentos</h1>
            <p className="text-muted-foreground">
              Pacientes agrupados. Clica numa linha para ver as sessões.
            </p>
          </div>
          <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
            <Download size={18} />
            Exportar para Excel (CSV)
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card p-4 rounded-xl border border-border">
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
          <Button
            variant="secondary"
            onClick={() => {
              setNameFilter("");
              setDateFilter("");
            }}
          >
            Limpar Filtros
          </Button>
        </div>

        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Sessões</TableHead>
                <TableHead>Estado Geral</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : groups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhum agendamento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                groups.map((g) => (
                  <>
                    <TableRow
                      key={g.key}
                      className="cursor-pointer hover:bg-secondary/40"
                      onClick={() => toggle(g.key)}
                    >
                      <TableCell>
                        <ChevronRight
                          size={18}
                          className={cn(
                            "transition-transform text-muted-foreground",
                            expanded[g.key] && "rotate-90 text-primary"
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-semibold">{g.nome}</p>
                          <p className="text-xs text-muted-foreground">{g.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{g.servico}</TableCell>
                      <TableCell>
                        <span className="font-semibold text-primary">{g.count}</span>{" "}
                        {g.count === 1 ? "sessão marcada" : "sessões marcadas"}
                      </TableCell>
                      <TableCell>
                        <span className={cn("font-medium", getStatusColor(g.overallStatus))}>
                          {g.overallStatus}
                        </span>
                      </TableCell>
                    </TableRow>
                    {expanded[g.key] && (
                      <TableRow key={g.key + "-detail"} className="bg-background/50">
                        <TableCell colSpan={5} className="p-0">
                          <div className="p-4">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Data / Hora</TableHead>
                                  <TableHead>Serviço</TableHead>
                                  <TableHead>Estado</TableHead>
                                  <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {g.sessions.map((app) => (
                                  <TableRow key={app.id}>
                                    <TableCell className="font-medium">
                                      {format(new Date(app.data_hora), "dd 'de' MMMM yyyy, HH:mm", {
                                        locale: pt,
                                      })}
                                    </TableCell>
                                    <TableCell>{app.servico}</TableCell>
                                    <TableCell>
                                      <Select
                                        defaultValue={app.status || "Pendente"}
                                        onValueChange={(value) =>
                                          updateStatusMutation.mutate({ id: app.id, status: value })
                                        }
                                      >
                                        <SelectTrigger
                                          className={cn(
                                            "w-[140px] h-9 border-none bg-secondary/50",
                                            getStatusColor(app.status || "Pendente")
                                          )}
                                        >
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
                                          if (confirm("Apagar esta sessão específica?")) {
                                            deleteMutation.mutate(app.id);
                                          }
                                        }}
                                      >
                                        <Trash2 size={18} />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
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
