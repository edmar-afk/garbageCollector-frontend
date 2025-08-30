import { useState, useEffect } from "react";
import biodegradableImg from "../../assets/images/garbages/biodegradable.svg";
import nonbiodegradableImg from "../../assets/images/garbages/non-biodegradable.svg";
import recyclableImg from "../../assets/images/garbages/recycle.svg";
import residualImg from "../../assets/images/garbages/landfill.svg";
import hazardousImg from "../../assets/images/garbages/hazardous-material.svg";
import ewasteImg from "../../assets/images/garbages/ecology-and-environment.svg";
import liquidImg from "../../assets/images/garbages/liquid.svg";
import constructionImg from "../../assets/images/garbages/carriage-wheel.svg";

import CheckIcon from "@mui/icons-material/Check";

function GarbageTypes() {
  const garbageOptions = [
    { id: "biodegradable", label: "Biodegradable", img: biodegradableImg },
    {
      id: "nonbiodegradable",
      label: "Non-Biodegradable",
      img: nonbiodegradableImg,
    },
    { id: "recyclable", label: "Recyclable", img: recyclableImg },
    { id: "residual", label: "Residual", img: residualImg },
    { id: "hazardous", label: "Hazardous", img: hazardousImg },
    { id: "ewaste", label: "E-Waste", img: ewasteImg },
    { id: "liquid", label: "Liquid", img: liquidImg },
    { id: "construction", label: "Construction", img: constructionImg },
  ];

  const [selected, setSelected] = useState([]);

  // Debugging useEffect (optional)
  useEffect(() => {
    console.log("Selected garbage types:", selected);
  }, [selected]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full my-4">
      <div className="w-full overflow-x-auto">
        <ul className="flex flex-row gap-4 snap-x snap-mandatory">
          {garbageOptions.map((option) => (
            <li key={option.id} className="flex-shrink-0 snap-center">
              <button
                type="button"
                onClick={() => toggleSelect(option.id)}
                className={`relative w-44 inline-flex flex-col items-center justify-center px-5 py-3 border-2 rounded-lg cursor-pointer ${
                  selected.includes(option.id)
                    ? "border-green-400 border-4"
                    : "border-gray-200"
                }`}
              >
                {/* Checkmark */}
                {selected.includes(option.id) && (
                  <div className="absolute top-1 left-1 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 z-10">
                    <CheckIcon className="text-white" fontSize="small" />
                  </div>
                )}

                {/* Image */}
                <img
                  src={option.img}
                  alt={option.label}
                  className="mb-2 w-7 h-7"
                />

                {/* Text */}
                <div className="text-xs font-semibold text-center text-white">
                  {option.label}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GarbageTypes;
