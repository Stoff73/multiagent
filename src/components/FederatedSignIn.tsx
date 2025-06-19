import React from 'react';

interface FederatedSignInProps {
  onGoogleSignIn: () => void;
  onMicrosoftSignIn: () => void;
}

const FederatedSignIn: React.FC<FederatedSignInProps> = ({ onGoogleSignIn, onMicrosoftSignIn }) => {
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md max-w-sm w-full">
      <h2 className="text-2xl font-semibold text-[#2563EB] mb-4">Sign in with</h2>
      <button
        onClick={onGoogleSignIn}
        aria-label="Sign in with Google"
        className="w-full rounded-md bg-[#2563EB] text-white py-3 font-semibold shadow-md hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:ring-offset-2 transition"
      >
        Sign in with Google
      </button>
      <button
        onClick={onMicrosoftSignIn}
        aria-label="Sign in with Microsoft"
        className="w-full rounded-md bg-[#14B89A] text-white py-3 font-semibold shadow-md hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-[#14B89A] focus:ring-offset-2 transition"
      >
        Sign in with Microsoft
      </button>
    </div>
  );
};

export default FederatedSignIn;