"use client";
// ------------ Imports ---------------
import { useState } from "react";
import { useParams } from "next/navigation";
//* Hooks & Types
import type { Event } from "../../types";
import { useEvents } from "../../hooks/useEvents";
//* Media Components
import ImageUrlorID from "@/components/Media/image/ImageUrlorID";
import MusicEmbed from "@/components/Media/music/musicEmbed";
import VideoPlayer from "@/components/Media/video/videoEmbed";
//* Components
import TicketCounter from "../_TicketCounter/ticketCounter";
import Button from "../UI/UniversalButton/button";
import { useRouter } from "next/navigation";
import Location from "../../../public/assets/icons/location.jsx";
import Schedule from "../../../public/assets/icons/schedule.jsx";

/**
 * EventDetail
 * -----------
 * Shows all details for a single event, including media, info, description, ticket counter, and modal.
 */
const EventDetail: React.FC = () => {
  const params = useParams();
  const id = params?.id?.toString() ?? "";

  const { data: events, loading, error } = useEvents();

  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const event = events?.find((e: Event) => String(e.id) === id);
  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p className="text-red-500">Event not found 😵</p>;

  const handleBuyTicket = () => {
    sessionStorage.setItem("ticket_qty", String(qty));
    sessionStorage.setItem("ticket_total", String(total));
    sessionStorage.setItem("event_id", String(event.id));
    setShowModal(true);
  };

  const date = new Date(event.start_date || "");

  const dateString = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* ---------- Section Top ---------- */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-10 text-[var(--color-acidYellow)]"
      >
        ←
      </button>
      <div className=" flex justify-center items-center flex-col">
        <div className="w-full flex flex-col items-center">
          {event.video ? (
            <VideoPlayer src={event.video} />
          ) : event.image ? (
            <div className=" relative w-full  lg:h-[600px]  ">
              <ImageUrlorID src={event.image} alt={event.title} />

              {/* ---------- Section Middle ---------- */}
              <div
                className="  w-[320px] p-4 gap-4  h-auto lg:h-[380px]
    sm:w-[400px] md:w-[600px] lg:w-[800px]
    rounded-2xl bg-[var(--blur-colorDark)] backdrop-blur-[10px] backdrop:filter
    flex flex-col justify-between items-left z-10 -mt-[60px] mx-auto relative "
              >
                <div className="flex flex-col gap-4 justify-between ">
                  <h2 className="font-bold text-[var(--color-acidYellow)] font-squada text-[26px] sm:text-[32px] md:text-[32px] lg:text-[36px]">
                    {event.title}
                  </h2>

                  <p className="text-[var(--color-text)] text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px] ">
                    {typeof event.price === "number"
                      ? `Price: ${(event.price / 1000).toFixed(3)} ISK`
                      : "Gratis"}
                  </p>

                  <div className="flex justify-between">
                    <div className="flex items-center  gap-4 sm:gap-4 md:gap-4 lg:gap-6  ">
                      <Location src={location} alt="Location" />
                      <div className="text-[var(--color-text)] flex flex-col items-start gap-2">
                        <p className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px]">
                          {event.venue?.place}{" "}
                        </p>
                        <p className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px]">
                          {event.venue?.city?.city_name ?? "No city specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col text-[var(--color-text)] ">
                      <div className="flex items-center gap-4 sm:gap-4 md:gap-4 lg:gap-6 ">
                        <Schedule src={Schedule} alt="Schedule" />
                        <div className="flex flex-col items-start gap-2">
                          <p className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px]">
                            {dateString}
                          </p>
                          <p className="text-[12px] sm:text-[14px] md:text-[14px] lg:text-[16px]">
                            {timeString}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  {event.spotify_url && (
                    <div className="">
                      <MusicEmbed embedCode={event.spotify_url} />
                    </div>
                  )}
                </div>
              </div>

              {/* ---------- Section Bottom ---------- */}
              <div className="flex flex-col p-6 items-center w-full pb-6  flex-center  ">
                <h2 className=" flex  font-bold text-[var(--color-acidYellow)] font-squada text-[26px] sm:text-[32px] md:text-[32px] lg:text-[36px]">
                  Description
                </h2>

                <div
                  className="text-[14px] w-[320px] sm:w-[400px] md:w-[600px] lg:w-[700px] text-[var(--color-text)]"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>
              <div className="flex justify-center items-center  flex-col">
                <div className=" items-center w-[320px] sm:w-[400px] justify-between md:w-[600px] lg:w-[700px] flex flex-col sm:flex-col md:flex-row lg:flex-row items-enter">
                  <TicketCounter
                    pricePerTicket={event.price || 0}
                    eventId={String(event.id)}
                    onChange={(newQty, newTotal) => {
                      setQty(newQty);
                      setTotal(newTotal);
                    }}
                  />
                  <Button
                    variant="secondary"
                    onClick={handleBuyTicket}
                    disabled={qty < 1}
                  >
                    Buy Ticket
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-[var(--color-text)] text-center">
              No media selected
            </p>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Ready for payment</h2>
              <p>Tickets: {qty}</p>
              <p>Total price: {total} ISK</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetail;
