"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import CardEvent from "@/components/cardEvent/cardEvent";
import { useEvents } from "@/hooks/useEvents";
import type { Category, Event } from "@/types";
import { useCategories } from "@/hooks/useCategories";
import PaymentModal from "@/components/PaymentModal/page";

// State for selected category filter

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
    // State for PaymentModal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const { data: categories, loading: loadingCategories } = useCategories();
  const {
    data: events,
    loading: loadingEvents,
    error,
  } = useEvents(
    selectedCategory ? { category: selectedCategory.category_name } : undefined
  );

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
      <div className=" text-white font-sans">
        {/* ✅ Hero Carousel */}
        <div className="desktop-container ">
          <EventCarousel />
        </div>
        {/* Events */}
        <div className="desktop-container pb-12">
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
{/* Upcoming and recomendation button, we need connect them with backend, because it is static for now */ }
         <div className="flex justify-between ">
          <div className="flex gap-4  ">
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
                  padding: "16px",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
                onClick={() => (window.location.href = "/all-events")}
              >
                See all events
              </button>
            </div>
          </div>
          </div>

     
          {/* Single event preview - will expand to multiple events later */}
          <div
            className="overflow-x-auto 
scroll-snap-stop:always
scroll-behavior:auto flex gap-8 sm:gap-6 sm:grid sm:grid-cols-3 sm:overflow-visible"
          >
            {(events ?? []).map((event) => (
              <div className="shrink-0 w-[340px] sm:w-auto p-4">
                <CardEvent
                  key={event.id}
                  event={event}
                  onBuy={(e) => {
                    setSelectedEvent(e);
                    setShowPaymentModal(true);
                  }}
                />
                 {/* PaymentModal */}
                      {showPaymentModal && selectedEvent && (
                        <PaymentModal
                          eventData={{
                            id: selectedEvent.id,
                            title: selectedEvent.title,
                            price: selectedEvent.price || 0,
                            venue: `${selectedEvent.venue?.place || ""}, ${
                              selectedEvent.venue?.city?.city_name || ""
                            }`,
                            date: new Date(selectedEvent.start_date || "").toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            ),
                          }}
                          onClose={() => {
                            setShowPaymentModal(false);
                            setSelectedEvent(null);
                          }}
                        />
                      )}
              </div>
            ))}
          </div>
          {/* Bottom Action Bar - Empty now */}
          <div className="flex justify-start items-center"></div>
        </div>
      </div>

      {/* Events picture */}
      <div className="px-6 sm:px-6 md:px-6 lg:px-6 xl:px-12">
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
              className="mx-auto desktop-event-frame w-[150px] sm:w-[150px] md:w-[200px] lg:w-[200px] xl:w-[220px]"
              style={{
                height: "222px",
                borderRadius: "16px",
                border: "1px solid #EFFF00",
                background: `url('/assets/images/Frame${frameNumber}.png') lightgray 50% / cover no-repeat`,
                marginTop: index === 0 ? "40px" : index === 2 ? "20px" : "0px",
              }}
            ></div>
          ))}
        </div>
      </div>

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
    </>
  );
}
