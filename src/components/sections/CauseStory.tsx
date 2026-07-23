import type { ReactNode } from "react";
import { Reveal } from "../Reveal";
import {
  Button,
  Container,
  Media,
  Section,
  SectionTag,
  type AccentColor,
} from "../ui";
import "./CauseStory.css";

export type CauseStoryData = {
  id: string;
  number: string;
  tag: string;
  color: AccentColor;
  headline: ReactNode;
  body: ReactNode;
  mediaCaption: string;
  thumbs?: string[];
  reverse?: boolean;
  pointsTitle?: string;
  points?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

type CauseStoryProps = {
  data: CauseStoryData;
};

export function CauseStory({ data }: CauseStoryProps) {
  return (
    <Section
      className={`cause-story ${data.reverse ? "cause-story--reverse" : ""}`}
      id={data.id}
      aria-labelledby={`${data.id}-heading`}
    >
      <Container grid className="cause-story__inner">
        <Reveal className="cause-story__copy">
          <SectionTag number={data.number} label={data.tag} />
          <h2 id={`${data.id}-heading`} className="headline cause-story__headline">
            {data.headline}
          </h2>
          <div className="lede cause-story__body">{data.body}</div>

          {data.points && data.points.length > 0 ? (
            <div className={`cause-story__points cause-story__points--${data.color}`}>
              {data.pointsTitle ? (
                <p className="cause-story__points-title">{data.pointsTitle}</p>
              ) : null}
              <ul>
                {data.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className={`cause-story__cta highlight--${data.color}`}>
            <Button href={data.ctaHref ?? "#participar"} arrow>
              {data.ctaLabel ?? "Conheça essa história"}
            </Button>
          </div>
        </Reveal>

        <Reveal className="cause-story__media-col" delay={0.1}>
          <Media className="cause-story__media" caption={data.mediaCaption} />
          {data.thumbs ? (
            <div className="cause-story__thumbs">
              {data.thumbs.map((thumb) => (
                <Media key={thumb} className="cause-story__thumb" caption={thumb} />
              ))}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
