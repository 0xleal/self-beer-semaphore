'use client';

import { useEffect, useState } from 'react';

export default function BeerSemaphore() {
  const [status, setStatus] = useState<'open' | 'closed'>('closed');
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setStatus(data.status);
    } catch (error) {
      console.error('Failed to fetch status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const isOpen = status === 'open';

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      {/* Animated background bubbles when open */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 w-2 h-2 bg-amber-300/30 rounded-full animate-bubble"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Semaphore Pole and Arm Assembly */}
        <div className="relative flex flex-col items-center">
          {/* Top lamp housing */}
          <div className="relative mb-4">
            <div className="w-16 h-20 bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-lg border-4 border-gray-900 flex items-center justify-center">
              <div
                className={`w-10 h-10 rounded-full transition-all duration-500 ${
                  isOpen
                    ? 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.8)]'
                    : 'bg-red-600 shadow-[0_0_30px_rgba(220,38,38,0.8)]'
                } animate-pulse`}
              />
            </div>
          </div>

          {/* Pole */}
          <div className="relative w-6 h-64 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 border-2 border-gray-700 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Semaphore Arm Pivot Point */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20">
              {/* Pivot bolt */}
              <div className="w-8 h-8 bg-gray-800 rounded-full border-4 border-yellow-600 shadow-lg" />

              {/* Rotating Arm */}
              <div
                className={`absolute top-1/2 left-1/2 origin-left transition-transform duration-1000 ease-in-out ${
                  isOpen ? 'rotate-[-45deg]' : 'rotate-[45deg]'
                }`}
                style={{ transformOrigin: 'left center' }}
              >
                <div className="relative w-48 h-12 -ml-0 -mt-6">
                  {/* Arm body */}
                  <div
                    className={`w-full h-full rounded-r-full border-4 transition-all duration-1000 ${
                      isOpen
                        ? 'bg-gradient-to-r from-green-600 to-green-500 border-green-700 shadow-[0_0_40px_rgba(34,197,94,0.6)]'
                        : 'bg-gradient-to-r from-red-700 to-red-600 border-red-800 shadow-[0_0_40px_rgba(220,38,38,0.6)]'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/20 rounded-r-full" />
                  </div>

                  {/* Arm stripe pattern */}
                  <div className="absolute inset-0 flex items-center justify-end pr-4 gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-8 bg-white/40 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Support brackets */}
            {[0.3, 0.5, 0.7].map((position, i) => (
              <div
                key={i}
                className="absolute w-10 h-3 bg-gray-700 border-2 border-gray-800"
                style={{ top: `${position * 100}%`, left: '-8px' }}
              />
            ))}
          </div>

          {/* Base */}
          <div className="w-32 h-8 bg-gradient-to-b from-gray-700 to-gray-900 border-4 border-gray-950 shadow-2xl" />
          <div className="w-40 h-4 bg-gray-950 rounded-b-lg" />
        </div>

        {/* Neon Sign Display */}
        <div className="relative">
          <div
            className={`text-8xl font-bold tracking-wider transition-all duration-1000 ${
              isOpen
                ? 'text-green-400 drop-shadow-[0_0_25px_rgba(34,197,94,1)]'
                : 'text-red-500 drop-shadow-[0_0_25px_rgba(220,38,38,1)]'
            }`}
            style={{
              fontFamily: 'Impact, sans-serif',
              textShadow: isOpen
                ? '0 0 10px #22c55e, 0 0 20px #22c55e, 0 0 30px #22c55e, 0 0 40px #22c55e'
                : '0 0 10px #dc2626, 0 0 20px #dc2626, 0 0 30px #dc2626, 0 0 40px #dc2626',
            }}
          >
            {isOpen ? 'OPEN' : 'CLOSED'}
          </div>

          {/* Neon tube effect */}
          <div className="absolute inset-0 -z-10">
            <div
              className={`absolute inset-0 blur-xl transition-all duration-1000 ${
                isOpen ? 'bg-green-500/30' : 'bg-red-600/30'
              }`}
            />
          </div>
        </div>

        {/* Beer Tap Visualization */}
        <div className="relative">
          <div className="flex items-end gap-8">
            {/* Beer Tap */}
            <div className="relative">
              <div className="w-16 h-32 bg-gradient-to-b from-yellow-700 to-yellow-900 rounded-t-3xl border-4 border-yellow-950 shadow-xl">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-12 bg-black rounded-lg border-2 border-gray-600" />
              </div>
              <div className="w-20 h-8 -ml-2 bg-gradient-to-b from-gray-800 to-black border-4 border-gray-900" />

              {/* Flowing beer animation */}
              {isOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-24">
                  <div className="w-full h-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 animate-flow opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent animate-flow" />
                </div>
              )}
            </div>

            {/* Beer Glass */}
            <div className="relative w-32 h-48 bg-gradient-to-b from-blue-100/10 to-blue-100/5 rounded-b-3xl border-4 border-blue-200/20 backdrop-blur-sm overflow-hidden">
              {/* Beer liquid */}
              <div
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600 via-amber-500 to-amber-400 transition-all duration-2000 ease-out ${
                  isOpen ? 'h-[85%]' : 'h-0'
                }`}
              >
                {/* Foam */}
                <div className="absolute -top-8 left-0 right-0 h-12 bg-gradient-to-b from-yellow-50 via-yellow-100 to-amber-200">
                  {/* Foam bubbles */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-4 h-4 bg-white/60 rounded-full animate-foam"
                      style={{
                        left: `${i * 12}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Status subtitle */}
        <div className="text-center">
          <p className="text-gray-400 text-xl">
            {loading ? 'Checking status...' : `The beer machine is currently ${status}`}
          </p>
          <p className="text-gray-600 text-sm mt-2">Auto-refreshing every 2 seconds</p>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes flow {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes foam {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-8px) scale(1.2);
            opacity: 0.9;
          }
        }

        .animate-bubble {
          animation: bubble linear infinite;
        }

        .animate-flow {
          animation: flow 0.8s linear infinite;
        }

        .animate-foam {
          animation: foam 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
