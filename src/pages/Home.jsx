import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import logo from "../assets/GeoTrack_logo.svg";
import { useNavigate } from "react-router-dom";

// Fix default marker icons (Leaflet + Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Updates map center when coordinates change
function MapUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 10, { animate: true });
    }
  }, [center, map]);

  return null;
}

export default function Home() {
  const [geoData, setGeoData] = useState(null);
  const [inputIP, setInputIP] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Safely compute coordinates once
  const coords = geoData?.loc?.split(",").map(Number);

  const loadUserGeo = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/home`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGeoData(res.data);
      setError("");
    } catch {
      setError("Failed to fetch geo info");
    }
  }, [API_URL, token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchInitialGeo = async () => {
      await loadUserGeo();
    };

    fetchInitialGeo();
  }, [token, loadUserGeo, navigate]);

  const fetchGeo = async (ip) => {
    try {
      const ipRegex =
        /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

      if (!ipRegex.test(ip)) {
        setError("Invalid IP address");
        return;
      }

      const res = await axios.get(`https://ipinfo.io/${ip}/geo`);
      setGeoData(res.data);
      setError("");

      setHistory((prev) => {
        const filtered = prev.filter((item) => item.ip !== ip);
        return [{ ip, geo: res.data }, ...filtered];
      });
    } catch {
      setError("Failed to fetch geo info");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGeo(inputIP);
    setInputIP("");
  };

  const handleClear = () => {
    setInputIP("");
    setError("");
    loadUserGeo();
  };

  const handleHistoryClick = (item) => {
    setGeoData(item.geo);
  };

  const toggleSelect = (ip) => {
    setSelected((prev) =>
      prev.includes(ip) ? prev.filter((i) => i !== ip) : [...prev, ip]
    );
  };

  const deleteSelected = () => {
    setHistory((prev) => prev.filter((item) => !selected.includes(item.ip)));
    setSelected([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="home_container">
      {/* Top Navigation */}
      <div className="top-nav">
        <img src={logo} alt="GeoTrack Logo" className="nav-logo" />
        <button onClick={handleLogout} className="nav-logout">
          Logout
        </button>
      </div>

      {/* Search + Info */}
      <div className="geo-track-container">
        <div className="geo-left">
          <p className="geo-instructions">
            Get instant geolocation details for any IP address.
          </p>
          <p className="geo-enter-ip">
            Enter an IP number to reveal its location:
          </p>

          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Enter IP address"
              value={inputIP}
              onChange={(e) => {
                setInputIP(e.target.value);
                setError("");
              }}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
            <button
              type="button"
              className="search-btn"
              style={{ backgroundColor: "#7e92fd" }}
              onClick={handleClear}
            >
              Clear
            </button>
          </form>

          {error && <p className="error-msg">{error}</p>}
        </div>

        <div className="geo-right">
          {geoData ? (
            <div className="geo-card">
              <p><strong>IP:</strong> {geoData.ip}</p>
              <p><strong>City:</strong> {geoData.city}</p>
              <p><strong>Region:</strong> {geoData.region}</p>
              <p><strong>Country:</strong> {geoData.country}</p>
              <p><strong>Coordinates:</strong> {geoData.loc}</p>
              <p><strong>ISP:</strong> {geoData.org}</p>
              <p><strong>Timezone:</strong> {geoData.timezone}</p>
            </div>
          ) : (
            <div className="geo-card placeholder">
              <p>IP details will appear here</p>
            </div>
          )}
        </div>
      </div>

      {/* History + Map */}
      {(history.length > 0 || coords) && (
        <div className="geo-track-container" style={{ marginTop: "20px" }}>
          <div className="geo-left">
            {history.length > 0 && (
              <div className="history-section">
                <h4>Search History</h4>

                {selected.length > 0 && (
                  <button onClick={deleteSelected} className="delete-btn">
                    Delete Selected
                  </button>
                )}

                <div className="history-list">
                  {history.map((item) => (
                    <div key={item.ip} className="history-item">
                      <input
                        type="checkbox"
                        checked={selected.includes(item.ip)}
                        onChange={() => toggleSelect(item.ip)}
                      />
                      <span
                        onClick={() => handleHistoryClick(item)}
                        className="history-ip"
                      >
                        {item.ip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="geo-right">
            {coords && (
              <div className="map-container">
                <MapContainer
                  center={coords}
                  zoom={10}
                  style={{ height: "250px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={coords}>
                    <Popup>
                      {geoData.city}, {geoData.country}
                    </Popup>
                  </Marker>
                  <MapUpdater center={coords} />
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
