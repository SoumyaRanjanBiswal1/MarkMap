import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import PinList from './PinList';
import './App.css';

const loadPinsFromStorage = () => {
  try {
    const savedPins = localStorage.getItem('pins');
    if (savedPins) {
      return JSON.parse(savedPins);
    }
    return [];
  } catch (error) {
    console.error("Error loading pins from localStorage:", error);
    return [];
  }
};

const App = () => {
  const [pins, setPins] = useState(loadPinsFromStorage);
  const [selectedPin, setSelectedPin] = useState(null);

  // Saving pins to localStorage
  useEffect(() => {
    localStorage.setItem('pins', JSON.stringify(pins));
  }, [pins]);

  const addPin = (newPin) => {
    setPins((prevPins) => [...prevPins, newPin]);
  };

  // delete pin
  const deletePin = (index) => {
    const updatedPins = pins.filter((_, i) => i !== index); 
    setPins(updatedPins); 
    localStorage.setItem('pins', JSON.stringify(updatedPins));
  };

  return (
    <div className="app">
      <MapComponent addPin={addPin} selectedPin={selectedPin} />
      <PinList pins={pins} setSelectedPin={setSelectedPin} deletePin={deletePin} />
    </div>
  );
};

export default App;
