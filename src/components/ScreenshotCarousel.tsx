import React from "react";

const screenshots = [
  { src: "/screenshot1.png", alt: "AthenaOS Dashboard" },
  { src: "/screenshot2.png", alt: "Team Collaboration View" },
  { src: "/screenshot3.png", alt: "Settings Panel" },
];

const ScreenshotCarousel: React.FC = () => (
  <section
    className="w-full flex flex-col items-center py-6"
    aria-label="AthenaOS Screenshots"
  >
    <h2 className="sr-only">Product Screenshots</h2>
    <div className="flex gap-4 overflow-x-auto max-w-full">
      {screenshots.map((shot, idx) => (
        <img
          key={idx}
          src={shot.src}
          alt={shot.alt}
          className="rounded shadow-md w-64 h-40 object-cover bg-gray-100"
          loading="lazy"
        />
      ))}
    </div>
  </section>
);

export default ScreenshotCarousel;