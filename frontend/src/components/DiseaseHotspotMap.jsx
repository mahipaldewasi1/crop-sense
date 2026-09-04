import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
function MapRecenter({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location?.lat && location?.lng) {
      map.setView(
        [location.lat, location.lng],
        map.getZoom(),
        { animate: true }
      );
    }
  }, [location, map]);

  return null;
}
export default function DiseaseHotspotMap({
  location,
  hotspots = [],
}) {
  if (!location?.lat || !location?.lng) return null;

  return (
    <div
      style={{
        width: "100%",
        height: 380,
        borderRadius: 18,
        overflow: "hidden",
        border: "1px solid #D9DFD0",
        marginBottom: 24,
        position: "relative",
isolation: "isolate",
      }}
    >
<MapContainer
  center={[location.lat, location.lng]}
  zoom={11}
  style={{ width: "100%", height: "100%" }}
>
  <MapRecenter location={location} />

  <TileLayer
    attribution="&copy; OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />



        {/* Farmer's current location */}
        <CircleMarker
          center={[location.lat, location.lng]}
          radius={9}
          pathOptions={{
            color: "#1F5136",
            fillColor: "#E9A11B",
            fillOpacity: 1,
          }}
        >
          <Popup>
            <strong>Your location</strong>
            <br />
            {location.label}
          </Popup>
        </CircleMarker>

        {/* Disease hotspots */}
        {hotspots.map((spot) => (
          <CircleMarker
            key={spot.id}
            center={[spot.lat, spot.lng]}
            radius={Math.min(30, Math.max(10, 8 + spot.cases))}
            pathOptions={{
  color:
    spot.risk === "High"
      ? "#B9472E"
      : spot.risk === "Moderate"
      ? "#D88916"
      : "#5C8A57",
  fillColor:
    spot.risk === "High"
      ? "#E56B4F"
      : spot.risk === "Moderate"
      ? "#F0B44D"
      : "#8FB286",
  fillOpacity: 0.4,
  weight: 2,
}}
          >
            <Popup>
  <strong>{spot.disease}</strong>
  <br />
  Crop: {spot.crop}
  <br />
  Reported cases: {spot.cases}
  <br />
  Risk level: <strong>{spot.risk}</strong>
  <br />
  <br />
  Monitor nearby crops for early symptoms.
</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}