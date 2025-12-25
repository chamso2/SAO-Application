import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth, db } from './firebase';
import HomePage from './HomePage';
import AddEvent from './AddEvent';
import EventDetail from './EventDetail';
import Login from './Login';

function App() {
  

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const [events, setEvents] = useState([
    { id: 1, name: 'Chems Night', date: '30 Apr', location: 'Ifrane, Morocco', img: 'https://i.postimg.cc/zvB4M5g8/Whats-App-Image-2024-07-02-at-21-48-34-7699c70b.jpg', description: 'Event description here', terms: 'Terms and conditions here' },
    { id: 2, name: 'Trip to Marrakech', date: '14 Sep', location: 'Marrakech, Morocco', img: 'https://i.postimg.cc/RVC0SncZ/Whats-App-Image-2024-07-02-at-21-48-34-827259a3.jpg', description: 'Event description here', terms: 'Terms and conditions here' },
    // other events...
  ]);

  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<HomePage events={events} />} />
        <Route path="/AddEvent" element={<AddEvent addEvent={addEvent} />} />
        <Route path="/event/:id" element={<EventDetail events={events} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
