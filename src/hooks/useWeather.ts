import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getWeather,
} from "../services/weatherApi";

import type {
  WeatherData,
} from "../types/weather";

interface UseWeatherReturn {
  weather: WeatherData | null;

  loading: boolean;

  error: string | null;

  refetch: () => void;
}

export function useWeather(
  location: string,
): UseWeatherReturn {
  const [
    weather,
    setWeather,
  ] = useState<WeatherData | null>(
    null,
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null,
  );

  const fetchWeather =
    useCallback(async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await getWeather(
            location,
          );

        setWeather(data);
      } catch (error) {
        console.error(
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "No se pudo obtener el clima.",
        );
      } finally {
        setLoading(false);
      }
    }, [location]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return {
    weather,
    loading,
    error,
    refetch: fetchWeather,
  };
}
