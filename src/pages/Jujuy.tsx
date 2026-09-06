import {
  ArrowLeft,
  CloudSun,
  MapPin,
} from "lucide-react";

import { Link } from "react-router-dom";

import SkyScene from "../components/SkyScene";
import WeatherCards from "../components/WeatherCards";

import { useWeather } from "../hooks/useWeather";

export default function JujuyPage() {
  const {
    weather,
    loading,
    error,
  } = useWeather(
    "San Salvador de Jujuy, Argentina",
  );

   // ==========================================
   // CARGANDO
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
       <SkyScene
         sunrise={weather.current.sunrise}
         sunset={weather.current.sunset}
       />
 
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
         <header
           className="
             flex
             items-center
             justify-between
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
               text-sm
               text-white/60
             "
           >
             <MapPin size={15} />
 
             {weather.resolvedAddress}
           </div>
         </header>
 
         <section
           className="
             flex
             flex-1
             flex-col
             items-center
             justify-center
             text-center
           "
         >
           <div
             className="
               mb-4
               flex
               inline
               bg-linear-to-r from-jujuy-1 via-jujuy-3 via-jujuy-4 via-jujuy-5 to-jujuy-6 bg-clip-text text-transparent
               items-center
               gap-2
               text-sm
               uppercase
               tracking-[0.25em]
               text-white/50
             "
           >
             <CloudSun size={18} />
 
             {weather.current.condition}
           </div>
 
           <h1
             className="
               inline
               bg-linear-to-r from-jujuy-6 via-jujuy-4 via-jujuy-2 via-jujuy-3 via-jujuy-1 to-jujuy-5 bg-clip-text text-transparent
               text-6xl
               font-semibold
               tracking-[-0.05em]
               md:text-8xl
             "
           >
             San Salvador de Jujuy
           </h1>
 
           <div
             className="
               mt-8
               inline
               bg-linear-to-r from-jujuy-3 via-jujuy-2 via-jujuy-1 via-jujuy-5 via-jujuy-4 to-jujuy-6 bg-clip-text text-transparent
               text-7xl
               font-light
               tracking-[-0.05em]
               md:text-9xl
             "
           >
             {weather.current.temperature}°
           </div>
         </section>
 
         <div className="pb-10">
           <WeatherCards
             days={weather.days}
           />
         </div>
       </div>
     </main>
   );
 }
