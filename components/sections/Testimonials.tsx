"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  img: string;
  text: string;
  name: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    img: "/images/clientes/cliente-1.jpg",
    text: "El empaque y el brillo hicieron que se sintiera mucho más especial de lo esperado.",
    name: "CLIENTE EN AREQUIPA",
  },
  {
    id: 2,
    img: "/images/clientes/cliente-9.jpg",
    text: "El grabado quedó impecable y el seguimiento por WhatsApp fue sumamente claro.",
    name: "CLIENTE EN TRUJILLO",
  },
  {
    id: 3,
    img: "/images/clientes/cliente-13.jpg",
    text: "La pieza llegó lista para regalar, con acabado delicado y asesoría rápida.",
    name: "CLIENTE EN LIMA",
  },
  {
    id: 4,
    img: "/images/clientes/cliente-11.jpg",
    text: "Excelente atención y una presentación que verdaderamente denota lujo y exclusividad.",
    name: "CLIENTE EN MIRAFLORES",
  },
  {
    id: 5,
    img: "/images/clientes/cliente-6.jpg",
    text: "La calidad de la joya es insuperable y el empaque premium superó mis expectativas.",
    name: "CLIENTE EN SAN ISIDRO",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(2); // Initial center highlighted card (cliente-13 / LIMA)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardWidth = isMobile ? 176 : 190;
  const gap = isMobile ? 12 : 20;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  // Autoplay effect - resets the timer whenever the activeIndex changes (e.g. on manual interaction)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000); // Transitions every 5 seconds
    return () => clearInterval(timer);
  }, [activeIndex]);

  // Helper to get relative scale class for carousel items
  const getItemClass = (index: number) => {
    if (index === activeIndex) {
      return "scale-100 md:scale-110 z-10 border border-[var(--gold)] shadow-xl opacity-100 ring-4 ring-[rgba(201,168,76,0.15)]";
    }
    return "scale-90 md:scale-95 z-0 opacity-60 hover:opacity-85 border border-transparent shadow-md";
  };

  return (
    <section 
      className="relative overflow-hidden px-4 py-20 md:py-28"
      style={{
        backgroundColor: "#fbf9f4", // Light cream beige
        backgroundImage: "repeating-linear-gradient(135deg, rgba(201, 168, 76, 0.03) 0px, rgba(201, 168, 76, 0.03) 1px, transparent 1px, transparent 18px)"
      }}
    >
      <div className="mx-auto max-w-6xl text-center">
        {/* Kicker */}
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.28em] text-[var(--gold)]">
          Clientes
        </p>

        {/* Golden Ornament */}
        <div className="flex items-center justify-center gap-3 mt-3 mb-8">
          <div className="h-[0.5px] w-12 bg-[var(--gold)] opacity-50" />
          <svg className="w-2.5 h-2.5 text-[var(--gold)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
          </svg>
          <div className="h-[0.5px] w-12 bg-[var(--gold)] opacity-50" />
        </div>

        {/* Testimonial Quote Area */}
        <div className="relative mx-auto max-w-3xl px-8 md:px-14 min-h-[140px] md:min-h-[180px] flex flex-col justify-center">
          {/* Large decorative quotes */}
          <span 
            className="absolute left-0 top-0 select-none font-display text-7xl md:text-9xl leading-none text-[var(--gold)] opacity-[0.15]"
            style={{ transform: "translateY(-10px)" }}
          >
            “
          </span>
          
          <blockquote className="font-display text-xl sm:text-2xl md:text-3xl leading-relaxed text-[#2d2d2d] transition-all duration-500 ease-in-out">
            {currentTestimonial.text}
          </blockquote>

          <span 
            className="absolute right-0 bottom-0 select-none font-display text-7xl md:text-9xl leading-none text-[var(--gold)] opacity-[0.15]"
            style={{ transform: "translateY(30px)" }}
          >
            ”
          </span>
        </div>

        {/* Client Name & Location */}
        <p className="mt-8 text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-[#7c7772] transition-all duration-500 ease-in-out">
          {currentTestimonial.name}
        </p>

        {/* Carousel Visual Area */}
        <div className="relative mt-16 mx-auto max-w-5xl flex items-center justify-center px-4">
          
          {/* Navigation Left */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] border-opacity-40 bg-white bg-opacity-70 text-[var(--gold)] backdrop-blur-sm transition-all hover:bg-white hover:border-opacity-100 hover:scale-105 active:scale-95 shadow-sm"
            aria-label="Anterior"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>

          {/* Cards Track */}
          <div className="w-full overflow-hidden py-4">
            <div 
              className="flex flex-row flex-nowrap justify-start items-center gap-3 md:gap-5 min-h-[320px] transition-transform duration-500 cubic-bezier(0.25, 1, 0.5, 1)"
              style={{
                transform: `translateX(calc(50% - (${cardWidth}px / 2) - (${activeIndex} * (${cardWidth}px + ${gap}px))))`
              }}
            >
              {testimonials.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={`relative w-44 h-64 md:w-[190px] md:h-[270px] rounded-2xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer flex-shrink-0 ${getItemClass(index)}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {/* Dark/Warm overlay for inactive items */}
                    {index !== activeIndex && (
                      <div 
                        className="absolute inset-0 z-10 transition-opacity duration-500" 
                        style={{ backgroundColor: "rgba(61, 51, 35, 0.15)" }}
                      />
                    )}
                    
                    {/* Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Right */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] border-opacity-40 bg-white bg-opacity-70 text-[var(--gold)] backdrop-blur-sm transition-all hover:bg-white hover:border-opacity-100 hover:scale-105 active:scale-95 shadow-sm"
            aria-label="Siguiente"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>

        {/* Indicators / Pagination Dots */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? "bg-[var(--gold)] scale-125" 
                  : "bg-[#7c7772] opacity-30 hover:opacity-50"
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
