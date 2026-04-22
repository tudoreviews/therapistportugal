import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logo from "@/assets/logo-wide.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Login efetuado com sucesso!");
      navigate("/admin");
    } catch (error: any) {
      toast.error("Credenciais inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-16 w-auto mb-6" />
          <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
          <p className="text-zinc-400 text-sm">Bem-vindo, Dr. Nuno Santos</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-300">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="admin@clinica.pt" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-300">Palavra-passe</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-11 text-base font-semibold bg-white text-black hover:bg-zinc-200 transition-colors" 
            disabled={loading}
          >
            {loading ? "A entrar..." : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
