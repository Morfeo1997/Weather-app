import { useMemo, useState } from "react";
import HourlyWeather from "./HourlyWeather";

import type {
  WeatherDay,
} from "../types/weather";

interface WeatherCardsProps {
  days: WeatherDay[];
}

export default function WeatherCards({
  days,
}: WeatherCardsProps) {
  const [
    selectedDay,
    setSelectedDay,
  ] = useState<WeatherDay | null>(null);

  /*
   * =====================================================
   * HORAS DEL DÍA SELECCIONADO
   *
   * Si seleccionamos hoy:
   * empezamos desde la hora actual.
   *
   * Si seleccionamos un día futuro:
   * mostramos todo el día.
   * =====================================================
   */

  const visibleHours = useMemo(() => {
    if (!selectedDay) {
      return [];
    }

    const today = new Date();

    const todayDate =
      today.toISOString().split("T")[0];

    const isToday =
      selectedDay.date === todayDate;

    if (!isToday) {
      return selectedDay.hours;
    }

    const currentHour =
      today.getHours();

    return selectedDay.hours.filter(
      (hour) =>
        hour.datetimeEpoch >=
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          currentHour,
        ).getTime() /
          1000,
    );
  }, [selectedDay]);

  return (
    <div className="w-full">
      {/* =====================================================
          TIMELINE HORARIA
          Aparece encima de las cards
      ====================================================== */}

      {selectedDay && (
        <div className="mb-6">
          <HourlyWeather
            day={selectedDay}
            hours={visibleHours}
            onClose={() =>
              setSelectedDay(null)
            }
          />
        </div>
      )}

      {/* =====================================================
          CARDS
      ====================================================== */}

      <div
        className="
          flex
          w-full
          gap-4
          overflow-x-auto
          pb-4
          scrollbar-none
        "
      >
        {days.map((day) => {
          const isSelected =
            selectedDay?.date === day.date;

          return (
            <button
              key={day.date}
              type="button"
              onClick={() =>
                setSelectedDay(day)
              }
              className={`
                group
                flex
                h-52
                w-40
                shrink-0
                flex-col
                justify-between
                rounded-3xl
                border
                p-5
                text-left
                text-white
                backdrop-blur-xl
                transition-all
                duration-300

                ${
                  isSelected
                    ? `
                      border-white/30
                      bg-white/20
                      -translate-y-1
                    `
                    : `
                      border-white/10
                      bg-white/10
                      hover:-translate-y-1
                      hover:bg-white/15
                    `
                }
              `}
            >
              {/* =================================================
                  FECHA
              ================================================== */}

              <div>
                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-white/40
                  "
                >
                  {day.day}
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-white/60
                  "
                >
                  {day.date}
                </p>
              </div>

              {/* =================================================
                  CONDICIÓN
              ================================================== */}

              <div>
                <p
                  className="
                    text-sm
                    text-white/70
                  "
                >
                  {day.condition}
                </p>
              </div>

              {/* =================================================
                  TEMPERATURAS
              ================================================== */}

              <div
                className="
                  flex
                  items-end
                  gap-2
                "
              >
                <span
                  className="
                    text-3xl
                    font-light
                  "
                >
                  {day.maxTemperature}°
                </span>

                <span
                  className="
                    mb-1
                    text-sm
                    text-white/40
                  "
                >
                  {day.minTemperature}°
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
