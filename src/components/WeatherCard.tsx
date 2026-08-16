import {
  Cloud,
  CloudRain,
  CloudSun,
  Snowflake,
  Sun,
  Umbrella,
  Wind,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef } from "react";

export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "storm"
  | "snow"
  | "wind";

export interface WeatherDay {
  date: string;
  day: string;
  condition: WeatherCondition;
  maxTemperature: number;
  minTemperature: number;
}

interface WeatherCardProps {
  weather: WeatherDay;
}

interface WeatherCardsProps {
  days: WeatherDay[];
}

function WeatherIcon({
  condition,
}: {
  condition: WeatherCondition;
}) {
  const iconClass = "h-8 w-8";

  switch (condition) {
    case "sunny":
      return (
        <Sun
          className={iconClass}
          strokeWidth={1.5}
        />
      );

    case "partly-cloudy":
      return (
        <CloudSun
          className={iconClass}
          strokeWidth={1.5}
        />
      );

    case "cloudy":
      return (
        <Cloud
          className={iconClass}
          strokeWidth={1.5}
        />
      );

    case "rain":
      return (
        <CloudRain
          className={iconClass}
          strokeWidth={1.5}
        />
      );

    case "storm":
      return (
        <Umbrella
          className={iconClass}
          strokeWidth={1.5}
        />
      );

    case "snow":
      return (
        <Snowflake
          className={iconClass}
          strokeWidth={1.5}
        />
      );

    case "wind":
      return (
        <Wind
          className={iconClass}
          strokeWidth={1.5}
        />
      );

    default:
      return (
        <CloudSun
          className={iconClass}
          strokeWidth={1.5}
        />
      );
  }
}

function getConditionLabel(
  condition: WeatherCondition,
) {
  switch (condition) {
    case "sunny":
      return "Soleado";

    case "partly-cloudy":
      return "Parcialmente nublado";

    case "cloudy":
      return "Nublado";

    case "rain":
      return "Lluvioso";

    case "storm":
      return "Tormenta";

    case "snow":
      return "Nieve";

    case "wind":
      return "Ventoso";

    default:
      return "Sin datos";
  }
}

export function WeatherCard({
  weather,
}: WeatherCardProps) {
  return (
    <article
      className="
        group
        flex
        h-52
        w-40
        shrink-0
        flex-col
        justify-between
        rounded-3xl
        border
        border-white/15
        bg-white/10
        p-5
        text-white
        shadow-lg
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-white/15
      "
    >
      {/* =====================================================
          DÍA
      ====================================================== */}

      <div>
        <p
          className="
            text-sm
            font-medium
            uppercase
            tracking-[0.12em]
            text-white/50
          "
        >
          {weather.day}
        </p>

        <p className="mt-1 text-xs text-white/30">
          {weather.date}
        </p>
      </div>

      {/* =====================================================
          ICONO + CONDICIÓN
      ====================================================== */}

      <div>
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-white/10
            text-white/80
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          <WeatherIcon
            condition={weather.condition}
          />
        </div>

        <p
          className="
            mt-3
            min-h-8
            text-sm
            leading-4
            text-white/60
          "
        >
          {getConditionLabel(weather.condition)}
        </p>
      </div>

      {/* =====================================================
          TEMPERATURAS
      ====================================================== */}

      <div className="flex items-end gap-2">
        <span
          className="
            text-2xl
            font-medium
            tracking-tight
          "
        >
          {weather.maxTemperature}°
        </span>

        <span
          className="
            pb-0.5
            text-sm
            text-white/40
          "
        >
          {weather.minTemperature}°
        </span>
      </div>
    </article>
  );
}

export default function WeatherCards({
  days,
}: WeatherCardsProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const amount = 340;

    containerRef.current.scrollBy({
      left:
        direction === "left"
          ? -amount
          : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          mb-5
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-white/40
            "
          >
            Pronóstico
          </p>

          <h2
            className="
              mt-1
              text-xl
              font-medium
              text-white
            "
          >
            Próximos días
          </h2>
        </div>

        {/* =================================================
            FLECHAS
        ================================================== */}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Mostrar días anteriores"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-white/60
              backdrop-blur-md
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Mostrar días siguientes"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-white/60
              backdrop-blur-md
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* =====================================================
          CARDS
      ====================================================== */}

      <div
        ref={containerRef}
        className="
          flex
          gap-4
          overflow-x-auto
          scroll-smooth
          pb-4
          scrollbar-none
        "
      >
        {days.map((day) => (
          <WeatherCard
            key={day.date}
            weather={day}
          />
        ))}
      </div>
    </section>
  );
}
