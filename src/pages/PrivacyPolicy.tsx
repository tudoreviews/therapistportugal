import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
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
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <p>
            A presente Política de Privacidade descreve a forma como os dados pessoais dos utilizadores são recolhidos, utilizados e protegidos no âmbito dos serviços prestados por Unconventional Therapist.
          </p>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">1. Responsável pelo Tratamento de Dados</h2>
            <p>
              O responsável pelo tratamento dos dados pessoais é Nuno Santos, em representação da marca Unconventional Therapist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">2. Dados Recolhidos</h2>
            <p>No âmbito da utilização dos nossos serviços, poderão ser recolhidos os seguintes dados pessoais:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nome</li>
              <li>Número de telemóvel</li>
              <li>Endereço de e-mail</li>
              <li>Detalhes relacionados com o serviço agendado</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">3. Finalidade do Tratamento</h2>
            <p>Os dados pessoais recolhidos destinam-se exclusivamente a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gestão de agendamentos</li>
              <li>Envio de confirmações e comunicações via WhatsApp</li>
              <li>Processamento de faturação</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">4. Base Legal</h2>
            <p>
              O tratamento dos dados pessoais tem como fundamento o consentimento do utilizador, manifestado através do preenchimento do formulário de marcação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">5. Conservação dos Dados</h2>
            <p>
              Os dados pessoais serão conservados apenas durante o período necessário para a prestação do serviço, bem como pelo tempo exigido por obrigações legais, nomeadamente para efeitos de faturação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">6. Partilha de Dados</h2>
            <p>
              Os dados recolhidos são armazenados de forma segura através de plataformas como Supabase e Google Sheets, sendo igualmente processados com recurso à ferramenta Make.com para envio de comunicações.
            </p>
            <p>
              Os dados não são vendidos nem partilhados com terceiros para fins publicitários ou comerciais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">7. Direitos do Utilizador</h2>
            <p>
              Nos termos da legislação em vigor, nomeadamente o Regulamento Geral sobre a Proteção de Dados (RGPD), o utilizador tem o direito de:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aceder aos seus dados pessoais</li>
              <li>Solicitar a sua retificação</li>
              <li>Solicitar a sua eliminação</li>
            </ul>
            <p className="mt-4">
              Para exercer qualquer um destes direitos, poderá contactar através do número:
              <br />
              <a href="tel:+351936342632" className="text-primary hover:underline font-medium">+351 936 342 632</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
