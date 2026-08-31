import {
  CloudRain,
  Thermometer,
  Wind,
} from "lucide-react";
import { useState } from "react";
import TemperatureTimeline from "./TemperatureTimeline";

import type {
  WeatherDay,
} from "../types/weather";

interface HourCardProps {
  day: WeatherDay;
}

type WeatherView =
  | "temperature"
  | "precipitation"
  | "wind";

export default function HourCard({
  day,
}: HourCardProps) {
  /*
   * =====================================================
   * ESTADO
   * =====================================================
   */

  const [activeView, setActiveView] =
    useState<WeatherView>("temperature");

  /*
   * =====================================================
   * DATOS HORARIOS
   * =====================================================
   */

  const hours = day.hours ?? [];

  /*
   * =====================================================
   * BOTONES DISPONIBLES
   *
   * De momento siempre mostramos los tres.
   * Más adelante podemos ocultar una opción si la API
   * no devuelve los datos necesarios.
   * =====================================================
   */

  const hasPrecipitation =
    hours.some(
      (hour) =>
        hour.precipitationProbability !==
        undefined,
    );

  const hasWind =
    hours.some(
      (hour) =>
        hour.windSpeed !== undefined,
    );

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <div
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
      {/* =================================================
          DÍA
      ================================================== */}

      <header
        className="
          mb-6
          text-center
        "
      >
        <p
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-white/40
          "
        >
          Pronóstico horario
        </p>

        <h2
          className="
            mt-2
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
      </header>

      {/* =================================================
          SELECTOR
      ================================================== */}

      <div
        className="
          mx-auto
          flex
          w-fit
          flex-wrap
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-white/10
          bg-black/10
          p-1.5
        "
      >
        {/* Temperatura */}

        <button
          type="button"
          onClick={() =>
            setActiveView("temperature")
          }
          className={`
            flex
            items-center
            gap-2
            rounded-xl
            px-4
            py-2.5
            text-sm
            transition-all
            duration-200

            ${
              activeView === "temperature"
                ? "bg-white/15 text-white"
                : "text-white/40 hover:text-white/70"
            }
          `}
        >
          <Thermometer size={16} />

          <span>
            Temperatura
          </span>
        </button>

        {/* Precipitaciones */}

        {hasPrecipitation && (
          <button
            type="button"
            onClick={() =>
              setActiveView(
                "precipitation",
              )
            }
            className={`
              flex
              items-center
              gap-2
              rounded-xl
              px-4
              py-2.5
              text-sm
              transition-all
              duration-200

              ${
                activeView ===
                "precipitation"
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/70"
              }
            `}
          >
            <CloudRain size={16} />

            <span>
              Precipitaciones
            </span>
          </button>
        )}

        {/* Viento */}

        {hasWind && (
          <button
            type="button"
            onClick={() =>
              setActiveView("wind")
            }
            className={`
              flex
              items-center
              gap-2
              rounded-xl
              px-4
              py-2.5
              text-sm
              transition-all
              duration-200

              ${
                activeView === "wind"
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/70"
              }
            `}
          >
            <Wind size={16} />

            <span>
              Viento
            </span>
          </button>
        )}
      </div>

      {/* =================================================
          CONTENIDO
      ================================================== */}

      <div className="mt-8">
        {activeView === "temperature" && (
  			<TemperatureTimeline
    			hours={hours}
  			/>
		)}

        {activeView ===
          "precipitation" &&
          hasPrecipitation && (
            <PrecipitationView
              hours={hours}
            />
          )}

        {activeView === "wind" &&
          hasWind && (
            <WindView
              hours={hours}
            />
          )}
      </div>
    </div>
  );
}

/*
 * =======================================================
 * TEMPERATURA
 * =======================================================
 */

function TemperatureView({
  hours,
}: {
  hours: WeatherDay["hours"];
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-6
      "
    >
      {hours.map((hour) => (
        <div
          key={hour.datetime}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            text-center
          "
        >
          <p
            className="
              text-xs
              text-white/40
            "
          >
            {hour.datetime.slice(
              0,
              5,
            )}
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-light
            "
          >
            {hour.temperature}°
          </p>
        </div>
      ))}
    </div>
  );
}

/*
 * =======================================================
 * PRECIPITACIONES
 * =======================================================
 */

function PrecipitationView({
  hours,
}: {
  hours: WeatherDay["hours"];
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-6
      "
    >
      {hours.map((hour) => (
        <div
          key={hour.datetime}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            text-center
          "
        >
          <p
            className="
              text-xs
              text-white/40
            "
          >
            {hour.datetime.slice(
              0,
              5,
            )}
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-light
            "
          >
            {hour.precipitationProbability ??
              0}
            %
          </p>

          <p
            className="
              mt-1
              text-xs
              text-white/30
            "
          >
            probabilidad
          </p>
        </div>
      ))}
    </div>
  );
}

/*
 * =======================================================
 * VIENTO
 * =======================================================
 */

function WindView({
  hours,
}: {
  hours: WeatherDay["hours"];
}) {
  return (
    <div
      className="
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-6
      "
    >
      {hours.map((hour) => (
        <div
          key={hour.datetime}
          className="
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            text-center
          "
        >
          <p
            className="
              text-xs
              text-white/40
            "
          >
            {hour.datetime.slice(
              0,
              5,
            )}
          </p>

          <p
            className="
              mt-2
              text-2xl
              font-light
            "
          >
            {hour.windSpeed ?? 0}
          </p>

          <p
            className="
              mt-1
              text-xs
              text-white/30
            "
          >
            km/h
          </p>
        </div>
      ))}
    </div>
  );
}
