import { X } from "lucide-react";

import HourCard from "./HourCard";

import type { WeatherDay } from "../types/weather";

interface HourlyWeatherProps {
  day: WeatherDay | null;
  onClose: () => void;
}

export default function HourlyWeather({
  day,
  onClose,
}: HourlyWeatherProps) {
  /*
   * =====================================================
   * Si no hay día seleccionado, no mostramos nada
   * =====================================================
   */

  if (!day) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
        sm:p-6
      "
    >
      {/* =================================================
          BACKDROP
      ================================================== */}

      <button
        type="button"
        aria-label="Cerrar ventana"
        onClick={onClose}
        className="
          absolute
          inset-0
          cursor-default
          bg-black/50
          backdrop-blur-sm
        "
      />

      {/* =================================================
          MODAL
      ================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-5xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* =================================================
            BOTÓN CERRAR
        ================================================== */}

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar pronóstico"
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/20
            text-white/60
            backdrop-blur-md
            transition
            hover:bg-white/10
            hover:text-white
          "
        >
          <X size={20} />
        </button>

        {/* =================================================
            CONTENIDO
        ================================================== */}

        <HourCard day={day} />
      </div>
    </div>
  );
}
