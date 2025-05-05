import React, { useEffect, useState } from "react";
import "./Theatres.css";
import Navbar from "../../components/Navbar/Navbar";
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Theatres = () => {
  const [location, setLocation] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [permissionAsked, setPermissionAsked] = useState(false);

  // Custom theatre marker icon
  const theatreIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3097/3097130.png",
    iconSize: [32, 32],
  });

  // Request Location Permission
  const requestLocationPermission = () => {
    setPermissionAsked(true);
    setLoading(true);
    setError("");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          fetchTheatres(userLocation.lat, userLocation.lng);
        },
        () => {
          setError("Location access denied. Please enable location permissions.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  // Fetch nearby theatres using OpenStreetMap (Overpass API)
  const fetchTheatres = async (lat, lng) => {
    setLoading(true);
    const query = `
      [out:json];
      node
        ["amenity"="cinema"]
        (around:5000, ${lat}, ${lng});
      out;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setTheatres(data.elements);
    } catch (error) {
      setError("Failed to fetch theatres. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Open Directions in Google Maps
  const openDirections = (theatreLat, theatreLng) => {
    if (location) {
      const googleMapsUrl = `https://www.google.com/maps/dir/${location.lat},${location.lng}/${theatreLat},${theatreLng}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  return (
    <div className="theatrecontainner">
     
      <h1 className="title">Find Nearby Theatres</h1>

      

      {/* Permission Button Container */}
      {!permissionAsked ? (
        <div className="location-container">
          <button className="location-btn" onClick={requestLocationPermission}>
            Allow Location Access
          </button>
        </div>
      ) : loading ? (
        <p className="loading">Fetching your location...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : location ? (
        <div className="theatres-container">
          {/* Map Section */}
          <MapContainer center={location} zoom={14} className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location}>
              <Popup>You are here</Popup>
            </Marker>
            {theatres.map((theatre, index) => (
              <Marker key={index} position={[theatre.lat, theatre.lon]} icon={theatreIcon}>
                <Popup>{theatre.tags.name || "Unknown Theatre"}</Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Theatre List */}
          <div className="theatre-list">
            <h2>Nearby Theatres</h2>
            {theatres.length > 0 ? (
              <ul>
                {theatres.map((theatre, index) => (
                  <li key={index}>
                    🎬 {theatre.tags.name || "Unknown Theatre"}
                    <button className="directions-btn" onClick={() => openDirections(theatre.lat, theatre.lon)}>
                      Get Directions
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No theatres found nearby.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="error">Unable to load map.</p>
      )}
    </div>
  );
};

export default Theatres;
