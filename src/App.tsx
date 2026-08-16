import { useEffect, useState } from "react";
import { Abertura } from "./components/sections/Abertura";
import { NumerosDoMandato } from "./components/sections/NumerosDoMandato";
import { EcaDigital } from "./components/sections/EcaDigital";
import { HospitalDeAmor } from "./components/sections/HospitalDeAmor";
import { CausaAnimal } from "./components/sections/CausaAnimal";
import { MutiraoCatarata } from "./components/sections/MutiraoCatarata";
import { Infraestrutura } from "./components/sections/Infraestrutura";
import { CallFinal } from "./components/sections/CallFinal";
import { BottomBar } from "./components/sections/BottomBar";
import { Mensagem } from "./components/sections/Mensagem";
import { MandatoAposMensagem } from "./components/sections/MandatoAposMensagem";
import { HomeCapas } from "./components/sections/HomeCapas";
import { JinglePlayer } from "./components/JinglePlayer";
import { SmoothScroll } from "./components/SmoothScroll";
import "./App.css";

function usePathname(): string {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return pathname;
}

/** Home — apenas as três capas em carrossel (sem links externos). */
function CapasHome() {
  return (
    <div className="page page--capas">
      <HomeCapas />
    </div>
  );
}

/** Campanha completa (conteúdo anterior da home). Rota: /campanha */
function CampanhaHome() {
  return (
    <SmoothScroll>
      <JinglePlayer>
        <div className="page">
          <BottomBar />
          <main>
            <Abertura />
            <NumerosDoMandato />
            <EcaDigital />
            <HospitalDeAmor />
            <CausaAnimal />
            <MutiraoCatarata />
            <Infraestrutura />
            <CallFinal />
          </main>
        </div>
      </JinglePlayer>
    </SmoothScroll>
  );
}

/** Home narrativa. Rota: /historia */
function HistoriaHome() {
  return (
    <SmoothScroll>
      <JinglePlayer>
        <div className="page page--content-only">
          <main>
            <Mensagem />
            <MandatoAposMensagem />
          </main>
        </div>
      </JinglePlayer>
    </SmoothScroll>
  );
}

function App() {
  const pathname = usePathname();

  if (pathname === "/historia" || pathname.startsWith("/historia/")) {
    return <HistoriaHome />;
  }

  if (pathname === "/campanha" || pathname.startsWith("/campanha/")) {
    return <CampanhaHome />;
  }

  return <CapasHome />;
}

export default App;
