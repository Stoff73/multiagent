import React from "react";

const features = [
  "Instant onboarding—no setup required",
  "AI-powered productivity tools",
  "Enterprise-grade security",
  "Seamless team collaboration",
  "Customizable workflows",
];

const FeatureBullets: React.FC = () => (
  <section
    className="w-full flex flex-col items-center py-6"
    aria-label="AthenaOS Features"
  >
    <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
    <ul className="list-disc list-inside text-lg text-gray-800 max-w-xl space-y-2">
      {features.map((feature, idx) => (
        <li key={idx}>{feature}</li>
      ))}
    </ul>
  </section>
);

export default FeatureBullets;