import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Heart } from "lucide-react";

import CityCard from "../components/home/CityCard";
import MusicPlayer from "../components/MusicPlayer";
import { cities, type City } from "../data/cities";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const musicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(titleRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.8,
        })
        .from(
          ".city-card",
          {
            opacity: 0,
            y: 40,
            scale: 0.95,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.4",
        )
        .from(
          musicRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
          },
          "-=0.3",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCityClick = (city: City) => {
    console.log("Ciudad seleccionada:", city.name);

    // Más adelante:
    // navigate(`/weather/${city.id}`);
  };

  return (
    <main
      ref={containerRef}
      className="
        min-h-screen
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-1/2
            top-[-20%]
            h-125
            w-125
            -translate-x-1/2
            rounded-full
            bg-orange-400/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-[-20%]
            right-[-10%]
            h-100
            w-100
            rounded-full
            bg-sky-400/10
            blur-[120px]
          "
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6">
        {/* Header */}
        <header className="pt-12 text-center md:pt-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            Weather experience
          </p>

          <h1
            ref={titleRef}
            className="
              text-5xl
              font-semibold
              tracking-[-0.04em]
              md:text-7xl
            "
          >
            ¿Qué clima hace?
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/50 md:text-base">
            Elegí una ciudad y descubrí las condiciones climáticas
            en tiempo real.
          </p>
        </header>

        {/* Cities */}
        <section
          ref={cardsRef}
          className="grid flex-1 content-center gap-5 py-16 md:grid-cols-3"
        >
          {cities.map((city) => (
            <div key={city.id} className="city-card">
              <CityCard
                city={city}
                onClick={handleCityClick}
              />
            </div>
          ))}
        </section>

        {/* Music */}
        <section
          ref={musicRef}
          className="mx-auto mb-12 w-full max-w-2xl"
        >
          <MusicPlayer />
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 md:flex-row">
          <p className="flex items-center gap-1.5">
            Hecho con
            <Heart size={12} fill="currentColor" />
            para el clima
          </p>

          <p>
            © {new Date().getFullYear()} Tu Nombre
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="transition-colors hover:text-white"
            >
              GitHub
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white"
            >
              Portfolio
            </a>
		{/*
            <a
              href="#"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
              aria-label="GitHub"
            >
            
              <Github size={15} />
            </a>
            
            */}
          </div>
        </footer>
      </div>
    </main>
  );
}
