"use client";

import React from 'react';

/**
 * Renders a self-contained infographic by loading an external HTML file into an iframe.
 * This approach isolates the infographic's styles and scripts (like CDN Tailwind and Chart.js)
 * from the main Next.js application, preventing conflicts. The HTML files are stored
 * in the `public/Dynos` directory.
 */
export default function MissileProgramInfographicPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/Dynos/missile-program.html"
        title="Infographic: Analysis of Operation True Promise III"
        className="w-full h-full border-0"
      />
    </div>
  );
}