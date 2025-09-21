import { useAuth, useClerk } from "@clerk/clerk-react";
import { Navigate, Link } from "react-router-dom";

export default function PatientAuth() {
  const { isSignedIn } = useAuth();
  const { openSignIn, openSignUp } = useClerk();

  if (isSignedIn) {
    return <Navigate to="/patient/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">CP</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">CarePulse Patient</h1>
          <p className="text-gray-400 mb-8">Sign in to your patient portal</p>

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => openSignIn({ mode: "modal", afterSignInUrl: "/patient/dashboard" })}
              className="w-full bg-gray-800 hover:bg-gray-700 py-3 rounded-md text-white font-medium border border-gray-700"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => openSignUp({ mode: "modal", afterSignUpUrl: "/patient/dashboard" })}
              className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-md text-white font-medium"
            >
              Sign Up as Patient
            </button>
            <p className="text-center text-sm text-gray-500">
              Go back to <Link to="/" className="text-blue-400 hover:underline">Home</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}