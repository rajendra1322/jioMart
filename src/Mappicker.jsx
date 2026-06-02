import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const LocationMarker = ({ setLocation, selectedLocation }) => {
  const [position, setPosition] = useState({
    lat: 15.2993,
    lng: 74.1240,
  });
  const map = useMap();
  const markerPosition = selectedLocation || position;

  useEffect(() => {
    if (!selectedLocation) return;

    map.flyTo([selectedLocation.lat, selectedLocation.lng], 15, {
      duration: 0.8,
    });
  }, [map, selectedLocation]);

  useMapEvents({
    click(e) {
      const latlng = e.latlng;
      setPosition(latlng);
      setLocation(latlng);
    },
  });

  return (
    <Marker
      position={markerPosition}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const latlng = marker.getLatLng();

          setPosition(latlng);
          setLocation(latlng);
        },
      }}
    />
  );
};

const MapPicker = ({ setLocation, selectedLocation }) => {
  return (
    <MapContainer
      center={[
        selectedLocation?.lat || 15.2993,
        selectedLocation?.lng || 74.1240,
      ]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker setLocation={setLocation} selectedLocation={selectedLocation} />
    </MapContainer>
  );
};

export default MapPicker;
