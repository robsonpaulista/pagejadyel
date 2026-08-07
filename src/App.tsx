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
import { BeatSplash } from "./components/BeatSplash";
import { PageNav } from "./components/PageNav";
import { Mensagem } from "./components/sections/Mensagem";
import { MandatoAposMensagem } from "./components/sections/MandatoAposMensagem";
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

/** Home oficial (campanha completa). */
function OfficialHome() {
  return (
    <SmoothScroll>
      <JinglePlayer>
        <div className="page">
          <BeatSplash />
          <BottomBar />
          <PageNav />
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

/** Home narrativa (envelope → comprovação → É Pra Já Pet). Rota: /historia */
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
  const isHistoria =
    pathname === "/historia" || pathname.startsWith("/historia/");

  return isHistoria ? <HistoriaHome /> : <OfficialHome />;
}

export default App;
