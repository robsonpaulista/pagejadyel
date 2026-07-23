import { Abertura } from "./components/sections/Abertura";
import { NumerosDoMandato } from "./components/sections/NumerosDoMandato";
import { CauseStory } from "./components/sections/CauseStory";
import { CAUSES } from "./components/sections/causes";
import { EcaDigital } from "./components/sections/EcaDigital";
import { HospitalDeAmor } from "./components/sections/HospitalDeAmor";
import { CausaAnimal } from "./components/sections/CausaAnimal";
import { PiauiCuidado } from "./components/sections/PiauiCuidado";
import { Missao } from "./components/sections/Missao";
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
          <CauseStory data={CAUSES[0]} />
          <CauseStory data={CAUSES[1]} />
          <PiauiCuidado />
          <Missao />
          <CallFinal />
        </main>
        <JinglePlayer />
      </div>
    </SmoothScroll>
  );
}

export default App;
