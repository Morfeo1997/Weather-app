import {
  ArrowLeft,
} from "lucide-react";

import type {
  WeatherCondition,
  WeatherDay,
  WeatherHour,
} from "../types/weather";

interface HourlyWeatherProps {
  day: WeatherDay;
  hours: WeatherHour[];
  onClose?: () => void;
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

export default function HourlyWeather({
  day,
  hours,
  onClose,
}: HourlyWeatherProps) {
  /*
   * =====================================================
   * MOSTRAR UNA MEDICIÓN CADA 2 HORAS
   * =====================================================
   */

	const timelineHours = hours.filter(
  	(hour) => {
    	const hourNumber = Number(
      	hour.datetime.slice(0, 2),
    	);
	
    	return hourNumber % 2 === 0;
  	},
	);

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
        "
      >
        <div
          className="
            relative
            flex
            min-w-max
            px-8
            pb-2
            pt-4
          "
        >
          {/* =================================================
              LÍNEA
          ================================================== */}

          <div
            className="
              absolute
              left-8
              right-8
              top-[76px]
              h-px
              bg-white/20
            "
          />

          {timelineHours.map(
            (weather, index) => {
              const isLast =
                index ===
                timelineHours.length - 1;

              return (
                <div
                  key={`${day.date}-${weather.datetime}`}
                  className="
                    relative
                    flex
                    w-32
                    flex-col
                    items-center
                  "
                >
                  {/* =========================================
                      TEMPERATURA
                  ========================================== */}

                  <div
                    className="
                      mb-4
                      text-xl
                      font-medium
                      tracking-tight
                    "
                  >
                    {weather.temperature}°
                  </div>

                  {/* =========================================
                      PUNTO
                  ========================================== */}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-3
                      w-3
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      shadow-[0_0_12px_rgba(255,255,255,0.35)]
                    "
                  />

                  {/* =========================================
                      HORA
                  ========================================== */}

                  <div
                    className="
                      mt-4
                      text-sm
                      font-medium
                      text-white/60
                    "
                  >
                    {weather.datetime.slice(
                      0,
                      5,
                    )}
                  </div>

                  {/* =========================================
                      CONDICIÓN
                  ========================================== */}

                  <div
                    className="
                      mt-1
                      max-w-24
                      text-center
                      text-[10px]
                      text-white/30
                    "
                  >
                    {getConditionLabel(
                      weather.condition,
                    )}
                  </div>

                  {/* =========================================
                      SEPARADOR VISUAL
                  ========================================== */}

                  {!isLast && (
                    <div
                      className="
                        pointer-events-none
                        absolute
                        left-1/2
                        top-[72px]
                        h-[9px]
                        w-32
                      "
                    />
                  )}
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
