import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-secondary group transition-colors"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Voltar
        </Button>
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">1. Termos</h2>
            <p>
              Ao acessar ao site Unconventional Therapist, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">2. Uso de Licença</h2>
            <p>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Unconventional Therapist , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode: 
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>modificar ou copiar os materiais; </li>
              <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial); </li>
              <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Unconventional Therapist; </li>
              <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou </li>
              <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
            </ul>
            <p>
              Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Unconventional Therapist a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">3. Isenção de responsabilidade</h2>
            <p>
              Os materiais no site da Unconventional Therapist são fornecidos 'como estão'. Unconventional Therapist não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">4. Limitações</h2>
            <p>
              Em nenhum caso o Unconventional Therapist ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Unconventional Therapist, mesmo que Unconventional Therapist ou um representante autorizado da Unconventional Therapist tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">5. Precisão dos materiais</h2>
            <p>
              Os materiais exibidos no site da Unconventional Therapist podem incluir erros técnicos, tipográficos ou fotográficos. Unconventional Therapist não garante que qualquer material em seu site seja preciso, completo ou atual. Unconventional Therapist pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Unconventional Therapist não se compromete a atualizar os materiais.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
