import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">1. Introdução</h2>
            <p>
              A sua privacidade é importante para nós. É política do Unconventional Therapist respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Unconventional Therapist, e outros sites que possuímos e operamos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">2. Coleta de Dados</h2>
            <p>
              Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.
            </p>
            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemo-los dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">3. Uso de Informações</h2>
            <p>
              Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
            <p>
              O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">4. Compromisso do Usuário</h2>
            <p>
              O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Unconventional Therapist oferece no site e com caráter enunciativo, mas não limitativo:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
              <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
              <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Unconventional Therapist, de seus fornecedores ou terceiros.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-4">5. Mais informações</h2>
            <p>
              Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
            </p>
            <p>Esta política é efetiva a partir de Janeiro de 2024.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
