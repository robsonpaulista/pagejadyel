import { Abertura } from "./components/sections/Abertura";
import { NumerosDoMandato } from "./components/sections/NumerosDoMandato";
import { MapaRevela } from "./components/sections/MapaRevela";
import { Ecossistema } from "./components/sections/Ecossistema";
import { CauseStory } from "./components/sections/CauseStory";
import { CAUSES } from "./components/sections/causes";
import { EcaDigital } from "./components/sections/EcaDigital";
import { HospitalDeAmor } from "./components/sections/HospitalDeAmor";
import { PiauiCuidado } from "./components/sections/PiauiCuidado";
import { Missao } from "./components/sections/Missao";
import { CallFinal } from "./components/sections/CallFinal";
import { BottomBar } from "./components/sections/BottomBar";
import { JinglePlayer } from "./components/JinglePlayer";
import "./App.css";

function App() {
  return (
    <div className="page">
      {/* IntroSplash em standby: reativar importando de ./components/IntroSplash */}
      <main>
        <Abertura />
        <NumerosDoMandato />
        <MapaRevela />
        <Ecossistema />
        <EcaDigital />
        <HospitalDeAmor />
        <CauseStory data={CAUSES[0]} />
        <CauseStory data={CAUSES[1]} />
        <CauseStory data={CAUSES[2]} />
        <PiauiCuidado />
        <Missao />
        <CallFinal />
      </main>
      <JinglePlayer />
      <BottomBar />
    </div>
  );
}

export default App;
