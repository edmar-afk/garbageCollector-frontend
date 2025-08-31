import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import SendRequest from "./SendRequest";

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
      alert("Geolocation is not supported by your phone");
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
    <div className="relative w-full h-[500px]">
      <MapContainer
        center={position ?? [7.85286, 123.154913]}
        zoom={16}
        scrollWheelZoom={true}
        className="w-full h-[800px]"
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
            {accuracy && <Circle center={position} />}
          </>
        )}
      </MapContainer>

      {/* Remove old button */}
      <SendRequest
        requestLocation={requestLocation}
        locationSet={!!position}
        position={position}
      />
    </div>
  );
}
