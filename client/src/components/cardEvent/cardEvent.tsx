"use client";
// ------------ Imports ---------------
import type { Category, Event } from "@/types";
import { useState } from "react";
import CardButton from "@/components/UI/CardPaymentButton/cardButton";
import Link from "next/link";
import PaymentModal from "@/components/PaymentModal/page";
import ImageUrlorIDCard from "../Media/image/imageCard/ImageUrlorIDCard";


type Props = {
  event: Event;
  onBuy: (event: Event) => void;
  categories?: Category[];
};


const CardEvent = ({ event, onBuy }: Props) => {
    console.log("event.categories", event.categories);

  return (
    
    <div className="   h-[198px] sm:h-[240px] w-[352px] sm:w-[420px] relative overflow-hidden rounded-xl  ">
     <div className="flex flex-col">
     <Link href={`/all-events/${event.id}`}> 
     <div className="absolute w-16 sm:w-16 h-10 sm:h-12 rounded-full bg-[var(--background)]  top-1/2 -translate-y-1/2 left-[-40px] z-30 " />
      <ImageUrlorIDCard src={event.image} alt={event.title} />
      
        <div className=" w-full items-center flex h-[80px] sm:h-[96px] justify-between p-4 absolute bottom-0 bg-[var(--blur-colorDark)] backdrop-blur-[10px] rounded-b-2xl  z-10 ">
          <div className=" flex flex-col justify-start gap-y-0 sm:gap-y-1 ">
                <h3 className="text-xl sm:text-2xl font-semibold  text-[var(--color-acidYellow)] font-squada ">
                {event.title}
                </h3>
        
                <p className="text-[var(--color-text)] text-sm">{event.venue?.address}</p>
                <p className="text-sm text-[var(--color-text)] ">
                {new Date(event.start_date ?? "").toLocaleDateString("IS", {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                })}
                </p>
            </div>
              
          
        </div>
      </Link>
          <div className="flex mt-[-76px] pr-4 justify-end  ">
                    <CardButton
                    variant="primary"
                    onClick={(e) => {
                        e.stopPropagation();
                        onBuy(event);
                    }}
                    
                    >
                    +
                    </CardButton>
                </div>
        
                </div>

      {/* Event details and link */}

      {/* Ticket purchase and categories */}
      <div className="flex gap-2 flex-wrap  mt-2 items-center">
                        {/* Event categories */}
                        
    {event.categories?.length ? (
        
  <div className="flex gap-1 flex-wrap mt-1">
    {event.categories.map((c) => (
      <span
        key={c.categories_id.id}
        className="text-xs bg-blue-100 text-red px-2 py-1 rounded"
      >
        {c.categories_id.category_name}
      </span>
    ))}
  </div>
) : (
    
  <span className="text-xs text-gray-400">No categories</span>
)}
      </div>
      <div className="absolute w-16 sm:w-16 h-10 sm:h-12 rounded-full bg-[var(--background)] top-1/2 -translate-y-1/2  z-30 right-[-40px]" />
    </div>
  );
};

export default CardEvent;
