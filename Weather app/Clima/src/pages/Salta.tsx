import { useEffect, useRef } from "react";
import { ArrowLeft, CloudSun, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function SaltaPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const skyRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const sunGlowRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const weatherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      /*
       * ---------------------------------------------------------
       * CONFIGURACIÓN
       * ---------------------------------------------------------
       */

      // Por ahora usamos horarios ficticios.
      // Más adelante estos valores vendrán de Visual Crossing.
      const sunrise = 7.5; // 07:30
      const sunset = 19.0; // 19:00

      const now = new Date();

      const currentHour =
        now.getHours() + now.getMinutes() / 60;

      /*
       * ---------------------------------------------------------
       * CALCULAR MOMENTO DEL DÍA
       * ---------------------------------------------------------
       */

      const isDay =
        currentHour >= sunrise && currentHour <= sunset;

      const isNight = !isDay;

      /*
       * progress:
       *
       * 0 = sunrise
       * 0.5 = midday
       * 1 = sunset
       */

      let sunProgress = 0;

      if (isDay) {
        sunProgress =
          (currentHour - sunrise) /
          (sunset - sunrise);
      }

      /*
       * ---------------------------------------------------------
       * POSICIÓN DEL SOL
       * ---------------------------------------------------------
       */

      // El Sol se mueve en una especie de arco.
      const sunX =
        -45 + sunProgress * 90;

      const sunY =
        -Math.sin(sunProgress * Math.PI) * 55;

      /*
       * ---------------------------------------------------------
       * TIMELINE INICIAL
       * ---------------------------------------------------------
       */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(skyRef.current, {
          opacity: 0,
          duration: 1.2,
        })
        .from(
          titleRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.7",
        )
        .from(
          weatherRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          "-=0.5",
        );

      /*
       * ---------------------------------------------------------
       * SOL
       * ---------------------------------------------------------
       */

      if (isDay) {
        gsap.set(sunRef.current, {
          xPercent: sunX,
          yPercent: sunY,
          scale: 1,
        });

        gsap.set(sunGlowRef.current, {
          opacity: 0.75,
          scale: 1,
        });

        gsap.set(moonRef.current, {
          opacity: 0,
          scale: 0.5,
        });

        gsap.set(starsRef.current, {
          opacity: 0,
        });

        /*
         * Pequeño movimiento orgánico del Sol.
         */

        gsap.to(sunGlowRef.current, {
          scale: 1.12,
          opacity: 0.6,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        /*
         * El Sol tiene un pequeño movimiento flotante.
         */

        gsap.to(sunRef.current, {
          y: "-=5",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /*
       * ---------------------------------------------------------
       * NOCHE
       * ---------------------------------------------------------
       */

      if (isNight) {
        gsap.set(sunRef.current, {
          opacity: 0,
          scale: 0.6,
        });

        gsap.set(sunGlowRef.current, {
          opacity: 0,
        });

        gsap.set(moonRef.current, {
          opacity: 0,
          x: 100,
          y: -20,
          scale: 0.5,
        });

        gsap.set(starsRef.current, {
          opacity: 0,
        });

        /*
         * Aparición de la Luna
         */

        const nightTimeline = gsap.timeline({
          delay: 0.8,
        });

        nightTimeline
          .to(
            starsRef.current,
            {
              opacity: 1,
              duration: 1.5,
              ease: "power2.out",
            },
          )
          .to(
            moonRef.current,
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 1.8,
              ease: "power3.out",
            },
            "-=1",
          );

        /*
         * Movimiento muy suave de la Luna.
         */

        gsap.to(moonRef.current, {
          y: "-=8",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      /*
       * ---------------------------------------------------------
       * CAMBIO DE COLOR DEL CIELO
       * ---------------------------------------------------------
       */

      if (isDay) {
        /*
         * Cerca del amanecer/atardecer:
         * tonos más cálidos.
         */

        const distanceFromNoon =
          Math.abs(sunProgress - 0.5);

        const sunsetIntensity =
          Math.max(
            0,
            1 - distanceFromNoon * 2,
          );

        gsap.to(skyRef.current, {
          background:
            sunsetIntensity > 0.75
              ? "linear-gradient(to bottom, #7dd3fc 0%, #93c5fd 50%, #fed7aa 100%)"
              : "linear-gradient(to bottom, #38bdf8 0%, #60a5fa 55%, #bae6fd 100%)",
          duration: 1.5,
        });
      } else {
        gsap.to(skyRef.current, {
          background:
            "linear-gradient(to bottom, #020617 0%, #0f172a 55%, #172554 100%)",
          duration: 1.5,
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={pageRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* =====================================================
          SKY
      ====================================================== */}

      <div
        ref={skyRef}
        className="
          fixed
          inset-0
          overflow-hidden
        "
      >
        {/* =================================================
            STARS
        ================================================== */}

        <div
          ref={starsRef}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-white/80" />
          <div className="absolute left-[25%] top-[12%] h-1.5 w-1.5 rounded-full bg-white/70" />
          <div className="absolute left-[42%] top-[24%] h-1 w-1 rounded-full bg-white/80" />
          <div className="absolute left-[60%] top-[15%] h-1 w-1 rounded-full bg-white/60" />
          <div className="absolute left-[75%] top-[27%] h-1.5 w-1.5 rounded-full bg-white/80" />
          <div className="absolute left-[88%] top-[14%] h-1 w-1 rounded-full bg-white/70" />
          <div className="absolute left-[68%] top-[35%] h-1 w-1 rounded-full bg-white/60" />
          <div className="absolute left-[34%] top-[32%] h-1 w-1 rounded-full bg-white/70" />
        </div>

        {/* =================================================
            SUN GLOW
        ================================================== */}

        <div
          ref={sunGlowRef}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[38%]
            h-80
            w-80
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-orange-300/30
            blur-[70px]
          "
        />

        {/* =================================================
            SUN
        ================================================== */}

        <div
          ref={sunRef}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[38%]
            h-36
            w-36
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-gradient-to-br
            from-yellow-100
            via-amber-300
            to-orange-400
            shadow-[0_0_80px_rgba(251,191,36,0.65)]
          "
        >
          <div
            className="
              absolute
              inset-3
              rounded-full
              bg-gradient-to-br
              from-yellow-50
              to-amber-300
            "
          />
        </div>

        {/* =================================================
            MOON
        ================================================== */}

        <div
          ref={moonRef}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[30%]
            h-32
            w-32
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-gradient-to-br
            from-slate-50
            to-slate-300
            shadow-[0_0_60px_rgba(226,232,240,0.2)]
          "
        >
          {/* Craters */}
          <span
            className="
              absolute
              left-7
              top-8
              h-5
              w-5
              rounded-full
              bg-slate-400/30
            "
          />

          <span
            className="
              absolute
              left-16
              top-5
              h-3
              w-3
              rounded-full
              bg-slate-400/25
            "
          />

          <span
            className="
              absolute
              bottom-8
              left-10
              h-7
              w-7
              rounded-full
              bg-slate-400/20
            "
          />

          <span
            className="
              absolute
              bottom-6
              right-6
              h-4
              w-4
              rounded-full
              bg-slate-400/25
            "
          />
        </div>

        {/* =================================================
            BOTTOM GRADIENT
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-64
            bg-gradient-to-t
            from-slate-950/80
            to-transparent
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-6">
        {/* Header */}

        <header className="flex items-center justify-between pt-8">
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

            Salta, Argentina
          </div>
        </header>

        {/* =================================================
            MAIN WEATHER INFORMATION
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
          <div ref={titleRef}>
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
              Salta
            </h1>
          </div>

          <div
            ref={weatherRef}
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
              24°
            </div>

            <p className="mt-3 text-lg text-white/60">
              Parcialmente nublado
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
                Máx. 26°
              </span>

              <span>
                Mín. 14°
              </span>
            </div>
          </div>
        </section>

        {/* =================================================
            TEMPORARY DEBUG INFO
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
