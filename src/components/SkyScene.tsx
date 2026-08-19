import { useEffect, useRef } from "react";
import gsap from "gsap";

interface SkySceneProps {
  sunrise: string;
  sunset: string;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time
    .split(":")
    .map(Number);

  return hours * 60 + minutes;
}

export default function SkyScene({
  sunrise,
  sunset,
}: SkySceneProps) {
  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sunRef.current || !moonRef.current) {
      return;
    }

    const sunriseMinutes =
      timeToMinutes(sunrise);

    const sunsetMinutes =
      timeToMinutes(sunset);

    const now = new Date();

    const currentMinutes =
      now.getHours() * 60 +
      now.getMinutes();

    /*
     * =====================================================
     * Calculamos la posición del sol
     * =====================================================
     */

    let sunProgress = 0;

    if (
      currentMinutes >= sunriseMinutes &&
      currentMinutes <= sunsetMinutes
    ) {
      sunProgress =
        (currentMinutes - sunriseMinutes) /
        (sunsetMinutes - sunriseMinutes);
    }

    /*
     * =====================================================
     * Animación del SOL
     * =====================================================
     */

    const sunX = 50;
    const sunY =
      85 - Math.sin(sunProgress * Math.PI) * 65;

    gsap.to(sunRef.current, {
      left: `${sunX}%`,
      top: `${sunY}%`,
      duration: 1.5,
      ease: "power2.out",
    });

    /*
     * =====================================================
     * Luna
     * =====================================================
     */

    const isNight =
      currentMinutes < sunriseMinutes ||
      currentMinutes > sunsetMinutes;

    gsap.to(moonRef.current, {
      opacity: isNight ? 1 : 0,
      scale: isNight ? 1 : 0.8,
      duration: 1,
      ease: "power2.out",
    });
  }, [sunrise, sunset]);

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
    >
      {/* =================================================
          SOL
      ================================================== */}

      <div
        ref={sunRef}
        className="
          absolute
          h-32
          w-32
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-yellow-300
          opacity-90
          blur-[1px]
          shadow-[0_0_80px_30px_rgba(253,224,71,0.35)]
        "
      />

      {/* =================================================
          LUNA
      ================================================== */}

      <div
        ref={moonRef}
        className="
          absolute
          left-1/2
          top-[25%]
          h-28
          w-28
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-slate-200
          opacity-0
          shadow-[0_0_60px_20px_rgba(226,232,240,0.2)]
        "
      >
        {/* Manchas de la luna */}

        <span
          className="
            absolute
            left-6
            top-7
            h-5
            w-5
            rounded-full
            bg-slate-400/30
          "
        />

        <span
          className="
            absolute
            right-7
            top-12
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
            left-10
            h-4
            w-4
            rounded-full
            bg-slate-400/25
          "
        />
      </div>

      {/* =================================================
          OVERLAY
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-transparent
          via-transparent
          to-slate-950/60
        "
      />
    </div>
  );
}
