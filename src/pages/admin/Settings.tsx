import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Personalize as definições do seu painel e da clínica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Perfil do Administrador</CardTitle>
              <CardDescription>Atualize os seus dados de contacto.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nome de Exibição</Label>
                <Input defaultValue="Dr. Nuno Santos" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="admin@clinica.pt" disabled />
              </div>
              <Button onClick={() => toast.info("Funcionalidade em desenvolvimento")}>
                Guardar Alterações
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Escolha como deseja receber alertas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <span>Alertas de novos agendamentos</span>
                <Button size="sm" variant="outline">Ativado</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                <span>Relatórios semanais por email</span>
                <Button size="sm" variant="outline">Desativado</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
