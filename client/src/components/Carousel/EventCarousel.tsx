"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
}

interface EventCarouselProps {
  slides?: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const defaultSlides: CarouselSlide[] = [
  {
    id: 1,
    image: "/assets/images/proof.png",
    title: "",
    subtitle: "",
    link: "/events/proof-concept-tour",
  },
  {
    id: 2,
    image: "/assets/images/Islatín & Las Hienas - POSTER-SocialMedia.jpg",
    title: "",
    subtitle: "",
    link: "/events/islatin-las-hienas",
  },
  {
    id: 3,
    image: "/assets/images/Slackathon 3 - POST POSTER.jpg",
    title: "",
    subtitle: "",
    link: "/events/slackathon-3",
  },
];

export default function EventCarousel({
  slides = defaultSlides,
  autoPlay = true,
  autoPlayInterval = 5000,
}: EventCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (autoPlay && !isHovered) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, isHovered]);

  return (
    <div className="relative w-full z-0 -mt-20">
      {/* Photo Carousel - Full Page Coverage */}
      <div
        className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden z-0 shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EFFF00]/5 via-transparent to-[#EFFF00]/5 opacity-50 animate-pulse"></div>
        {/* Slides Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative min-w-full h-full">
              {slide.link ? (
                <Link href={slide.link} className="block w-full h-full group">
                  <div
                    className="relative w-full h-full bg-cover bg-top cursor-pointer transition-all duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                      filter: "contrast(1.1) saturate(1.2) brightness(1.05)",
                    }}
                  >
                    {/* Gradient Overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 group-hover:from-black/10 group-hover:to-black/40 transition-all duration-500" />

                    {/* Animated border/glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 border-2 border-[#EFFF00]/30 animate-pulse"></div>
                      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(239,255,0,0.1)]"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center justify-center text-center text-white pt-20">
                      <div className="px-4 transform group-hover:scale-105 transition-transform duration-300">
                        <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                          {slide.title}
                        </h2>
                        {slide.subtitle && (
                          <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">
                            {slide.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subtle corner accent */}
                    <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#EFFF00]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#EFFF00]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </Link>
              ) : (
                <div
                  className="relative w-full h-full bg-cover bg-top group"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                    filter: "contrast(1.1) saturate(1.2) brightness(1.05)",
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

                  {/* Content */}
                  <div className="absolute inset-0 flex items-center justify-center text-center text-white pt-20">
                    <div className="px-4">
                      <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                        {slide.title}
                      </h2>
                      {slide.subtitle && (
                        <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Touch/Swipe Support for Mobile */}
        <div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          onTouchStart={(e) => {
            const touchStart = e.touches[0].clientX;
            e.currentTarget.setAttribute(
              "data-touch-start",
              touchStart.toString()
            );
          }}
          onTouchEnd={(e) => {
            const touchStart = parseFloat(
              e.currentTarget.getAttribute("data-touch-start") || "0"
            );
            const touchEnd = e.changedTouches[0].clientX;
            const diff = touchStart - touchEnd;

            if (Math.abs(diff) > 50) {
              // Minimum swipe distance
              if (diff > 0) {
                nextSlide();
              } else {
                prevSlide();
              }
            }
          }}
        />
      </div>

      {/* Navigation Buttons Below Photos */}
      <div className="bg-[#1A1A1A] py-6">
        {/* More Info Button */}
        <div className="flex justify-center mb-6">
          <button
            className="bg-[#EFFF00] text-black font-semibold rounded-full transition-all duration-300 hover:bg-yellow-400 hover:scale-105"
            style={{
              borderRadius: "9999px",
              paddingTop: "6px",
              paddingRight: "120px",
              paddingBottom: "6px",
              paddingLeft: "120px",
            }}
          >
            More info
          </button>
        </div>

        <div className="flex justify-center items-center">
          {/* Dots Navigation */}
          <div className="flex space-x-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-5 h-5 rounded-full transition-all duration-300 relative ${
                  index === currentSlide
                    ? "bg-[#EFFF00] scale-125 shadow-lg shadow-[#EFFF00]/50"
                    : "bg-white/40 hover:bg-white/70 hover:scale-110"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && (
                  <div className="absolute inset-0 rounded-full bg-[#EFFF00] animate-ping opacity-30"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
