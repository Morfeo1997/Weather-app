export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rain"
  | "storm"
  | "snow"
  | "wind";

export interface WeatherHour {
  datetime: string;
  datetimeEpoch: number;

  temperature: number;

  condition: WeatherCondition;

  precipitationProbability: number;

  humidity: number;

  windSpeed: number;
}

export interface WeatherDay {
  date: string;
  day: string;

  condition: WeatherCondition;

  maxTemperature: number;
  minTemperature: number;

  hours: WeatherHour[];
}

export interface CurrentWeather {
  temperature: number;

  condition: WeatherCondition;

  humidity: number;

  windSpeed: number;

  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  city: string;

  resolvedAddress: string;

  timezone: string;

  current: CurrentWeather;

  days: WeatherDay[];
}
