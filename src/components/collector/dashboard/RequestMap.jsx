import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function RequestMap({
  center = [7.85286, 123.154913],
  zoom = 13,
  markers = [],
}) {
  return (
    <div className="h-96 w-full rounded-2xl shadow-md overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker
            key={m.id ?? `${m.position[0]}_${m.position[1]}`}
            position={m.position}
          >
            <Popup>{m.popup ?? m.label ?? "Marker"}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
