import { Abertura } from "./components/sections/Abertura";
import { NumerosDoMandato } from "./components/sections/NumerosDoMandato";
import { EcaDigital } from "./components/sections/EcaDigital";
import { HospitalDeAmor } from "./components/sections/HospitalDeAmor";
import { CausaAnimal } from "./components/sections/CausaAnimal";
import { MutiraoCatarata } from "./components/sections/MutiraoCatarata";
import { Infraestrutura } from "./components/sections/Infraestrutura";
import { CallFinal } from "./components/sections/CallFinal";
import { BottomBar } from "./components/sections/BottomBar";
import { JinglePlayer } from "./components/JinglePlayer";
import { SmoothScroll } from "./components/SmoothScroll";
import "./App.css";

function App() {
  return (
    <SmoothScroll>
      <div className="page">
        <BottomBar />
        {/* IntroSplash em standby: reativar importando de ./components/IntroSplash */}
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
        <JinglePlayer />
      </div>
    </SmoothScroll>
  );
}

export default App;
