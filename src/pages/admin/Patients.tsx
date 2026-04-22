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
import { User } from "lucide-react";

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pacientes</h1>
          <p className="text-muted-foreground">Lista de clientes e histórico de consultas.</p>
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
