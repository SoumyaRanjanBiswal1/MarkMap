import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

// pin icon
const pinIconUrl = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
const customIcon = new L.Icon({
  iconUrl: pinIconUrl,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
});

const RecenterMap = ({ selectedPin }) => {
  const map = useMapEvents({});

  useEffect(() => {
    if (selectedPin) {
      map.setView([selectedPin.lat, selectedPin.lng], 13, { animate: true });
    }
  }, [selectedPin, map]);

  return null;
};

const MapComponent = ({ addPin, selectedPin }) => {
  const [newPin, setNewPin] = useState(null);
  const [remark, setRemark] = useState('');
  const markerRef = useRef(null);

  const handleMapClick = async (event) => {
    const { lat, lng } = event.latlng;
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const address = response.data.display_name || "Address not found";
      setNewPin({ lat, lng, address });
      setRemark(''); 
    } catch (error) {
      console.error("Error fetching address:", error);
      setNewPin({ lat, lng, address: "Address not found" });
    }
  };

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup(); // pop up
    }
  }, [newPin]);

  const handleSavePin = () => {
    if (newPin) {
      const pinData = { ...newPin, remark };
      addPin(pinData);
      setNewPin(null); 
      setRemark('');
    }
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <MapContainer center={[20.2961, 85.8245]} zoom={13} style={{ height: '100vh', width: '70vw' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapEvents />
      {newPin && (
        <Marker
          position={[newPin.lat, newPin.lng]}
          icon={customIcon}
          ref={markerRef} 
        >
          <Popup>
            <div>
              <h4>Add Remark</h4>
              <input
                type="text"
                value={remark}
                placeholder="Enter a remark"
                onChange={(e) => setRemark(e.target.value)}
              />
              <button onClick={handleSavePin}>Save</button>
              <p><strong>Address:</strong> {newPin.address}</p>
            </div>
          </Popup>
        </Marker>
      )}
      {selectedPin && (
        <Marker position={[selectedPin.lat, selectedPin.lng]} icon={customIcon}>
          <Popup>
            <p><strong>Selected Pin Location</strong></p>
            <p>{selectedPin.address}</p>
          </Popup>
        </Marker>
      )}
      <RecenterMap selectedPin={selectedPin} />
    </MapContainer>
  );
};

export default MapComponent;
