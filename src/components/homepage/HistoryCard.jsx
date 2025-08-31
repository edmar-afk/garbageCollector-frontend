import React from "react";

const HistoryCard = ({ date, status, message }) => {
  let dotColor = "bg-gray-700";
  let borderColor = "border-gray-300";
  let statusColor = "text-gray-700";
  let displayStatus = status;

  if (status === "Pending") {
    dotColor = "bg-orange-500";
    borderColor = "border-orange-500";
    statusColor = "text-orange-500";
    displayStatus = "Awaiting for Pickup";
  }
  if (status === "Success") {
    dotColor = "bg-green-600";
    borderColor = "border-green-600";
    statusColor = "text-green-600";
    displayStatus = "Garbage Has Been Transported";
  }

  return (
    <div className="relative border-l border-gray-700 -mb-2">
      <div className="flex overflow-hidden px-8">
        <div className="relative">
          <div
            className={`absolute z-20 w-3 h-3 rounded-full mt-1.5 -left-1.5 ${dotColor}`}
          />
          <div className={`h-[100px] border-l-2 -ml-[1px] mt-2 ${borderColor}`} />
        </div>
        <div className="pl-4 pt-1.5">
          <p className="mb-1 text-xs text-gray-400">{date}</p>
          <p className={`text-md font-semibold ${statusColor}`}>{displayStatus}</p>
          <p className="mb-4 text-sm text-gray-500 mt-2"><b>Garbage Type: </b>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
