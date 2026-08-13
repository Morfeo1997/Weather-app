import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useRef } from "react";
import type { City } from "../data/cities";

interface CityCardProps {
  city: City;
  onClick?: (city: City) => void;
}

export default function CityCard({ city, onClick }: CityCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: -8,
      scale: 1.02,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleClick = () => {
    gsap.to(cardRef.current, {
      scale: 0.97,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => onClick?.(city),
    });
  };

  const Icon = city.icon;

  return (
    <button
  		ref={cardRef}
  		type="button"
  		onClick={handleClick}
  		onMouseEnter={handleMouseEnter}
  		onMouseLeave={handleMouseLeave}
  		className="
    		group
    		relative
    		flex
    		h-full
    		w-full
    		min-h-64
    		flex-col
    		overflow-hidden
    		rounded-3xl
    		border
    		border-white/20
    		bg-white/10
    		p-6
    		text-left
    		shadow-xl
    		backdrop-blur-xl
    		transition-colors
    		duration-300
    		hover:bg-white/15
    		focus:outline-none
    		focus:ring-2
    		focus:ring-white/60
  		"
		>
      {/* Decorative gradient */}
      <div
        className={`
          absolute
          -right-12
          -top-12
          h-40
          w-40
          rounded-full
          bg-gradient-to-br
          ${city.accent}
          opacity-30
          blur-2xl
          transition-transform
          duration-500
          group-hover:scale-150
        `}
      />

      {/* Icon */}
      <div className="relative mb-12 flex items-center justify-between">
        <div className="rounded-2xl bg-white/10 p-3">
          <Icon
            size={30}
            strokeWidth={1.5}
            className="text-white"
          />
        </div>

        <ArrowUpRight
          size={24}
          className="
            text-white/50
            transition-all
            duration-300
            group-hover:-translate-y-1
            group-hover:translate-x-1
            group-hover:text-white
          "
        />
      </div>

      {/* City information */}
		<div className="mt-auto">
    		<p className="mb-1 text-sm text-white/50">
      		{city.country}
    		</p>
		
    		<h2 className="text-2xl font-medium tracking-tight text-white">
      		{city.name}
    		</h2>
		
    		<p className="mt-2 text-sm text-white/60">
      		{city.description}
    		</p>
  		</div>
    </button>
  );
}
