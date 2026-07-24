import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {
  PIAUI_CIRCUIT,
  PIAUI_DELIMITERS,
  PIAUI_OUTLINE,
  PIAUI_STOPS,
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
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const route = routeRef.current;
    const truck = truckRef.current;
    const dots = dotsRef.current;
    if (!root || !route || !truck || !dots) return;

    const length = route.getTotalLength();
    const stopNodes = Array.from(dots.querySelectorAll("circle"));

    gsap.set(route, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    gsap.set(truck, { opacity: 0 });
    gsap.set(stopNodes, { scale: 0, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 68%",
        once: true,
      },
    });

    tl.to(truck, { opacity: 1, duration: 0.2 }, 0);

    tl.to(
      route,
      {
        strokeDashoffset: 0,
        duration: 6.2,
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
          alignOrigin: [0.5, 0.55],
          autoRotate: true,
        },
        duration: 6.2,
        ease: "power1.inOut",
      },
      0,
    );

    stopNodes.forEach((node, i) => {
      const t = (i / Math.max(stopNodes.length - 1, 1)) * 6.2;
      tl.to(
        node,
        { scale: 1, duration: 0.28, ease: "back.out(2)" },
        Math.max(0.05, t - 0.05),
      );
    });

    tl.to(truck, { opacity: 0, duration: 0.4, ease: "power1.in" }, 5.85);

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
          aria-label="Mapa do Piauí: divisorias das maiores cidades e trajeto de obras de norte a sul"
        >
          <path className="piaui-map__land" d={PIAUI_OUTLINE} />

          {PIAUI_DELIMITERS.map((mun) => (
            <g key={mun.id} className="piaui-map__delimiter">
              <path d={mun.d} />
              {mun.label ? (
                <text x={mun.x + 6} y={mun.y + 2}>
                  {mun.name}
                </text>
              ) : null}
            </g>
          ))}

          <path className="piaui-map__outline" d={PIAUI_OUTLINE} fill="none" />

          <path
            className="piaui-map__route-ghost"
            d={PIAUI_CIRCUIT}
            fill="none"
          />

          <path
            ref={routeRef}
            className="piaui-map__route"
            d={PIAUI_CIRCUIT}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g ref={dotsRef} className="piaui-map__stops" aria-hidden="true">
            {PIAUI_STOPS.map((stop) => (
              <circle key={stop.name} cx={stop.x} cy={stop.y} r="3.2" />
            ))}
          </g>

          <g ref={truckRef} className="piaui-map__truck" aria-hidden="true">
            <g transform="translate(-7 -9)">
              <rect x="1" y="3" width="10" height="8" rx="1.2" fill="#2a2a2a" />
              <rect x="8" y="1" width="5" height="5.5" rx="1" fill="#3d3d3d" />
              <circle cx="4" cy="12" r="2" fill="#1a1a1a" />
              <circle cx="11" cy="12" r="2" fill="#1a1a1a" />
              <circle cx="4" cy="12" r="0.75" fill="#e0a82a" />
              <circle cx="11" cy="12" r="0.75" fill="#e0a82a" />
              <rect x="0" y="4.5" width="2.4" height="4" rx="0.6" fill="#e0a82a" />
            </g>
          </g>
        </svg>

        <p className="piaui-map__hint">
          De Parnaíba a Corrente — a obra liga as maiores cidades do estado.
        </p>
      </div>
    </div>
  );
}
