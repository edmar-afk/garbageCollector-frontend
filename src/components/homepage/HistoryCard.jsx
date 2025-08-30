import React from "react";

const HistoryCard = () => {
  return (
    <div className="relative border-l border-gray-700 -mb-2">
      <div className="flex overflow-hidden px-8">
        <div className="relative">
          <div className="absolute z-20 w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-gray-900 bg-gray-700" />
          <div className="h-[100px] border-l-2 border-gray-300 -ml-[1px] mt-2" />
        </div>
        <div className="pl-4 pt-1.5">
          <p className="mb-1 text-xs text-gray-400">Aug. 29 2025, 10:14pm</p>
          <p className="text-md font-semibold text-green-900">
            Garbage Pickup Success
          </p>
          <p className="mb-4 text-sm text-gray-500">
            Your Garbage has been picked up
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
