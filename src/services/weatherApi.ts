import type {
  WeatherCondition,
  WeatherData,
  WeatherDay,
  WeatherHour,
} from "../types/weather";

const API_KEY =
  import.meta.env.VITE_VISUAL_CROSSING_API_KEY;


const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

interface VisualCrossingHour {
  datetime: string;
  datetimeEpoch: number;

  temp: number;

  conditions: string;

  precipprob: number;

  humidity: number;

  windspeed: number;
}

interface VisualCrossingDay {
  datetime: string;

  tempmax: number;
  tempmin: number;

  conditions: string;

  hours: VisualCrossingHour[];
}

interface VisualCrossingCurrent {
  temp: number;

  conditions: string;

  humidity: number;

  windspeed: number;

  sunrise: string;
  sunset: string;
}

interface VisualCrossingResponse {
  resolvedAddress: string;

  timezone: string;

  currentConditions: VisualCrossingCurrent;

  days: VisualCrossingDay[];
}

function mapCondition(
  condition: string,
): WeatherCondition {
  const normalized =
    condition.toLowerCase();

  if (
    normalized.includes("thunder")
  ) {
    return "storm";
  }

  if (
    normalized.includes("snow")
  ) {
    return "snow";
  }

  if (
    normalized.includes("rain") ||
    normalized.includes("drizzle") ||
    normalized.includes("showers")
  ) {
    return "rain";
  }

  if (
    normalized.includes("wind")
  ) {
    return "wind";
  }

  if (
    normalized === "clear"
  ) {
    return "sunny";
  }

  if (
    normalized.includes("partially cloudy")
  ) {
    return "partly-cloudy";
  }

  if (
    normalized.includes("cloud")
  ) {
    return "cloudy";
  }

  return "partly-cloudy";
}

function getDayName(date: string) {
  const parsedDate = new Date(
    `${date}T12:00:00`,
  );

  return new Intl.DateTimeFormat(
    "es",
    {
      weekday: "short",
    },
  )
    .format(parsedDate)
    .replace(".", "");
}

function mapHour(
  hour: VisualCrossingHour,
): WeatherHour {
  return {
    datetime: hour.datetime,

    datetimeEpoch:
      hour.datetimeEpoch,

    temperature: Math.round(
      hour.temp,
    ),

    condition: mapCondition(
      hour.conditions,
    ),

    precipitationProbability:
      hour.precipprob ?? 0,

    humidity:
      hour.humidity ?? 0,

    windSpeed:
      hour.windspeed ?? 0,
  };
}

function mapDay(
  	day: VisualCrossingDay,
	): WeatherDay {
  	return {
    	date: day.datetime,
	
    	day: getDayName(
      	day.datetime,
    	),
	
    	condition: mapCondition(
      	day.conditions,
    	),
	
    	maxTemperature: Math.round(
      	day.tempmax,
    	),
	
    	minTemperature: Math.round(
      	day.tempmin,
    	),
	
    	hours: (day.hours ?? []).map(
      	mapHour,
    	),
  	};
	}

export async function getWeather(
  location: string,
): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error(
      "Falta VITE_VISUAL_CROSSING_API_KEY en el archivo .env",
    );
  }

  const params =
    new URLSearchParams({
      unitGroup: "metric",
      key: API_KEY,
      contentType: "json",
      include: "current,days",
    });

  const url =
    `${BASE_URL}/${encodeURIComponent(
      location,
    )}?${params.toString()}`;

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Visual Crossing respondió con ${response.status}`,
    );
  }

  const data: VisualCrossingResponse =
    await response.json();
    
    console.log(
  	"Visual Crossing response:",
  	data,
	);

  return {
    city: location,

    resolvedAddress:
      data.resolvedAddress,

    timezone:
      data.timezone,

    current: {
      temperature:
        Math.round(
          data.currentConditions.temp,
        ),

      condition:
        mapCondition(
          data.currentConditions.conditions,
        ),

      humidity:
        data.currentConditions.humidity,

      windSpeed:
        data.currentConditions.windspeed,

      sunrise:
        data.currentConditions.sunrise,

      sunset:
        data.currentConditions.sunset,
    },

    days: data.days
      .slice(0, 7)
      .map(mapDay),
  };
}
