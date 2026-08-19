import {
  CloudSun,
  Sun,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}
{/*
export const cities: City[] = [
  {
    id: "salta",
    name: "Salta",
    country: "Argentina",
    description: "La Linda",
    icon: CloudSun,
    accent: "from-orange-400 to-amber-300",
  },
  {
    id: "jujuy",
    name: "San Salvador de Jujuy",
    country: "Argentina",
    description: "Ciudad de los Valles",
    icon: Sun,
    accent: "from-yellow-400 to-orange-300",
  },
  {
    id: "valencia",
    name: "Valencia",
    country: "España",
    description: "Ciudad del Turia",
    icon: Cloud,
    accent: "from-sky-400 to-cyan-300",
  },
];
*/}

export interface CityConfig {
  id: string;
  name: string;
  location: string;
  country: string;
}

export const cities: CityConfig[] = [
  {
    id: "salta",
    name: "Salta",
    location: "Salta, Argentina",
    country: "AR",
    description: "La Linda",
    icon: CloudSun,
    accent: "from-orange-400 to-amber-300",
  },
  {
    id: "jujuy",
    name: "San Salvador de Jujuy",
    location: "San Salvador de Jujuy, Argentina",
    country: "AR",
    description: "Ciudad de los Valles",
    icon: Sun,
    accent: "from-yellow-400 to-orange-300",
  },
  {
    id: "valencia",
    name: "Valencia",
    location: "Valencia, Spain",
    country: "ES",
    description: "Ciudad del Turia",
    icon: Cloud,
    accent: "from-sky-400 to-cyan-300",
  },
];
