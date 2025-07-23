"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const EventDetail = dynamic(
  () => import("@/components/_EventDetails/event.detail"),
  {
    ssr: false,
  }
);

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Upcoming");

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filters = [
    "Hip Hop",
    "Pop",
    "Tiny Desk Concert",
    "Free Concerts",
    "Jazz",
    "Foreign",
  ];

  const styleTag = (
    <style>
      {`
        @keyframes jump {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}
    </style>
  );

  return (
    <>
      {styleTag}
      <div className="bg-[#1A1A1A] text-white font-sans">
        {/* ✅ Hero */}
        <div
          className="relative w-full h-[400px] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/icons/concertphoto.svg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"></div>
        </div>

        {/* Events */}
        <section className="px-8 py-10 bg-[#1A1A1A]">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:opacity-90"
            >
              <span className="text-xs">☰</span> Filter
            </button>
          </div>

          {showFilters && (
            <div className="flex justify-end mb-6">
              <div className="flex flex-wrap gap-4">
                {filters.map((label) => {
                  const isActive = selectedFilters.includes(label);
                  return (
                    <button
                      key={label}
                      onClick={() => toggleFilter(label)}
                      className={`px-4 py-1 rounded-full text-sm border transition-colors ${
                        isActive
                          ? "bg-[#EFFF00] text-black border-[#EFFF00]"
                          : "border-gray-400 text-white hover:border-white"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            {["Upcoming", "Recommendation"].map((label) => {
              const isActive = activeCategory === label;
              return (
                <button
                  key={label}
                  onClick={() => setActiveCategory(label)}
                  className={`px-4 py-1 rounded font-semibold text-sm transition-colors ${
                    isActive
                      ? "bg-[#EFFF00] text-black"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="mb-10">
            <EventDetail />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-black p-2 rounded shadow-lg">
                <Image
                  src="/assets/icons/concertphoto.svg"
                  alt="Event"
                  width={400}
                  height={200}
                  className="rounded"
                />
                <div className="mt-2 text-sm">
                  <p className="font-bold">Title</p>
                  <p className="text-gray-400">Date</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="px-8 py-10">
          <h2 className="text-2xl font-bold text-[#EFFF00] mb-6">
            Photo gallery
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative">
                <Image
                  src="/assets/icons/concertphoto.svg"
                  alt="Gallery"
                  width={300}
                  height={200}
                  className="rounded"
                />
                <p className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 text-sm">
                  Concert Name
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-[#EFFF00] px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-8">
            <div className="mb-6 md:mb-0 flex flex-col items-left md:items-start">
              <p className="text-lg font-bold mb-4 font-family font-squada ">
                Visit us in our social media
              </p>
              <div className="flex gap-6 justify-center">
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  className="transition hover:scale-110"
                  style={{
                    animation: "jump 1.5s ease-in-out infinite",
                    animationDelay: "0s",
                  }}
                >
                  <Image
                    src="/assets/icons/Facebook.svg"
                    alt="Facebook"
                    width={40}
                    height={40}
                    className="hover:brightness-125"
                  />
                </a>
                <a
                  href="https://instagram.com"
                  aria-label="Instagram"
                  className="transition hover:scale-110"
                  style={{
                    animation: "jump 1.5s ease-in-out infinite",
                    animationDelay: "0.3s",
                  }}
                >
                  <Image
                    src="/assets/icons/Insta.svg"
                    alt="Instagram"
                    width={40}
                    height={40}
                    className="hover:brightness-125 hover:drop-shadow-[0_0_4px_#EFFF00]"
                  />
                </a>
                <a
                  href="https://linkedin.com"
                  aria-label="LinkedIn"
                  className="transition hover:scale-110"
                  style={{
                    animation: "jump 1.5s ease-in-out infinite",
                    animationDelay: "0.6s",
                  }}
                >
                  <Image
                    src="/assets/icons/linkedin.svg"
                    alt="LinkedIn"
                    width={40}
                    height={40}
                    className="hover:brightness-125"
                  />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end text-sm gap-1 mt-6 md:mt-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-1">
                  <a href="#">About</a>
                  <a href="#">Contact Us</a>
                </div>
                <div className="flex flex-col gap-1">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Accessibility</a>
                  <a href="#">Statement</a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-[#EFFF00] mt-4">
            <p>© 2025 by Vefkraft</p>
          </div>
        </footer>
      </div>
    </>
  );
}
