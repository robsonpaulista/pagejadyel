import ativo25 from "../../assets/ativo-25.png";
import ativo36 from "../../assets/ativo-36.png";
import "./HomeCapas.css";

const CONTACT_EMAIL = "contato@jadyelalencar.com.br";

/**
 * Home exclusiva: Ativo 25 + Ativo 36 + rodapé legal da campanha.
 */
export function HomeCapas() {
  return (
    <main className="home-capas" aria-label="Capa institucional">
      <img
        className="home-capas__badge"
        src={ativo36}
        alt=""
        aria-hidden="true"
        draggable={false}
      />

      <div className="home-capas__stage">
        <img
          className="home-capas__photo"
          src={ativo25}
          alt="Jadyel Alencar"
          draggable={false}
        />
      </div>

      <footer className="home-capas__legal">
        <p className="home-capas__legal-line home-capas__legal-line--strong">
          PROPAGANDA ELEITORAL | CNPJ: 68.492.349/0001-21
        </p>
        <p className="home-capas__legal-line home-capas__legal-line--strong">
          Jadyel Alencar 1000 — Deputado Federal — Republicanos
        </p>
        <p className="home-capas__legal-links">
          <a className="home-capas__legal-link" href="#politica-privacidade">
            Política de Privacidade
          </a>
          <span aria-hidden="true"> • </span>
          <a className="home-capas__legal-link" href="#politica-cookies">
            Política de Cookies
          </a>
        </p>
        <p className="home-capas__legal-line home-capas__legal-line--strong">
          Privacidade e Proteção de Dados
        </p>
        <p className="home-capas__legal-line">
          Para dúvidas, solicitações ou exercício dos seus direitos
          relacionados a dados pessoais, entre em contato pelo e-mail:{" "}
          <a
            className="home-capas__legal-mail"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="home-capas__legal-line home-capas__legal-copy">
          © 2026 Campanha Jadyel Alencar. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
