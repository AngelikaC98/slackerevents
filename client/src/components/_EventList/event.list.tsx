"use client";
// ------------ Imports ---------------
import type { Category, Event } from "@/types";
import { useEvents } from "@/hooks/useEvents";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import PaymentModal from "@/components/PaymentModal/page";
import CardEvent from "../cardEvent/cardEvent";

/**
 * Events
 * ------
 * Displays a list of events with category filtering and ticket purchase.
 */
export default function Events() {
  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  // State for PaymentModal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Fetch categories and events
  const { data: categories, loading: loadingCategories } = useCategories();
  const {
    data: events,
    loading: loadingEvents,
    error,
  } = useEvents(
    selectedCategory ? { category: selectedCategory.category_name } : undefined
  );
  const [showFilters, setShowFilters] = useState(false);

  // Loading and error states
  if (loadingCategories || loadingEvents) return <p>⏳ Loading…</p>;
  if (error) return <p>❌ {error}</p>;
  if (!events?.length) return <p>⚠️ No events found.</p>;

  // Sort categories by their sort order
  const sortedCategories = [...(categories ?? [])].sort(
    (a, b) =>
      (typeof a.sort === "number" ? a.sort : Infinity) -
      (typeof b.sort === "number" ? b.sort : Infinity)
  );

  // ------------ Render ---------------
  return (
    <div className="pt-10 px-12 gap-10 ">
      <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center h-[36px] w-[100px] bg-white text-[var(--color-textBlack)] text-sm font-semibold px-4 py-1 rounded-full hover:opacity-90 filter-button"
            >
              <div className="flex items-center gap-2 justify-center">
              <span className="text-xs ">☰ </span> Filter
              </div>
            </button>
      {/* Category filter buttons */}
      {showFilters && (
      <div className="flex flex-wrap gap-4 mb-6 mt-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 h-[36px] w-[100px] rounded-full ${
            selectedCategory === null
              ? "bg-[var(--color-acidYellow)] text-[var(--color-textBlack)]"
              : "border border-[var(--color-text)] text-[var(--color-text)] hover:border-white"
          }`}
        >
          All
        </button>
        {sortedCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full h-[36px] w-[100px] ${
              selectedCategory?.id === cat.id
                ? " bg-[var(--color-acidYellow)] text-[var(--color-textBlack)] "
                : "border border-[var(--color-text)] text-[var(--color-text)] hover:border-white"
            }`}
          >
            {cat.category_name}
          </button>
        ))}
      </div>
      )}

      {/* No events message */}
      {/* Event grid */}
      <div className="flex mx-auto justify-center sm:flex-col md:flex-col lg:flex-row 2xl:justify-between px-4 flex-row gap-10  items-center flex-wrap ">
        {events.map((event) => (
          <CardEvent
            key={event.id}
            event={event}
            onBuy={(e) => {
              setSelectedEvent(e);
              setShowPaymentModal(true);
            }}
          />
        ))}
      </div>
    

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
  );
}
