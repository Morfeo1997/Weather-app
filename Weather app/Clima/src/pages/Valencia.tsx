import { useEffect, useRef } from "react";
import { ArrowLeft, CloudSun, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import SkyScene from "../components/SkyScene";

export default function ValenciaPage() {

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

      <SkyScene
        sunrise={7.5}
        sunset={19}
      />
      {/* =====================================================
          SKY
      ====================================================== */}


      {/* =====================================================
          CONTENT
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

            Valencia, España
          </div>
        </header>

        {/* =================================================
            WEATHER
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
          <div >
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

            <h1
              className="
                text-6xl
                font-semibold
                tracking-[-0.05em]
                md:text-8xl
              "
            >
              Valencia
            </h1>
          </div>

          <div
            className="mt-8"
          >
            <div
              className="
                text-7xl
                font-light
                tracking-[-0.05em]
                md:text-9xl
              "
            >
              29°
            </div>

            <p className="mt-3 text-lg text-white/60">
              Cielo despejado
            </p>

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
                Máx. 31°
              </span>

              <span>
                Mín. 22°
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            FOOTER
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
          Valencia · Experiencia climática
        </div>
      </div>
    </main>
  );
}
