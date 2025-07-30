"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const EventDetail = dynamic(
  () => import("@/components/_EventDetails/event.detail"),
  {
    ssr: false,
  }
);

const EventCarousel = dynamic(
  () => import("@/components/Carousel/EventCarousel"),
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

         /* Desktop Media Queries */
         @media (min-width: 768px) {
           .desktop-container {
             max-width: 1200px;
             margin: 0 auto;
             padding: 0 2rem;
           }
           
           .desktop-events-section {
             padding: 4rem 2rem;
           }
           
           .desktop-events-grid {
             gap: 2rem;
             margin-top: 2rem;
             justify-items: center;
           }
           
           .desktop-event-card {
             max-width: 400px;
           }
           
           .desktop-footer {
             padding: 5rem 2rem;
           }
           
           .desktop-footer-content {
             max-width: 1200px;
             margin: 0 auto;
           }
           
           .desktop-social-section {
             margin-left: 0 !important;
           }
           
           .desktop-navigation {
             gap: 8rem;
           }

           /* Enhanced button styles for desktop */
           .filter-button {
             font-size: 16px;
             padding: 8px 24px;
           }
           
           .category-button {
             font-size: 22px;
             height: 42px;
           }

           .desktop-see-all-btn {
             width: auto !important;
             max-width: 200px;
             font-size: 16px;
           }
         }

         @media (min-width: 1024px) {
           .desktop-container {
             max-width: 1400px;
             padding: 0 3rem;
           }
           
           .desktop-events-section {
             padding: 6rem 3rem;
           }
           
           .desktop-events-grid {
             gap: 3rem;
             grid-template-columns: repeat(4, 200px);
             justify-content: center;
           }
           
           .desktop-footer {
             padding: 8rem 3rem;
           }
           
           .desktop-navigation {
             gap: 12rem;
           }

           /* Larger image cards for desktop */
           .desktop-event-frame {
             width: 200px !important;
             height: 240px !important;
           }
         }

         @media (min-width: 1440px) {
           .desktop-container {
             max-width: 1600px;
           }
           
           .desktop-events-grid {
             grid-template-columns: repeat(4, 220px);
           }
           
           .desktop-event-frame {
             width: 220px !important;
             height: 260px !important;
           }
         }
       `}
    </style>
  );

  return (
    <>
      {styleTag}
      <div className="bg-[#1A1A1A] text-white font-sans">
        {/* ✅ Hero Carousel */}
        <div className="desktop-container">
          <EventCarousel />
        </div>
        {/* Events */}
        <section className="px-8 py-10 bg-[#1A1A1A] desktop-events-section">
          <div className="desktop-container">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:opacity-90 filter-button"
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
                const buttonWidth =
                  label === "Recommendation" ? "160px" : "111px";
                return (
                  <button
                    key={label}
                    onClick={() => setActiveCategory(label)}
                    className={`transition-colors ${
                      isActive
                        ? "bg-[#EFFF00] text-black"
                        : "bg-transparent text-[#EFFF00] hover:bg-[#EFFF00] hover:text-black"
                    }`}
                    style={{
                      borderRadius: "9999px",
                      width: buttonWidth,
                      height: "37px",
                      fontWeight: 400,
                      fontSize: "20px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* See all events section */}
            <div className="mb-6">
              <div className="flex justify-end mb-4">
                <button
                  className="text-white hover:text-gray-300 transition-colors desktop-see-all-btn"
                  style={{
                    width: "389px",
                    padding: "16px",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "right",
                  }}
                  onClick={() => (window.location.href = "/all-events")}
                >
                  See all events
                </button>
              </div>

              {/* Single event preview - will expand to multiple events later */}
              <div
                className="relative overflow-hidden shadow-lg max-w-md desktop-event-card mx-auto lg:mx-0"
                style={{ borderRadius: "16px" }}
              >
                {/* Background Image */}
                <div
                  className="relative h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/assets/images/Subtract.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Heart Icon - Top Right */}
                  <a
                    href="/favorites"
                    className="absolute top-3 right-3 text-[#EFFF00] hover:text-yellow-400 transition-colors p-1"
                    aria-label="View favorite events"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </a>

                  {/* Event Details Section - Overlay on image */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-3"
                    style={{
                      borderRadius: "0 0 16px 16px",
                      background: "rgba(24, 24, 24, 0.50)",
                      backdropFilter: "blur(15px)",
                      height: "72px",
                      flexShrink: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-[#EFFF00] font-bold text-sm mb-0">
                            Title
                          </h3>
                          <p className="text-gray-400 text-xs mb-0">Address</p>
                          <p className="text-gray-400 text-xs">Date, time</p>
                        </div>
                        <div className="flex flex-col items-center">
                          {/* Plus Icon - Top Right next to Title */}
                          <button
                            className="text-[#EFFF00] hover:bg-[#EFFF00] hover:text-black transition-colors flex items-center justify-center"
                            onClick={() => console.log("Add event clicked")}
                            aria-label="Add event"
                            style={{
                              display: "flex",
                              width: "34.097px",
                              height: "34.479px",
                              padding: "10px",
                              alignItems: "center",
                              gap: "10px",
                              flexShrink: 0,
                              borderRadius: "12px",
                              border: "1px solid #EFFF00",
                              backgroundColor: "transparent",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                          {/* FREE/ POP text under button */}
                          <span
                            className="mt-1"
                            style={{
                              color: "#E6E6E6",
                              fontFamily: "Microsoft Sans Serif",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "normal",
                            }}
                          >
                            FREE/ POP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar - Empty now */}
                    <div className="flex justify-start items-center"></div>
                  </div>
                </div>
              </div>

              {/* Scrolling Component */}
              <div
                style={{
                  display: "flex",
                  width: "200px",
                  height: "8px",
                  padding: "2px 150px 2px 2px",
                  alignItems: "center",
                  flexShrink: 0,
                  borderRadius: "16px",
                  background: "#E6E6E6",
                  marginTop: "16px",
                  marginLeft: "auto",
                  marginRight: "0",
                }}
              ></div>
            </div>

            {/* Events picture */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2
                  style={{
                    color: "#EFFF00",
                    fontFamily: "Squada One",
                    fontSize: "32px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                  }}
                >
                  Events picture
                </h2>
                <button
                  className="text-white hover:text-gray-300 transition-colors desktop-see-all-btn"
                  style={{
                    width: "389px",
                    padding: "16px",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    textAlign: "right",
                  }}
                >
                  See all
                </button>
              </div>
              <div
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 desktop-events-grid"
                style={{
                  display: "grid",
                }}
              >
                {[27, 47, 48, 49].map((frameNumber, index) => (
                  <div
                    key={index}
                    className="mx-auto desktop-event-frame"
                    style={{
                      width: "184px",
                      height: "222px",
                      borderRadius: "16px",
                      border: "1px solid #EFFF00",
                      background: `url('/assets/images/Frame${frameNumber}.png') lightgray 50% / cover no-repeat`,
                      marginTop:
                        index === 0 ? "40px" : index === 2 ? "20px" : "0px",
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </section>{" "}
        {/* Footer */}
        <footer className="text-[#EFFF00] px-8 py-10 bg-transparent desktop-footer">
          <div className="desktop-footer-content">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left mb-8">
              <div
                className="mb-6 md:mb-0 flex flex-col items-center md:items-start desktop-social-section"
                style={{ marginLeft: "-40px" }}
              >
                <p
                  className="mb-12"
                  style={{
                    color: "#EFFF00",
                    fontFamily: "Squada One",
                    fontSize: "32px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    width: "389px",
                  }}
                >
                  Visit us in our social media
                </p>
                <div
                  className="flex gap-6 justify-center items-center w-full"
                  style={{ marginLeft: "40px" }}
                >
                  <a
                    href="https://facebook.com"
                    className="transition hover:scale-110"
                    style={{
                      animation: "jump 0.8s ease-in-out infinite",
                      animationDelay: "0s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animationPlayState = "paused";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.animationPlayState = "running";
                    }}
                  >
                    <FaFacebookF
                      className="text-white hover:text-[#EFFF00] hover:brightness-125"
                      size={40}
                    />
                  </a>
                  <a
                    href="https://instagram.com"
                    className="transition hover:scale-110"
                    style={{
                      animation: "jump 0.8s ease-in-out infinite",
                      animationDelay: "0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animationPlayState = "paused";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.animationPlayState = "running";
                    }}
                  >
                    <FaInstagram
                      className="text-white hover:text-[#EFFF00] hover:brightness-125 hover:drop-shadow-[0_0_4px_#EFFF00]"
                      size={40}
                    />
                  </a>
                  <a
                    href="https://linkedin.com"
                    className="transition hover:scale-110"
                    style={{
                      animation: "jump 0.8s ease-in-out infinite",
                      animationDelay: "0.4s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animationPlayState = "paused";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.animationPlayState = "running";
                    }}
                  >
                    <FaLinkedinIn
                      className="text-white hover:text-[#EFFF00] hover:brightness-125"
                      size={40}
                    />
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end text-sm gap-1 mt-6 md:mt-0">
                <div className="flex gap-48 desktop-navigation">
                  <div className="flex flex-col gap-1">
                    <a href="#">About</a>
                    <a href="/contact">Contact Us</a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Accessibility</a>
                    <a href="#">Statement</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-[#EFFF00] mt-8">
              <p>© 2025 by Vefkraft</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
