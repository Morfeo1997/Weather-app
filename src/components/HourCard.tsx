import { useState } from "react";
import TemperatureTimeline from "./TemperatureTimeline";
import RainfallTimeline from "./RainfallTimeline";
import WindTimeline from "./WindTimeline";

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
  
 	console.log("DAY:", day);
	console.log("HOURS:", hours);
	console.log("FIRST HOUR:", hours[0]);
	
	console.log(
  	"HAS PRECIPITATION:",
  	hours.some(
    	(hour) =>
      	typeof hour.precipitationProbability === "number",
  	),
	);
	
	console.log(
  	"HAS WIND:",
  	hours.some(
    	(hour) =>
      	typeof hour.windSpeed === "number",
  	),
	);

  /*
   * =====================================================
   * BOTONES DISPONIBLES
   *
   * De momento siempre mostramos los tres.
   * Más adelante podemos ocultar una opción si la API
   * no devuelve los datos necesarios.
   * =====================================================
   */
	
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

	<div className="flex items-center justify-center gap-2">
  	<button
    	type="button"
    	onClick={() => setActiveView("temperature")}
    	className={`rounded-full px-4 py-2 text-sm transition ${
      	activeView === "temperature"
        	? "bg-white text-black"
        	: "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"
    	}`}
  	>
    	Temperatura
  	</button>
	
  	<button
    	type="button"
    	onClick={() => setActiveView("precipitation")}
    	className={`rounded-full px-4 py-2 text-sm transition ${
      	activeView === "precipitation"
        	? "bg-white text-black"
        	: "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"
    	}`}
  	>
    	Precipitaciones
  	</button>
	
  	<button
    	type="button"
    	onClick={() => setActiveView("wind")}
    	className={`rounded-full px-4 py-2 text-sm transition ${
      	activeView === "wind"
        	? "bg-white text-black"
        	: "bg-white/10 text-white/60 hover:bg-white/15 hover:text-white"
    	}`}
  	>
    	Viento
  	</button>
	</div>

      {/* =================================================
          CONTENIDO
      ================================================== */}

      	<div className="mt-8">
  			<pre className="text-xs text-white">
    			{JSON.stringify(hours[0], null, 2)}
  			</pre>
			
  			{activeView === "temperature" && (
    			<TemperatureTimeline hours={hours} />
  			)}
			
  			{activeView === "precipitation" && (
    			<RainfallTimeline hours={hours} />
  			)}
			
  			{activeView === "wind" && (
    			<WindTimeline hours={hours} />
  			)}
		</div>
    </div>
  );
}
