/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import api from "../assets/api";
import logo from "../assets/images/logo.png";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";

export default function CollectionHomepage() {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [profiles, setProfiles] = useState({});

  const fetchPendingRequests = () => {
    api.get("/api/pending-requests/").then((res) => {
      setPendingRequests(res.data);
    });
  };

  useEffect(() => {
    fetchPendingRequests();
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

  const [loadingRequests, setLoadingRequests] = useState({});

  const handleMarkPickedUp = (requestId) => {
    setLoadingRequests((prev) => ({ ...prev, [requestId]: true }));

    api
      .post(`/api/send-sms/${requestId}/`)
      .then(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Garbage Picked Up, residents will be notified via SMS",
          showConfirmButton: false,
          timer: 5000,
        });
        fetchPendingRequests();
      })
      .catch(() => {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Failed to mark as picked up",
          showConfirmButton: false,
          timer: 5000,
        });
      })
      .finally(() => {
        setLoadingRequests((prev) => ({ ...prev, [requestId]: false }));
      });
  };

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
        center={[7.855199, 123.15967]}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-[500px]"
      >
        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />

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
              <Popup minWidth={100} maxWidth={200}>
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
                    <button
                      onClick={() => handleMarkPickedUp(req.id)}
                      disabled={loadingRequests[req.id]}
                      className={`p-2 text-white rounded-sm ${
                        loadingRequests[req.id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600"
                      }`}
                    >
                      {loadingRequests[req.id] ? (
                        <span className="flex items-center gap-2">
                          <CircularProgress size={16} color="inherit" />
                          Marking...
                        </span>
                      ) : (
                        "Mark as Picked Up"
                      )}
                    </button>
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
