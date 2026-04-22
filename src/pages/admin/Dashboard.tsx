import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Users, CheckCircle, Clock } from "lucide-react";

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data: appointments } = await supabase.from("appointments").select("*");
      
      if (!appointments) return null;

      const total = appointments.length;
      const confirmed = appointments.filter(a => a.status === "Confirmado").length;
      const pending = appointments.filter(a => a.status === "Pendente").length;
      const uniquePatients = new Set(appointments.map(a => a.email)).size;

      return { total, confirmed, pending, uniquePatients };
    }
  });

  const cards = [
    { title: "Total de Agendamentos", value: stats?.total || 0, icon: Calendar, color: "text-blue-500" },
    { title: "Pacientes Únicos", value: stats?.uniquePatients || 0, icon: Users, color: "text-purple-500" },
    { title: "Confirmados", value: stats?.confirmed || 0, icon: CheckCircle, color: "text-primary" },
    { title: "Pendentes", value: stats?.pending || 0, icon: Clock, color: "text-orange-500" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Painel de Controlo</h1>
          <p className="text-muted-foreground">Resumo da atividade da clínica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <Card key={idx} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {isLoading ? "..." : card.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-primary">Bem-vindo, Dr. Nuno Santos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Aqui pode gerir todos os agendamentos e visualizar os seus pacientes. 
            Utilize o menu lateral para navegar entre as diferentes secções.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
