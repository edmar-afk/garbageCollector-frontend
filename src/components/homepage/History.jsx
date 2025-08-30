import React from "react";
import HistoryCard from "./HistoryCard";

const History = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 mt-4">
        <p className="text-sm font-bold">Disposal History</p>
        <div className="flex flex-row items-center">
          <p className="text-sm font-semibold text-blue-700">Ongoing</p>
          <p className="mx-2 font-extralight text-2xl text-gray-300">|</p>
          <p className="text-sm font-semibold text-blue-700">Transported</p>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </div>
    </div>
  );
};

export default History;
