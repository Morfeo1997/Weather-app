import type { WeatherDay } from "../types/weather";

interface TemperatureTimelineProps {
  hours: WeatherDay["hours"];
}

export default function TemperatureTimeline({
  hours,
}: TemperatureTimelineProps) {
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
        No hay datos horarios disponibles.
      </div>
    );
  }

  /*
   * Mostramos una medición cada 2 horas.
   *
   * Como Visual Crossing devuelve las horas
   * ordenadas cronológicamente, tomamos:
   *
   * 16:00
   * 18:00
   * 20:00
   * ...
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

            {/* Temperatura */}

            <span
              className="
                text-xl
                font-light
                text-white
              "
            >
              {hour.temperature}°
            </span>
          </div>
        ),
      )}
    </div>
  );
}
