import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "../assets/api";
import logo from "../assets/images/logo.png";
export default function CollectionHomepage() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [profiles, setProfiles] = useState({}); // store profiles by user_id

  useEffect(() => {
    api.get("/api/pending-requests/").then((res) => {
      setPendingRequests(res.data);
    });
  }, []);

  useEffect(() => {
    pendingRequests.forEach((req) => {
      if (req.user_id && !profiles[req.user_id]) {
        api.get(`/api/profile/${req.user_id}/`).then((res) => {
          setProfiles((prev) => ({ ...prev, [req.user_id]: res.data }));
        });
      }
    });
  }, [pendingRequests]);

  const createProfileIcon = (profilePicture) => {
    return L.divIcon({
      className: "",
      html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div 
          style="background: white; border-radius: 50%; padding: 4px; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 4px rgba(0,0,0,0.3);">
          <img 
            src="${profilePicture}" 
            style="width:40px; height:40px; border-radius:50%;" 
          />
        </div>
        <div 
          style="width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 15px solid white; margin-top: -2px;">
        </div>
      </div>
    `,
      iconAnchor: [20, 55],
    });
  };

  return (
    <div className="relative w-full h-[500px]">
      <MapContainer
        center={[7.855199, 123.159670]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-[800px]"
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>, 
               &copy; <a href="https://www.usgs.gov/">USGS</a>, 
               &copy; <a href="https://www.nasa.gov/">NASA</a>'
        />

        {pendingRequests.map((req, index) => {
          if (!req.location) return null;

          const [lat, lng] = req.location
            .split(",")
            .map((coord) => parseFloat(coord.trim()));

          if (isNaN(lat) || isNaN(lng)) return null;

          const profilePic = profiles[req.user_id]?.profile_picture || logo;

          return (
            <Marker
              key={index}
              position={[lat, lng]}
              icon={createProfileIcon(profilePic)}
            >
              <Popup>
                <div className="text-xs">
                  <div className="mb-2">
                    {req.first_name} from {req.last_name} requested a garbage
                    pickup on{" "}
                    <b>
                      {new Date(req.date_requested)
                        .toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(",", ".")}
                    </b>
                  </div>

                  <div>
                    <p>
                      <strong>Garbage Type:</strong> {req.garbage_type || "N/A"}
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
