import React, { useState } from "react";

const Slider = () => {
  const [selectedNumber, setSelectedNumber] = useState(8);

  return (
    <div className="flex flex-col my-2 ">
      <div
        style={{ scrollbarWidth: "none" }}
        className="w-full dark:bg-[#040c1d] border dark:border-none  rounded-lg shadow-lg overflow-x-scroll "
      >
        <div className="flex  items-center space-x-2 px-2 py-4">
          {Array.from({ length: 60 }, (_, i) =>
            i > 6 ? (
              <div
                key={i}
                className={`min-w-12  h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200
                ${
                  selectedNumber === i + 1
                    ? "dark:bg-[#0d3c5f] bg-black  dark:text-white"
                    : " text-gray-800 dark:text-white"
                }
              `}
                onClick={() => setSelectedNumber(i + 1)}
              >
                {i + 1}
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider;
