import {
  ArrowLeft,
  Cloud,
  CloudRain,
  CloudSun,
  Droplets,
  Moon,
  Snowflake,
  Sun,
  Umbrella,
  Wind,
} from "lucide-react";

import type {
  WeatherDay,
  WeatherCondition,
} from "../types/weather";

export interface HourlyWeatherData {
  time: string;
  hour: number;
  temperature: number;
  condition: WeatherCondition;
  precipitationProbability?: number;
  humidity?: number;
  windSpeed?: number;
}

interface HourlyWeatherProps {
  day: WeatherDay;
  hours: WeatherHour[];
  onClose?: () => void;
}

function WeatherIcon({
  condition,
  isNight,
}: {
  condition: WeatherCondition;
  isNight: boolean;
}) {
  const className = "h-6 w-6";

  if (isNight && condition === "sunny") {
    return (
      <Moon
        className={className}
        strokeWidth={1.5}
      />
    );
  }

  switch (condition) {
    case "sunny":
      return (
        <Sun
          className={className}
          strokeWidth={1.5}
        />
      );

    case "partly-cloudy":
      return (
        <CloudSun
          className={className}
          strokeWidth={1.5}
        />
      );

    case "cloudy":
      return (
        <Cloud
          className={className}
          strokeWidth={1.5}
        />
      );

    case "rain":
      return (
        <CloudRain
          className={className}
          strokeWidth={1.5}
        />
      );

    case "storm":
      return (
        <Umbrella
          className={className}
          strokeWidth={1.5}
        />
      );

    case "snow":
      return (
        <Snowflake
          className={className}
          strokeWidth={1.5}
        />
      );

    case "wind":
      return (
        <Wind
          className={className}
          strokeWidth={1.5}
        />
      );

    default:
      return (
        <CloudSun
          className={className}
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
      return "Lluvia";

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

function isNightHour(hour: number) {
  return hour < 7 || hour >= 20;
}

export default function HourlyWeather({
  day,
  hours,
  onClose,
}: HourlyWeatherProps) {
  return (
    <section
      className="
        w-full
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        text-white
        shadow-2xl
        backdrop-blur-xl
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          mb-8
          flex
          items-center
          justify-between
          gap-4
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
            Pronóstico por hora
          </p>

          <h2
            className="
              mt-1
              text-2xl
              font-medium
            "
          >
            {day.day}
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-white/40
            "
          >
            {day.date}
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar pronóstico horario"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-white/60
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={18} />
          </button>
        )}
      </div>

      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <div
        className="
          overflow-x-auto
          pb-4
          scrollbar-none
        "
      >
        <div
          className="
            relative
            flex
            min-w-max
            gap-0
            px-4
          "
        >
          {/* Línea horizontal */}

          <div
            className="
              absolute
              left-4
              right-4
              top-[58px]
              h-px
              bg-white/10
            "
          />

          {hours.map((weather, index) => {
            const night = isNightHour(
              weather.hour,
            );

            return (
              <article
                key={`${day.date}-${weather.time}-${index}`}
                className="
                  relative
                  flex
                  w-28
                  flex-col
                  items-center
                "
              >
                {/* =================================================
                    HORA
                ================================================== */}

                <span
                  className="
                    mb-5
                    text-sm
                    font-medium
                    text-white/70
                  "
                >
                  {weather.time}
                </span>

                {/* =================================================
                    PUNTO DE LA TIMELINE
                ================================================== */}

                <div
                  className="
                    relative
                    z-10
                    mb-5
                    flex
                    h-3
                    w-3
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    ring-4
                    ring-slate-950/50
                  "
                />

                {/* =================================================
                    ICONO
                ================================================== */}

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/10
                    text-white/80
                  "
                >
                  <WeatherIcon
                    condition={weather.condition}
                    isNight={night}
                  />
                </div>

                {/* =================================================
                    TEMPERATURA
                ================================================== */}

                <span
                  className="
                    mt-3
                    text-xl
                    font-medium
                  "
                >
                  {weather.temperature}°
                </span>

                {/* =================================================
                    CONDICIÓN
                ================================================== */}

                <span
                  className="
                    mt-1
                    text-center
                    text-xs
                    leading-4
                    text-white/40
                  "
                >
                  {getConditionLabel(
                    weather.condition,
                  )}
                </span>

                {/* =================================================
                    DATOS EXTRA
                ================================================== */}

                <div
                  className="
                    mt-4
                    space-y-2
                    text-xs
                    text-white/30
                  "
                >
                  {weather.precipitationProbability !==
                    undefined && (
                    <div className="flex items-center gap-1.5">
                      <Droplets size={12} />

                      <span>
                        {
                          weather.precipitationProbability
                        }
                        %
                      </span>
                    </div>
                  )}

                  {weather.humidity !==
                    undefined && (
                    <div className="flex items-center gap-1.5">
                      <Droplets size={12} />

                      <span>
                        {weather.humidity}%
                      </span>
                    </div>
                  )}

                  {weather.windSpeed !==
                    undefined && (
                    <div className="flex items-center gap-1.5">
                      <Wind size={12} />

                      <span>
                        {weather.windSpeed} km/h
                      </span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
