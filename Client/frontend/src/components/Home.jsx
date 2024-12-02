import React, { useState, useEffect } from "react";

export const Home = () => {
  const [shimmerIndex, setShimmerIndex] = useState(null);

  const bottomCards = [
    { rotate: -20, translate: 120, tilt: 8, card: "a1-123" },
    { rotate: -16, translate: 60, tilt: 6, card: "a1-080" },
    { rotate: -8, translate: 20, tilt: 4, card: "a1-047" },
    { rotate: 0, translate: 5, tilt: 0, card: "a1-096" },
    { rotate: 8, translate: 20, tilt: 4, card: "a1-246" },
    { rotate: 16, translate: 60, tilt: 6, card: "a1-227" },
    { rotate: 20, translate: 120, tilt: 8, card: "a1-250" },
  ];

  useEffect(() => {
    const startNewShimmer = () => {
      const newIndex = Math.floor(Math.random() * bottomCards.length);
      setShimmerIndex(newIndex);
      setTimeout(() => setShimmerIndex(null), 2000);
    };
    startNewShimmer();
    const intervalId = setInterval(startNewShimmer, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="overflow-clip h-[calc(100vh-50px)] w-full relative">
      <div className="max-w-7xl mx-auto border-red-300 flex flex-col h-full">
        {/* Top row with cards */}
        <div className="relative h-1/3">
          <div className="absolute left-8 transform top-32 scale-[.9]">
            <a className="" href="/cards/a1-234">
              <img
                src="/cards/a1-234.webp"
                alt="Pokemon card"
                className="rounded-lg shadow-xl"
                width="160px"
                height="280px"
              />
            </a>
          </div>
          <div className="absolute left-[20%] transform top-8 scale-[1.1]">
            <a className="" href="/cards/a1-281">
              <img
                src="/cards/a1-281.webp"
                alt="Pokemon card"
                className="rounded-lg shadow-xl"
                width="160px"
                height="280px"
              />
            </a>
          </div>
          <div className="absolute right-[20%] transform top-8 scale-[1.1]">
            <a className="" href="/cards/a1-258">
              <img
                src="/cards/a1-258.webp"
                alt="Pokemon card"
                className="rounded-lg shadow-xl"
                width="160px"
                height="280px"
              />
            </a>
          </div>
          <div className="absolute right-8 transform top-32 scale-[.9]">
            <a className="" href="/cards/a1-283">
              <img
                src="/cards/a1-283.webp"
                alt="Pokemon card"
                className="rounded-lg shadow-xl"
                width="160px"
                height="280px"
              />
            </a>
          </div>
        </div>
        {/* Middle Text */}
        <div className="text-center justify-self-center">
          <div
            className="text-6xl font-bold text-yellow-300 mb-8 specialtext"
            // style={{ textShadow: "2px 2px 4px rgba(3, 138, 255)" }}
            style={{
              textShadow:
                "-3px -3px 0 rgba(3, 138, 255), 3px -3px 0 rgba(3, 138, 255), -3px 3px 0 rgba(3, 138, 255), 3px 3px 0 rgba(3, 138, 255)",
            }}
          >
            PokéSet
          </div>
          <a
            href="/cards"
            className="bg-red-600 text-white py-3 px-8 rounded-lg inline-block mb-4 shadow-lg"
          >
            <span className="text-2xl font-semibold tracking-wider">
              PTCG Pocket Encyclopedia
            </span>
          </a>
          <h2 className="text-5xl text-gray-700 mt-4 font-semibold"></h2>
        </div>

        {/* Bottom row with cards*/}
        <div className="relative -bottom-10" style={{ perspective: "1000px" }}>
          <div className="flex justify-center items-start gap-4 overflow-visible px-4">
            {bottomCards.map((card, index) => (
              <div
                key={index}
                style={{
                  margin: "0 8px",
                  transform: `rotateX(${card.tilt}deg) rotateZ(${card.rotate}deg) translateY(${card.translate}px)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.3s ease",
                  position: "relative",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-lg
                      ${shimmerIndex === index ? "animate-shimmer" : ""}`}
                  style={{
                    backgroundSize: "100% 200%",
                    mixBlendMode: "overlay",
                  }}
                >
                  {" "}
                </div>
                <img
                  src={`/cards/${card.card}.webp`}
                  alt={`Pokemon card ${index}`}
                  className="rounded-lg shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add reflective surface effect */}
      <div className="absolute bottom-0 right-0 h-32 bg-gradient-to-t from-white to-transparent opacity-20 w-full z-10" />
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0;
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out;
        }
        .specialtext {
          text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black,
            1px 1px 0 black;
        }
      `}</style>
    </div>
  );
};
