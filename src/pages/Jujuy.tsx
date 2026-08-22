import {
  ArrowLeft,
  CloudSun,
  Droplets,
  MapPin,
  Wind,
} from "lucide-react";
import { Link } from "react-router-dom";

import SkyScene from "../components/SkyScene";
import WeatherCards from "../components/WeatherCard";
import { useWeather } from "../hooks/useWeather";

export default function JujuyPage() {
  const {
    weather,
    loading,
    error,
  } = useWeather("San Salvador de Jujuy, Argentina");

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-950
          text-white
        "
      >
        <p className="text-white/50">
          Cargando clima...
        </p>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-slate-950
          text-white
        "
      >
        <div className="text-center">
          <p className="text-red-400">
            No se pudo obtener el clima.
          </p>

          <p className="mt-2 text-sm text-white/40">
            {error}
          </p>

          <Link
            to="/"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              text-white/70
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={16} />
            Volver
          </Link>
        </div>
      </main>
    );
  }

  // ==========================================
  // SEGURIDAD PARA TYPESCRIPT
  // ==========================================

  if (!weather) {
    return null;
  }

  // ==========================================
  // PÁGINA
  // ==========================================

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* ========================================
          CIELO / SOL / LUNA
      ========================================= */}

      <SkyScene
        sunrise={weather.current.sunrise}
        sunset={weather.current.sunset}
      />

      {/* ========================================
          CONTENIDO
      ========================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-6xl
          flex-col
          px-6
        "
      >
        {/* ======================================
            HEADER
        ======================================= */}

        <header
          className="
            flex
            items-center
            justify-between
            gap-4
            pt-8
          "
        >
          <Link
            to="/"
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-black/10
              px-4
              py-2
              text-sm
              text-white/70
              backdrop-blur-md
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <ArrowLeft size={16} />

            Volver
          </Link>

          <div
            className="
              flex
              items-center
              gap-2
              text-right
              text-sm
              text-white/60
            "
          >
            <MapPin size={15} />

            <span>
              {weather.resolvedAddress}
            </span>
          </div>
        </header>

        {/* ======================================
            WEATHER PRINCIPAL
        ======================================= */}

        <section
          className="
            flex
            flex-1
            flex-col
            items-center
            justify-center
            py-16
            text-center
          "
        >
          {/* Condición */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-xs
              uppercase
              tracking-[0.25em]
              text-white/50
              backdrop-blur-md
            "
          >
            <CloudSun size={16} />

            {weather.current.condition}
          </div>

          {/* Ciudad */}

          <h1
            className="
              text-5xl
              font-semibold
              tracking-[-0.05em]
              sm:text-6xl
              md:text-8xl
            "
          >
            San Salvador
            <br />
            de Jujuy
          </h1>

          {/* Temperatura */}

          <div
            className="
              mt-8
              text-7xl
              font-extralight
              tracking-[-0.07em]
              sm:text-8xl
              md:text-9xl
            "
          >
            {weather.current.temperature}
            <span className="text-white/40">
              °
            </span>
          </div>

          {/* Datos actuales */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            {/* Humedad */}

            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                text-sm
                text-white/60
                backdrop-blur-md
              "
            >
              <Droplets
                size={16}
              />

              <span>
                {weather.current.humidity}%
              </span>
            </div>

            {/* Viento */}

            <div
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                text-sm
                text-white/60
                backdrop-blur-md
              "
            >
              <Wind
                size={16}
              />

              <span>
                {weather.current.windSpeed} km/h
              </span>
            </div>
          </div>
        </section>

        {/* ======================================
            PRONÓSTICO
        ======================================= */}

        <section
          className="
            pb-10
          "
        >
          <div
            className="
              mb-4
              flex
              items-end
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
                  text-white/30
                "
              >
                Pronóstico
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-medium
                  text-white/80
                "
              >
                Próximos días
              </h2>
            </div>

            <p
              className="
                text-xs
                text-white/30
              "
            >
              7 días
            </p>
          </div>

          <WeatherCards
            days={weather.days}
          />
        </section>
      </div>
    </main>
  );
}
