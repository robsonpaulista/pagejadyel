import "./Media.css";

type MediaProps = {
  caption: string;
  className?: string;
  src?: string;
  alt?: string;
};

/** Superfície de mídia: imagem real ou placeholder tonal com legenda. */
export function Media({ caption, className, src, alt = "" }: MediaProps) {
  return (
    <figure className={["media", className].filter(Boolean).join(" ")}>
      {src ? (
        <img className="media__img" src={src} alt={alt} loading="lazy" />
      ) : (
        <span className="media__caption" aria-hidden="true">
          {caption}
        </span>
      )}
      {src && caption ? (
        <figcaption className="media__caption media__caption--on-image">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
