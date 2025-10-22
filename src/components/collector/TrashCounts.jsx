import React from "react";
import biodegradableImg from "../../assets/images/garbages/biodegradable.svg";
import nonbiodegradableImg from "../../assets/images/garbages/non-biodegradable.svg";
import recyclableImg from "../../assets/images/garbages/recycle.svg";
import residualImg from "../../assets/images/garbages/landfill.svg";
import hazardousImg from "../../assets/images/garbages/hazardous-material.svg";
import ewasteImg from "../../assets/images/garbages/ecology-and-environment.svg";
import liquidImg from "../../assets/images/garbages/liquid.svg";
import constructionImg from "../../assets/images/garbages/carriage-wheel.svg";

const images = {
  biodegradable: biodegradableImg,
  nonbiodegradable: nonbiodegradableImg,
  recyclable: recyclableImg,
  residual: residualImg,
  hazardous: hazardousImg,
  ewaste: ewasteImg,
  liquid: liquidImg,
  construction: constructionImg,
};

function TrashCounts({ garbageType, count }) {
  const typeKey = garbageType?.toLowerCase().replace(/\s/g, "");
  const imgSrc = images[typeKey] || biodegradableImg;

  return (
    <div className="bg-blue-400 rounded-xl shadow-lg p-4 w-[180px] flex-shrink-0">
      <div className="flex flex-row items-center gap-2">
        <img src={imgSrc} className="w-8 mb-2" alt={garbageType} />
        <div className="flex flex-row gap-2 items-center">
          <b className="text-2xl text-green-100 font-extrabold">{count}</b>
          <p className="text-[10px] leading-tight">garbage picked up</p>
        </div>
      </div>
      <p className="capitalize">{garbageType}</p>
    </div>
  );
}

export default TrashCounts;
