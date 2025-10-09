"use client";
// ------------ Imports ---------------
import React from "react";

type MusicEmbedProps = {
  embedCode: string;
};

const MusicEmbed: React.FC<MusicEmbedProps> = React.memo(({ embedCode }) => {
  return (
    <div
      style={{ borderRadius: "12px", overflow: "hidden" }}
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
});

// FIX: Explicitly set the display name
MusicEmbed.displayName = "MusicEmbed"; // <-- ADD THIS LINE

export default MusicEmbed;
