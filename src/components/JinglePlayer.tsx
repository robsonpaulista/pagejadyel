import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "./JinglePlayer.css";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (n: number) => void;
  mute: () => void;
  unMute: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getPlaylistIndex: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  getVideoData: () => { title?: string; video_id?: string };
  destroy: () => void;
};

type YTPlayerEvent = { data: number; target: YTPlayer };

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        opts: {
          height?: string;
          width?: string;
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (e: { target: YTPlayer }) => void;
            onStateChange?: (e: YTPlayerEvent) => void;
          };
        },
      ) => YTPlayer;
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const TRACKS = [
  { id: "zj53GkJr6Z0", title: "O Piauí é pra já" },
  { id: "xaqPZC7b9YE", title: "O Piauí é pra já" },
  { id: "O68NOBO4O9U", title: "O Piauí é pra já" },
  { id: "1mwoxdPk710", title: "O Piauí é pra já" },
] as const;

const PLAYLIST = TRACKS.map((t) => t.id).join(",");

let apiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return apiPromise;
}

function formatTime(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "00:00";
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/**
 * Player de jingles: convida sem som, toca só no clique,
 * depois vira barra compacta com progresso durante a navegação.
 */
export function JinglePlayer() {
  const reduceMotion = useReducedMotion();
  const hostId = useId().replace(/:/g, "");
  const playerRef = useRef<YTPlayer | null>(null);
  const [ready, setReady] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackTitle, setTrackTitle] = useState<string>(TRACKS[0].title);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const [inviteRoot, setInviteRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const find = () => {
      const el = document.getElementById("jingle-invite-root");
      if (el) setInviteRoot(el);
    };
    find();
    const poll = window.setInterval(find, 80);
    const stop = window.setTimeout(() => window.clearInterval(poll), 2500);
    return () => {
      window.clearInterval(poll);
      window.clearTimeout(stop);
    };
  }, []);

  const syncTrackMeta = useCallback((player: YTPlayer) => {
    try {
      const idx = player.getPlaylistIndex();
      if (typeof idx === "number" && idx >= 0) {
        setTrackIndex(idx);
        const fallback = TRACKS[idx]?.title ?? TRACKS[0].title;
        const data = player.getVideoData?.();
        const apiTitle = data?.title?.trim();
        // Prefere título curto/campanha; se a API trouxer algo útil e curto, usa
        setTrackTitle(
          apiTitle && apiTitle.length > 0 && apiTitle.length < 48
            ? apiTitle
            : fallback,
        );
      }
    } catch {
      /* ignore */
    }
    try {
      const d = player.getDuration();
      if (d > 0) setDuration(d);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !window.YT) return;

      playerRef.current = new window.YT.Player(`jingle-host-${hostId}`, {
        height: "0",
        width: "0",
        videoId: TRACKS[0].id,
        playerVars: {
          playlist: PLAYLIST,
          loop: 1,
          controls: 0,
          rel: 0,
          playsinline: 1,
          autoplay: 0,
          modestbranding: 1,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(70);
            event.target.mute();
            setReady(true);
          },
          onStateChange: (event) => {
            const YT = window.YT;
            if (!YT) return;

            if (event.data === YT.PlayerState.PLAYING) {
              setPlaying(true);
              syncTrackMeta(event.target);
            }
            if (event.data === YT.PlayerState.PAUSED) setPlaying(false);
            if (event.data === YT.PlayerState.ENDED) {
              syncTrackMeta(event.target);
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [hostId, syncTrackMeta]);

  // Progresso em tempo real enquanto toca
  useEffect(() => {
    if (!playing) return;
    const tick = () => {
      const player = playerRef.current;
      if (!player) return;
      try {
        setCurrentTime(player.getCurrentTime() || 0);
        const d = player.getDuration();
        if (d > 0) setDuration(d);
      } catch {
        /* ignore */
      }
    };
    tick();
    const id = window.setInterval(tick, 400);
    return () => window.clearInterval(id);
  }, [playing]);

  const start = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    setEngaged(true);
    setExpanded(false);
    setMuted(false);
    player.unMute();
    player.setVolume(volume);
    player.playVideo();
    setPlaying(true);
    syncTrackMeta(player);
  }, [volume, syncTrackMeta]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (!engaged) {
      start();
      return;
    }
    if (playing) {
      player.pauseVideo();
      setPlaying(false);
    } else {
      player.playVideo();
      setPlaying(true);
    }
  }, [engaged, playing, start]);

  const onSeek = (value: number) => {
    const player = playerRef.current;
    if (!player || !duration) return;
    const next = (value / 100) * duration;
    player.seekTo(next, true);
    setCurrentTime(next);
  };

  const onVolume = (value: number) => {
    setVolume(value);
    const player = playerRef.current;
    if (!player) return;
    player.setVolume(value);
    if (value === 0) {
      player.mute();
      setMuted(true);
    } else if (muted) {
      player.unMute();
      setMuted(false);
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;
    if (muted) {
      player.unMute();
      player.setVolume(volume || 70);
      if (volume === 0) setVolume(70);
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const invite =
    !engaged && inviteRoot
      ? createPortal(
          <motion.div
            className="jingle-invite"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          >
            <button
              type="button"
              className="jingle-invite__btn"
              onClick={start}
              disabled={!ready}
              aria-label="Ouvir os jingles da campanha"
            >
              <span className="jingle-invite__icon" aria-hidden="true">
                <PlayIcon />
              </span>
              <span className="jingle-invite__copy">
                <strong>Ouvir os jingles</strong>
                <small>4 faixas · começa no seu clique</small>
              </span>
            </button>
          </motion.div>,
          inviteRoot,
        )
      : null;

  return (
    <>
      <div id={`jingle-host-${hostId}`} className="jingle-host" aria-hidden="true" />
      {invite}

      <AnimatePresence>
        {engaged && (
          <motion.aside
            className={`jingle-bar${expanded ? " jingle-bar--expanded" : ""}`}
            role="region"
            aria-label="Player dos jingles"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="jingle-bar__play"
              onClick={togglePlay}
              aria-label={playing ? "Pausar" : "Tocar"}
              aria-pressed={playing}
            >
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>

            <div className="jingle-bar__body">
              <div className="jingle-bar__meta">
                <span className="jingle-bar__title">{trackTitle}</span>
                <span className="jingle-bar__index">
                  Jingle {trackIndex + 1} de {TRACKS.length}
                  {" · "}
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <label className="jingle-bar__progress">
                <span className="sr-only">Progresso</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={(e) => onSeek(Number(e.target.value))}
                  style={{ "--prog": `${progress}%` } as CSSProperties}
                />
              </label>
            </div>

            <button
              type="button"
              className="jingle-bar__more"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-label={expanded ? "Recolher controles" : "Mais controles"}
            >
              {expanded ? "−" : "···"}
            </button>

            {expanded && (
              <div className="jingle-bar__extras">
                <button
                  type="button"
                  className="jingle-bar__mute"
                  onClick={toggleMute}
                  aria-label={muted || volume === 0 ? "Ativar som" : "Silenciar"}
                  aria-pressed={muted || volume === 0}
                >
                  {muted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
                </button>
                <label className="jingle-bar__volume">
                  <span className="sr-only">Volume</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={muted ? 0 : volume}
                    onChange={(e) => onVolume(Number(e.target.value))}
                    style={{ "--vol": `${muted ? 0 : volume}%` } as CSSProperties}
                  />
                </label>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5L8 5.5Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 10v4h3l4 3V7L7 10H4Z" />
      <path d="M15 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M17.5 7a6 6 0 0 1 0 10" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 10v4h3l4 3V7L7 10H4Z" />
      <path d="m16 9 5 5M21 9l-5 5" />
    </svg>
  );
}
