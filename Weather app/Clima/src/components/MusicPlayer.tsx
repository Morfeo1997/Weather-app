import {
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useState } from "react";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      className="
        flex
        items-center
        gap-5
        rounded-3xl
        border
        border-white/10
        bg-black/10
        px-5
        py-4
        backdrop-blur-xl
      "
    >
      {/* Album / icon */}
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-white/10
        "
      >
        <Music2 size={20} className="text-white/80" />
      </div>

      {/* Track information */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">
          Sonido ambiente
        </p>

        <p className="truncate text-xs text-white/40">
          Weather Radio
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white"
          aria-label="Anterior"
        >
          <SkipBack size={18} />
        </button>

        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
            text-black
            transition-transform
            hover:scale-105
          "
          aria-label={playing ? "Pausar" : "Reproducir"}
        >
          {playing ? (
            <Pause size={17} fill="currentColor" />
          ) : (
            <Play size={17} fill="currentColor" />
          )}
        </button>

        <button
          type="button"
          className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white"
          aria-label="Siguiente"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </section>
  );
}
