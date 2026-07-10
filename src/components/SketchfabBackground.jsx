"use client";

import React from "react";

export default function SketchfabBackground({
  modelId = "",
  overlayOpacity = 0.48,
  fadeOutOnScroll = true,
}) {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#000000] -z-10 pointer-events-none select-none" />
  );
}
