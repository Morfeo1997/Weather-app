import {
  ArrowLeft,
  CloudSun,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import SkyScene from "../components/SkyScene";

export default function SaltaPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* =====================================================
          ESCENA DEL CIELO
      ====================================================== */}

      <SkyScene
        sunrise={7.5}
        sunset={19}
      />

      {/* =====================================================
          CONTENIDO DE LA PÁGINA
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-6xl
          flex-col
          px-6
        "
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <header
          className="
            flex
            items-center
            justify-between
            pt-8
          "
        >
          {/* Volver */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-black/10
              px-4
              py-2
              text-sm
              text-white/70
              backdrop-blur-md
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={16} />

            Volver
          </Link>

          {/* Ubicación */}

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-white/60
            "
          >
            <MapPin size={15} />

            Salta, Argentina
          </div>
        </header>

        {/* =================================================
            INFORMACIÓN DEL CLIMA
        ================================================== */}

        <section
          className="
            flex
            flex-1
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          {/* Estado */}

          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-2
              text-sm
              uppercase
              tracking-[0.25em]
              text-white/50
            "
          >
            <CloudSun size={18} />

            Clima actual
          </div>

          {/* Ciudad */}

          <h1
            className="
              text-6xl
              font-semibold
              tracking-[-0.05em]
              md:text-8xl
            "
          >
            Salta
          </h1>

          {/* Temperatura */}

          <div
            className="
              mt-8
              text-7xl
              font-light
              tracking-[-0.05em]
              md:text-9xl
            "
          >
            24°
          </div>

          {/* Condición */}

          <p
            className="
              mt-3
              text-lg
              text-white/60
            "
          >
            Parcialmente nublado
          </p>

          {/* Máxima / mínima */}

          <div
            className="
              mt-5
              flex
              justify-center
              gap-6
              text-sm
              text-white/40
            "
          >
            <span>
              Máx. 26°
            </span>

            <span>
              Mín. 14°
            </span>
          </div>
        </section>

        {/* =================================================
            FOOTER TEMPORAL
        ================================================== */}

        <div
          className="
            mb-8
            text-center
            text-xs
            uppercase
            tracking-[0.2em]
            text-white/30
          "
        >
          Salta · Experiencia climática
        </div>
      </div>
    </main>
  );
}
