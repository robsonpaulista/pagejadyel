import { Mail } from "lucide-react";
import "./SectionContact.css";

export const CONTACT_EMAIL = "contato@jadyelalencar.com.br";
export const INSTAGRAM_HREF = "https://www.instagram.com/jadyelalencar/";
/** Substitua pelos dígitos com DDI (ex.: 5586999999999). */
export const WHATSAPP_NUMBER = "";
export const WHATSAPP_HREF = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}`
  : "https://wa.me/";

type SectionContactProps = {
  className?: string;
  /** Fundo claro (padrão) ou escuro */
  tone?: "light" | "dark";
};

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.84c0 1.99.57 3.85 1.56 5.44L2 22l4.9-1.64a9.86 9.86 0 0 0 5.14 1.42h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.77 13.99c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.93-4.37-.14-.19-1.14-1.52-1.14-2.9 0-1.38.72-2.06.98-2.34.26-.28.56-.35.75-.35h.54c.17 0 .4-.06.62.47.24.58.81 2 .88 2.14.07.14.12.31.02.5-.1.19-.14.31-.28.48-.14.17-.29.37-.41.5-.14.14-.28.29-.12.56.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.17-.19.7-.81.89-1.09.19-.28.37-.23.62-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
  );
}

/** Instagram, e-mail e WhatsApp — rodapé de contato das seções. */
export function SectionContact({
  className,
  tone = "light",
}: SectionContactProps) {
  return (
    <nav
      className={[
        "section-contact",
        `section-contact--${tone}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Contato"
    >
      <a
        className="section-contact__link"
        href={INSTAGRAM_HREF}
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon size={15} />
        <span>@jadyelalencar</span>
      </a>
      <a className="section-contact__link" href={`mailto:${CONTACT_EMAIL}`}>
        <Mail size={15} strokeWidth={2.1} aria-hidden />
        <span>{CONTACT_EMAIL}</span>
      </a>
      <a
        className="section-contact__whatsapp"
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
      >
        <WhatsAppIcon size={20} />
      </a>
    </nav>
  );
}
