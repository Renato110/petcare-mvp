export default function Privacy() {
  return (
    <main className="container space-y-4">
      <h1 className="text-xl font-semibold">Política de Privacidade (MVP)</h1>
      <p className="text-sm">Coletamos o mínimo necessário. Dados de casos ficam apenas no seu navegador (localStorage) nesta versão. Se optar por sincronizar no futuro, informaremos claramente a base legal, finalidade e retenção. Você pode solicitar exclusão integral dos dados.</p>
      <ul className="text-sm list-disc pl-5">
        <li>LocalStorage para histórico (você pode limpar a qualquer momento)</li>
        <li>Sem cookies de terceiros</li>
        <li>Sem venda de dados</li>
      </ul>
      <a className="text-sm underline opacity-80" href="/">Voltar</a>
    </main>
  );
}
