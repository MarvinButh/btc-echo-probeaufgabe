import HeroBlock from "../components/HeroBlock";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <HeroBlock
          eyebrow="BTC-ECHO"
          headline="BTC-ECHO - Bitcoin & Blockchain seit 2014"
          subheadline="Wir sind das führende Medium zu den Themengebieten Bitcoin, Blockchain und Decentralized Finance."
          imageUrl="/file.svg"
          buttonHref="#"
          buttonLabel="Mehr erfahren"
        />

        <div className="mt-8 bg-neutral-900/0 text-neutral-400 rounded-lg p-6">
          <p className="max-w-3xl mx-auto leading-relaxed">
            Seit der Gründung in 2014 besteht die Vision von BTC-ECHO darin,
            Menschen in Deutschland, Österreich, Liechtenstein und der Schweiz
            (DACH) mit tagesaktueller Berichterstattung und Analysen über die
            Geschehnisse im Blockchain- und Kryptospace auf dem Laufenden zu
            halten.
          </p>
        </div>
      </div>
    </div>
  );
}
