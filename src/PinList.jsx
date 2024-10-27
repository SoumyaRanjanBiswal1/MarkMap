import React from 'react';

const PinList = ({ pins, setSelectedPin, deletePin }) => (
  <div className="sidebar">
    <h3>Saved Pins</h3>
    <div className="pin-list">
      {pins.length === 0 ? (
        <p>No pins added yet.</p>
      ) : (
        pins.map((pin, index) => (
          <div key={index} className="pin-item">
            <div onClick={() => setSelectedPin(pin)}>
              <strong>Remark:</strong> {pin.remark || 'No remark'}
              <br />
              <strong>Address:</strong> {pin.address || 'No address'}
            </div>
            <button className="delete-pin-button" onClick={() => deletePin(index)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export default PinList;
