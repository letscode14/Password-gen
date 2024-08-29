import React from "react";

export default function Loading() {
  return (
    <div className="typing-loader">
      <span className="dot p-1 bg-white  rounded-full"></span>
      <span className="dot p-1 bg-white rounded-full"></span>
      <span className="dot p-1 bg-white rounded-full"></span>
    </div>
  );
}

export function Loading2() {
  return (
    <div className="typing-loader">
      <span className="dot p-1 bg-black  rounded-full"></span>
      <span className="dot p-1 bg-black rounded-full"></span>
      <span className="dot p-1 bg-black rounded-full"></span>
    </div>
  );
}
