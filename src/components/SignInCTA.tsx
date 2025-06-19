import React from "react";
import Link from "next/link";

const SignInCTA: React.FC = () => (
  <Link
    href="/auth/login"
    className="inline-block rounded bg-blue-600 text-white px-6 py-3 font-semibold text-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
    aria-label="Sign in to AthenaOS"
  >
    Sign in
  </Link>
);

export default SignInCTA;