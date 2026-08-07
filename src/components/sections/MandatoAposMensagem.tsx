import { CompromissoComprovacao } from "./CompromissoComprovacao";
import { EPraJaPet } from "./EPraJaPet";

/**
 * Fluxo pós-envelope (home narrativa /historia):
 * carta → realizações → É Pra Já Pet.
 * (Hospital editorial fica de fora enquanto a home oficial usa HospitalDeAmor.)
 */
export function MandatoAposMensagem() {
  return (
    <>
      <CompromissoComprovacao />
      <EPraJaPet />
    </>
  );
}
