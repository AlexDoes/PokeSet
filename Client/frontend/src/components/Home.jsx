import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Particles from "./ui/particles";

export const Home = () => {
  const [shimmerIndex, setShimmerIndex] = useState(null);
  const navigate = useNavigate();
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
      <Particles
        className="absolute h-fit w-full"
        staticity={50}
        quantity={125}
      />
      <div className="max-w-7xl mx-auto border-red-300 flex flex-col h-full">
        {/* Top row with cards */}
        <div className="relative h-1/3">
          <div className="absolute left-8 transform top-32 scale-[.9]">
            <Link className="" to="/cards/a1-234">
              <img
                src="/card-assets/a1-234.webp"
                alt="Pokemon card"
                className="rounded-lg shadow-xl"
                width="160px"
                height="280px"
              ></img>
            </Link>
          </div>
          <div className="absolute left-[20%] transform top-8 scale-[1.1]">
            <Link className="" to="/cards/a1-281">
              <img
                src="/card-assets/a1-281.webp"
                alt="Pokemon card"
                className="rounded-lg shadow-xl"
                width="160px"
                height="280px"
              />
            </Link>
          </div>
          <div className="absolute right-[20%] transform top-8 scale-[1.1]">
            <Link className="" to="/cards/a1-258">
              <img
                src="/card-assets/a1-258.webp"
                alt="Pokemon card"
                className="rounded-lg shadow-xl"
                width="160px"
                height="280px"
              />
            </Link>
          </div>
          <div className="absolute right-8 transform top-32 scale-[.9]">
            <Link className="" to="/cards/a1-283">
              <img
                src="/card-assets/a1-283.webp"
                alt="Pokemon card"
                className="rounded-lg shadow-xl"
                width="160px"
                height="280px"
              />
            </Link>
          </div>
        </div>
        {/* Middle Text */}
        <div className="text-center justify-self-center w-full h-fit">
          <div
            className="text-6xl font-bold text-yellow-300 mb-8 specialtext"
            style={{
              textShadow:
                "-3px -3px 0 rgba(3, 138, 255), 3px -3px 0 rgba(3, 138, 255), -3px 3px 0 rgba(3, 138, 255), 3px 3px 0 rgba(3, 138, 255)",
            }}
          >
            PokéSet
          </div>
          <Link
            to="/cards"
            className="bg-red-600 text-white py-3 px-8 rounded-lg inline-block mb-4 shadow-lg relative"
          >
            <span className="text-2xl font-semibold tracking-wider">
              PTCG Pocket Encyclopedia
            </span>
          </Link>
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
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/cards/${card.card}`)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-lg
                      ${shimmerIndex === index ? "animate-shimmer" : ""}`}
                  style={{
                    backgroundSize: "100% 100%",
                    mixBlendMode: "overlay",
                  }}
                ></div>
                <Link
                  key={index}
                  to={`/cards/${card.card}`}
                  className="bg-white"
                >
                  <img
                    src={`/card-assets/${card.card}.webp`}
                    alt={`Pokemon card ${index}`}
                    className="rounded-lg shadow-lg"
                    max-width="160px"
                    max-height="280px"
                    width={160}
                    height={280}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
