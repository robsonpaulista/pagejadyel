import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {
  PIAUI_CIRCUIT,
  PIAUI_DELIMITERS,
  PIAUI_OUTLINE,
  PIAUI_VIEWBOX,
} from "../data/piauiRoads";
import "./PiauiRoadsMap.css";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

type PiauiRoadsMapProps = {
  className?: string;
};

export function PiauiRoadsMap({ className }: PiauiRoadsMapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const route = routeRef.current;
    const truck = truckRef.current;
    if (!root || !route || !truck) return;

    const length = route.getTotalLength();
    gsap.set(route, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    });
    gsap.set(truck, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 70%",
        once: true,
      },
    });

    tl.to(truck, { opacity: 1, duration: 0.25, ease: "power1.out" }, 0);

    tl.to(
      route,
      {
        strokeDashoffset: 0,
        duration: 5.5,
        ease: "power1.inOut",
      },
      0,
    );

    tl.to(
      truck,
      {
        motionPath: {
          path: route,
          align: route,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        duration: 5.5,
        ease: "power1.inOut",
      },
      0,
    );

    tl.to(truck, { opacity: 0, duration: 0.35, ease: "power1.in" }, 5.15);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      className={["piaui-map", className].filter(Boolean).join(" ")}
      ref={rootRef}
    >
      <p className="piaui-map__line">
        Quando a obra chega, a vida anda melhor.
      </p>

      <div className="piaui-map__stage">
        <svg
          className="piaui-map__svg"
          viewBox={PIAUI_VIEWBOX}
          role="img"
          aria-label="Mapa do Piauí com divisorias das maiores cidades e trajeto de obras"
        >
          <path className="piaui-map__land" d={PIAUI_OUTLINE} />

          {PIAUI_DELIMITERS.map((mun) => (
            <g key={mun.id} className="piaui-map__delimiter">
              <path d={mun.d} />
              <text x={mun.x + 4} y={mun.y + 1.5}>
                {mun.name}
              </text>
            </g>
          ))}

          <path
            className="piaui-map__outline"
            d={PIAUI_OUTLINE}
            fill="none"
          />

          <path
            id="piaui-route"
            ref={routeRef}
            className="piaui-map__route"
            d={PIAUI_CIRCUIT}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g ref={truckRef} className="piaui-map__truck" aria-hidden="true">
            <g transform="translate(-10 -6)">
              <rect
                x="2"
                y="2"
                width="14"
                height="7"
                rx="1.4"
                fill="#2c2c2c"
              />
              <rect x="12" y="0.5" width="6" height="5" rx="1" fill="#3a3a3a" />
              <circle cx="5" cy="10.5" r="2.2" fill="#1a1a1a" />
              <circle cx="15" cy="10.5" r="2.2" fill="#1a1a1a" />
              <circle cx="5" cy="10.5" r="0.9" fill="#e0a82a" />
              <circle cx="15" cy="10.5" r="0.9" fill="#e0a82a" />
              <rect
                x="0"
                y="3.2"
                width="3.2"
                height="4.2"
                rx="0.8"
                fill="#e0a82a"
              />
            </g>
          </g>
        </svg>

        <p className="piaui-map__hint">
          O trajeto segue as divisorias das maiores cidades — a obra percorre o
          estado.
        </p>
      </div>
    </div>
  );
}
