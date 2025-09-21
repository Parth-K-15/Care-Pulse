import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  useEffect(() => {
    // We can add more complex JS-based animations here if needed.
    // For this design, CSS animations are sufficient and performant.
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen font-sans text-gray-200 p-4 md:p-8">
      {/* Container with a subtle fade-in animation */}
      <div className="bg-gray-900 rounded-2xl shadow-xl p-4 md:p-8 lg:p-12 bg-gradient-to-br from-gray-900 to-gray-800 animate-fadeIn">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span className="text-xl font-bold text-white">HEALTH HUB</span>
          </div>
          <nav className="flex space-x-4 md:space-x-8 text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">
              Homis
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Fhiacc
            </Link>
            <Link to="/" className="hover:text-white transition-colors">
              Snbagt
            </Link>
            <Link to="/admin" className="px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 active:scale-95 active:shadow-inner transition-transform">
              Admin
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center justify-between mb-16">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
              HEALTH HUB
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mt-2">
              Smart Hospital Management Simplified
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:bg-blue-600 active:scale-95 active:shadow-inner transition-transform">
              LEARN MORE
            </button>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://placehold.co/800x600/1f2937/d1d5db?text=Medical+Professionals"
              alt="Medical professionals smiling"
              className="rounded-2xl w-full h-auto"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Empowering Your Health Journey
          </h2>
          <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0 md:space-x-8 text-gray-400">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-400 hover:animate-bounce transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                <polyline points="17 2 12 7 7 2" />
              </svg>
              <p className="text-sm font-semibold mt-2">
                Seamless Appointments <br />& Records
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-400 hover:animate-bounce transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15.5 14.5L12 11V7" />
                <path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2z" />
              </svg>
              <p className="text-sm font-semibold mt-2">
                Personalized <br />
                Insights
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-400 hover:animate-bounce transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                <path d="M10 16v-4h4" />
              </svg>
              <p className="text-sm font-semibold mt-2">
                Personalized Care <br />
                Insights
              </p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-400 hover:animate-bounce transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <p className="text-sm font-semibold mt-2">
                Effortless <br />
                Administration
              </p>
            </div>
          </div>
        </section>

        {/* Login Cards Section */}
        <section className="mb-16 flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Patient Card */}
          <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-2xl shadow-inner shadow-gray-700 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 hover:ring-2 hover:ring-green-400/50">
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-green-400 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 14c-2.67 0-5.33-1.33-8-4a12.83 12.83 0 0 1 16 0c-2.67 2.67-5.33 4-8 4z" />
              </svg>
              <p className="text-xl font-bold">LOGIN AS PATIENT</p>
              <p className="text-sm text-gray-400 mt-1">Manage Your Care</p>
              <Link
                to="/patient"
                className="mt-4 text-green-400 hover:text-green-300 font-semibold flex items-center"
              >
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          {/* Doctor Card */}
          <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-2xl shadow-inner shadow-gray-700 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:ring-2 hover:ring-blue-400/50">
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-400 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                <path d="M10 16v-4h4" />
              </svg>
              <p className="text-xl font-bold">LOGIN AS DOCTOR</p>
              <p className="text-sm text-gray-400 mt-1">Streatime Workflows</p>
              <Link
                to="/doctor"
                className="mt-4 text-blue-400 hover:text-blue-300 font-semibold flex items-center"
              >
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          {/* Admin Card */}
          <div className="w-full md:w-1/3 bg-gray-800 p-6 rounded-2xl shadow-inner shadow-gray-700 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:ring-2 hover:ring-purple-400/50">
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-purple-400 mb-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
                <path d="M10 16v-4h4" />
              </svg>
              <p className="text-xl font-bold">LOGIN AS ADMIN</p>
              <p className="text-sm text-gray-400 mt-1">Oversve Operations</p>
              <Link
                to="/admin"
                className="mt-4 text-purple-400 hover:text-purple-300 font-semibold flex items-center"
              >
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-3" />
                <polyline points="12 14 12 2 12 14" />
                <line x1="12" y1="22" x2="12" y2="14" />
                <line x1="12" y1="2" x2="12" y2="2" />
              </svg>
              <span>401 433 556 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>bivo@gmogiio@isbdial.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95A21.17 21.17 0 0 0 12 4a21.17 21.17 0 0 0-8.59.47A2.78 2.78 0 0 0 1.46 6.42 21.17 21.17 0 0 0 1 12c0 3.9 1.46 7.42 1.46 7.58a2.78 2.78 0 0 0 1.95 1.95A21.17 21.17 0 0 0 12 20a21.17 21.17 0 0 0 8.59-.47 2.78 2.78 0 0 0 1.95-1.95A21.17 21.17 0 0 0 23 12c0-3.9-1.46-7.42-1.46-7.58z" />
              </svg>
              <span>hanthheaattt hmlun.com</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Tailwind CSS keyframes for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        .hover\\:animate-bounce:hover {
          animation: bounce 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;