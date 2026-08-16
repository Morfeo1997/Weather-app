import { useEffect, useRef } from "react";
import gsap from "gsap";

export interface SkySceneProps {
  sunrise: number;
  sunset: number;
}

export default function SkyScene({
  sunrise,
  sunset,
}: SkySceneProps) {
  const skyRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const sunGlowRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skyRef.current) return;

    const ctx = gsap.context(() => {
      /*
       * =========================================================
       * HORA ACTUAL
       * =========================================================
       */

      const now = new Date();

      const currentHour =
        now.getHours() + now.getMinutes() / 60;

      /*
       * =========================================================
       * FASE DEL DÍA
       * =========================================================
       */

      const isDay =
        currentHour >= sunrise &&
        currentHour <= sunset;

      const isNight = !isDay;

      /*
       * =========================================================
       * PROGRESO SOLAR
       * =========================================================
       *
       * 0   → amanecer
       * 0.5 → mediodía
       * 1   → atardecer
       */

      let sunProgress = 0;

      if (isDay) {
        sunProgress =
          (currentHour - sunrise) /
          (sunset - sunrise);
      }

      /*
       * Aseguramos que el valor nunca salga
       * del rango 0 → 1.
       */

      sunProgress = Math.max(
        0,
        Math.min(1, sunProgress),
      );

      /*
       * =========================================================
       * TRAYECTORIA DEL SOL
       * =========================================================
       */

      const sunX =
        -45 + sunProgress * 90;

      const sunY =
        -Math.sin(sunProgress * Math.PI) * 55;

      /*
       * =========================================================
       * ESTADO INICIAL
       * =========================================================
       */

      gsap.set(sunRef.current, {
        xPercent: sunX,
        yPercent: sunY,
      });

      /*
       * =========================================================
       * ESCENA DIURNA
       * =========================================================
       */

      if (isDay) {
        /*
         * Sol
         */

        gsap.set(sunRef.current, {
          opacity: 1,
          scale: 1,
        });

        /*
         * Glow
         */

        gsap.set(sunGlowRef.current, {
          opacity: 0.8,
          scale: 1,
        });

        /*
         * Luna
         */

        gsap.set(moonRef.current, {
          opacity: 0,
          scale: 0.5,
        });

        /*
         * Estrellas
         */

        gsap.set(starsRef.current, {
          opacity: 0,
        });

        /*
         * =====================================================
         * ANIMACIÓN DEL GLOW
         * =====================================================
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
         * =====================================================
         * MOVIMIENTO DEL SOL
         * =====================================================
         *
         * Un movimiento extremadamente pequeño para evitar
         * que parezca un elemento completamente estático.
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
       * =========================================================
       * ESCENA NOCTURNA
       * =========================================================
       */

      if (isNight) {
        /*
         * Sol
         */

        gsap.set(sunRef.current, {
          opacity: 0,
          scale: 0.6,
        });

        /*
         * Glow
         */

        gsap.set(sunGlowRef.current, {
          opacity: 0,
        });

        /*
         * Luna
         */

        gsap.set(moonRef.current, {
          opacity: 0,
          x: 100,
          y: -20,
          scale: 0.5,
        });

        /*
         * Estrellas
         */

        gsap.set(starsRef.current, {
          opacity: 0,
        });

        /*
         * =====================================================
         * APARICIÓN DE LA NOCHE
         * =====================================================
         */

        const nightTimeline = gsap.timeline({
          delay: 0.8,
        });

        nightTimeline
          .to(starsRef.current, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          })
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
         * Movimiento suave de la Luna.
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
       * =========================================================
       * COLOR DEL CIELO
       * =========================================================
       */

      if (isDay) {
        /*
         * Distancia respecto al mediodía.
         *
         * 0 → mediodía
         * 0.5 → amanecer / atardecer
         */

        const distanceFromNoon =
          Math.abs(sunProgress - 0.5);

        const sunsetIntensity =
          Math.max(
            0,
            1 - distanceFromNoon * 2,
          );

        /*
         * Atardecer / amanecer
         */

        if (sunsetIntensity > 0.75) {
          gsap.to(skyRef.current, {
            background:
              "linear-gradient(to bottom, #38bdf8 0%, #7dd3fc 48%, #fed7aa 100%)",
            duration: 1.5,
          });
        }

        /*
         * Día
         */

        else {
          gsap.to(skyRef.current, {
            background:
              "linear-gradient(to bottom, #0ea5e9 0%, #38bdf8 55%, #bae6fd 100%)",
            duration: 1.5,
          });
        }
      }

      /*
       * =========================================================
       * NOCHE
       * =========================================================
       */

      else {
        gsap.to(skyRef.current, {
          background:
            "linear-gradient(to bottom, #020617 0%, #0f172a 55%, #172554 100%)",
          duration: 1.5,
        });
      }
    }, skyRef);

    return () => ctx.revert();
  }, [sunrise, sunset]);

  return (
    <div
      ref={skyRef}
      className="
        fixed
        inset-0
        overflow-hidden
      "
    >
      {/* =====================================================
          STARS
      ====================================================== */}

      <div
        ref={starsRef}
        className="
          pointer-events-none
          absolute
          inset-0
        "
      >
        <div className="absolute left-[10%] top-[15%] h-1 w-1 rounded-full bg-white/80" />

        <div className="absolute left-[22%] top-[28%] h-1.5 w-1.5 rounded-full bg-white/60" />

        <div className="absolute left-[37%] top-[12%] h-1 w-1 rounded-full bg-white/80" />

        <div className="absolute left-[51%] top-[22%] h-1 w-1 rounded-full bg-white/70" />

        <div className="absolute left-[64%] top-[10%] h-1.5 w-1.5 rounded-full bg-white/80" />

        <div className="absolute left-[79%] top-[25%] h-1 w-1 rounded-full bg-white/60" />

        <div className="absolute left-[91%] top-[14%] h-1 w-1 rounded-full bg-white/80" />

        <div className="absolute left-[72%] top-[38%] h-1 w-1 rounded-full bg-white/60" />

        <div className="absolute left-[30%] top-[38%] h-1 w-1 rounded-full bg-white/70" />
      </div>

      {/* =====================================================
          SUN GLOW
      ====================================================== */}

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

      {/* =====================================================
          SUN
      ====================================================== */}

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

      {/* =====================================================
          MOON
      ====================================================== */}

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
        {/* Crater 1 */}

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

        {/* Crater 2 */}

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

        {/* Crater 3 */}

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

        {/* Crater 4 */}

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

        {/* Crater 5 */}

        <span
          className="
            absolute
            right-8
            top-12
            h-6
            w-6
            rounded-full
            bg-slate-400/20
          "
        />
      </div>

      {/* =====================================================
          BOTTOM GRADIENT
      ====================================================== */}

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
  );
}
