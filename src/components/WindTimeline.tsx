import type { WeatherDay } from "../types/weather";

interface WindTimelineProps {
  hours: WeatherDay["hours"];
}

export default function WindTimeline({
  hours,
}: WindTimelineProps) {
  if (!hours || hours.length === 0) {
    return (
      <div
        className="
          flex
          min-h-32
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/5
          text-sm
          text-white/40
        "
      >
        No hay datos de viento disponibles.
      </div>
    );
  }

  /*
   * Mostramos una medición cada 2 horas.
   */

  const timelineHours = hours.filter(
    (_, index) => index % 2 === 0,
  );

  return (
    <div
      className="
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-black/10
      "
    >
      {timelineHours.map(
        (hour, index) => (
          <div
            key={`${hour.datetime}-${index}`}
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/5
              px-5
              py-4
              last:border-b-0
            "
          >
            {/* Hora */}

            <span
              className="
                text-sm
                font-medium
                text-white/50
              "
            >
              {hour.datetime.slice(0, 5)}
            </span>

            {/* Viento */}

            <div
              className="
                flex
                items-baseline
                gap-1
              "
            >
              <span
                className="
                  text-xl
                  font-light
                  text-white
                "
              >
                {hour.windSpeed ?? 0}
              </span>

              <span
                className="
                  text-xs
                  text-white/30
                "
              >
                km/h
              </span>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
