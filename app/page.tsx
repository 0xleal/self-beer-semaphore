'use client';

import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-8">
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

      {/* Two Column Layout */}
      <div className="relative z-10 grid grid-cols-2 gap-16 max-w-7xl w-full items-center">
        {/* LEFT COLUMN - Animation */}
        <div className="flex flex-col items-center gap-12">
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
              className={`text-7xl font-bold tracking-wider transition-all duration-1000 ${
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

          {/* Beer Tap and Glass */}
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

          {/* Status text */}
          <div className="text-center">
            <p className="text-gray-400 text-lg">
              {loading ? 'Checking status...' : `Machine is currently ${status}`}
            </p>
            <p className="text-gray-600 text-xs mt-1">Auto-refreshing every 2 seconds</p>
          </div>
        </div>

        {/* RIGHT COLUMN - QR Code and Instructions */}
        <div className="flex flex-col items-center justify-center gap-8 p-8">
          {/* QR Code Card */}
          <div className="relative bg-gradient-to-br from-amber-100 to-yellow-50 p-8 rounded-2xl border-4 border-amber-800 shadow-2xl">
            {/* Beer mug decoration corners */}
            <div className="absolute -top-3 -left-3 text-4xl">🍺</div>
            <div className="absolute -top-3 -right-3 text-4xl">🍺</div>

            <div className="bg-white p-5 rounded-lg shadow-inner">
              <QRCode
                value="https://redirect.self.xyz?selfApp=%7B%22sessionId%22%3A%22b8fde505-9e0b-4143-9575-05ac821f7a8f%22%2C%22userIdType%22%3A%22uuid%22%2C%22devMode%22%3Afalse%2C%22endpointType%22%3A%22https%22%2C%22header%22%3A%22%22%2C%22logoBase64%22%3A%22https%3A%2F%2Fi.postimg.cc%2FkG8KkQCL%2Ftemp-Image-Byjart.avif%22%2C%22deeplinkCallback%22%3A%22%22%2C%22disclosures%22%3A%7B%22minimumAge%22%3A21%7D%2C%22chainID%22%3A42220%2C%22version%22%3A2%2C%22userDefinedData%22%3A%22beerSession%22%2C%22appName%22%3A%22SelfBeer%22%2C%22scope%22%3A%22beer%22%2C%22endpoint%22%3A%22https%3A%2F%2Fselfbeer.ngrok.app%2Fapi%2Fverify%22%2C%22userId%22%3A%229765e01a-32fc-4819-bdc9-71b34c293bd6%22%7D"
                size={240}
                level="H"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="max-w-md space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-amber-400 mb-2">Ready for a Beer?</h2>
              <p className="text-gray-400 text-sm">Verify your age to unlock the tap</p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-amber-300 font-semibold mb-1">Download Self.xyz App</h3>
                  <p className="text-gray-400 text-sm">Get the Self app from your app store</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-amber-300 font-semibold mb-1">Scan Your Passport</h3>
                  <p className="text-gray-400 text-sm">Use the app to securely scan your passport</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-amber-300 font-semibold mb-1">Prove You're 21+</h3>
                  <p className="text-gray-400 text-sm">Scan the QR code above to verify your age</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="text-green-300 font-semibold mb-1">Pour Your Beer!</h3>
                  <p className="text-gray-400 text-sm">Once verified, the machine opens for you</p>
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <p className="text-gray-500 text-xs">
                Powered by Self.xyz - Secure age verification
              </p>
            </div>
          </div>
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
