import React from "react";
import Link from "next/link";

const GetStartedButton: React.FC = () => (
  <Link
    href="/get-started"
    className="inline-block rounded bg-[#14B89A] text-white px-6 py-3 font-semibold text-lg shadow-md hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-[#14B89A] focus:ring-offset-2 transition"
    aria-label="Get started with AthenaOS"
  >
    Get Started
  </Link>
);

export default GetStartedButton;