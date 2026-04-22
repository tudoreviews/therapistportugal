import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { User, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

interface PatientStats {
  nome: string;
  email: string;
  telemovel: string;
  totalConsultas: number;
}

const Patients = () => {
  const { data: patients, isLoading } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("nome, email, telemovel");
      
      if (error) throw error;

      const patientMap = new Map<string, PatientStats>();

      data.forEach(app => {
        const key = app.email.toLowerCase();
        if (patientMap.has(key)) {
          const existing = patientMap.get(key)!;
          existing.totalConsultas += 1;
        } else {
          patientMap.set(key, {
            nome: app.nome,
            email: app.email,
            telemovel: app.telemovel,
            totalConsultas: 1
          });
        }
      });

      return Array.from(patientMap.values()).sort((a, b) => b.totalConsultas - a.totalConsultas);
    }
  });

  const exportToCSV = () => {
    if (!patients || patients.length === 0) {
      toast.error("Não há dados para exportar");
      return;
    }

    const headers = ["Nome", "Email", "Telemóvel", "Total de Consultas"];
    const csvContent = [
      headers.join(","),
      ...patients.map(p => [
        `"${p.nome}"`,
        `"${p.email}"`,
        `"${p.telemovel || ""}"`,
        `"${p.totalConsultas}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pacientes_${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exportado com sucesso!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Pacientes</h1>
            <p className="text-muted-foreground">Lista de clientes e histórico de consultas.</p>
          </div>
          <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
            <Download size={18} />
            Exportar para CSV
          </Button>
        </div>

        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead className="text-center">Total de Consultas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">Carregando...</TableCell>
                </TableRow>
              ) : patients?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">Nenhum paciente encontrado.</TableCell>
                </TableRow>
              ) : (
                patients?.map((patient) => (
                  <TableRow key={patient.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                          <User size={16} />
                        </div>
                        <span className="font-semibold">{patient.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{patient.email}</p>
                        <p className="text-muted-foreground">{patient.telemovel}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold">
                      {patient.totalConsultas}
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

export default Patients;
