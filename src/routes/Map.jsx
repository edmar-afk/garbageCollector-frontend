import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Map() {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setPosition([latitude, longitude]);
        setAccuracy(accuracy);
      },
      (err) => {
        console.error(err);
        if (err.code === err.PERMISSION_DENIED) {
          alert(
            "Permission denied. Please allow location access to show your position."
          );
        }
      },
      { enableHighAccuracy: true }
    );

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setPosition([latitude, longitude]);
        setAccuracy(accuracy);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  };

  return (
    <div style={{ height: "500px", width: "100%", position: "relative" }}>
      <MapContainer
        center={position ?? [14.5995, 120.9842]}
        zoom={position ? 16 : 12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && (
          <>
            <Marker position={position} icon={DefaultIcon}>
              <Popup>
                You are here
                <br />
                Lat: {position[0].toFixed(6)}
                <br />
                Lng: {position[1].toFixed(6)}
              </Popup>
            </Marker>
            {accuracy && <Circle center={position} radius={accuracy} />}
          </>
        )}
      </MapContainer>

      <button
        onClick={requestLocation}
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        Enable GPS
      </button>
    </div>
  );
}
