import React, { useState } from "react";
import RequestMap from "./RequestMap";
import RequestLists from "./RequestLists";
import CollectorHomepage from "../../../routes/CollectorHomepage";
function Requests() {
  const [view, setView] = useState("map");

  return (
    <>
      <div className="pt-14 pb-8 bg-green-100 px-4 text-center">
        Welcome, Garbage Collector! Keep the community clean by managing
        residents’ garbage disposal requests right here.
      </div>

      <div className="flex flex-row items-center p-4 justify-between">
        <p className="text-sm font-bold">Requests Overview</p>
        <div className="flex flex-row items-center gap-2 text-xs">
          <button
            onClick={() => setView("list")}
            className={`${
              view === "list" ? "font-bold text-green-600" : "text-gray-500"
            }`}
          >
            List View
          </button>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => setView("map")}
            className={`${
              view === "map" ? "font-bold text-green-600" : "text-gray-500"
            }`}
          >
            Map View
          </button>
        </div>
      </div>

      <div className="p-4">
        {view === "list" ? <RequestLists /> : <CollectorHomepage />}
      </div>
    </>
  );
}

export default Requests;
