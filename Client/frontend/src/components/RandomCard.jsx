import React from "react";
import { Navigate } from "react-router-dom";

const RandomCard = () => {
  const getRandomCard = () => {
    return `/cards/A1-${String(Math.floor(Math.random() * 226)).padStart(
      3,
      "0"
    )}`;
  };
  console.log(getRandomCard());
  return <Navigate to={getRandomCard()} replace />;
};

export default RandomCard;
