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
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setPermissionDenied(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        console.log("Initial position:", latitude, longitude);
        setPosition([latitude, longitude]);
        setAccuracy(accuracy);

        const watchId = navigator.geolocation.watchPosition(
          (pos) => {
            const { latitude, longitude, accuracy } = pos.coords;
            console.log("Updated position:", latitude, longitude);
            setPosition([latitude, longitude]);
            setAccuracy(accuracy);
          },
          (err) => console.error(err),
          { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
      },
      (err) => {
        console.error("Permission denied or error:", err);
        setPermissionDenied(true);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={position ?? [14.5995, 120.9842]}
        zoom={position ? 16 : 12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {permissionDenied && (
          <Marker position={[14.5995, 120.9842]} icon={DefaultIcon}>
            <Popup>Location access denied. Showing default (Manila)</Popup>
          </Marker>
        )}
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
      <p>Updated</p>
    </div>
  );
}
