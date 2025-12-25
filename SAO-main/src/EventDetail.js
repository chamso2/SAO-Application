import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './components/Header';
import Contacts from './components/Contacts';
import BookingModal from './components/BookingModal';
import { db, doc, getDoc } from './firebase'; // Ensure these are correctly imported

const EventDetail = () => {
  const { id } = useParams(); // Get event ID from URL parameters
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = doc(db, 'events', id); // Reference to the specific event document
        const docSnap = await getDoc(eventDoc); // Fetch document
        
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError('Failed to fetch event');
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]); // Fetch event data whenever ID changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleAddNowClick = () => {
    setShowModal(true);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex flex-col">
            <img src={event.img} alt={event.name} className="w-full rounded-t-xl object-cover h-96" />
            <div className="p-6">
              <h2 className="text-3xl font-bold mt-4">{event.name}</h2>
              <p className="text-lg mt-2">{event.date}</p>
              <p className="text-lg mt-2">{event.location}</p>
              <div className="mt-4">
                <strong>Description:</strong>
                <p className="text-gray-700 mt-2">{event.description}</p>
              </div>
              <div className="mt-4">
                <strong>Terms & Conditions:</strong>
                <p className="text-gray-700 mt-2">{event.terms}</p>
              </div>
              {event.price === 'paid' && (
                <div className="mt-4">
                  <strong>Price:</strong>
                  <p className="text-gray-700 mt-2">${event.priceAmount} ({event.priceOption})</p>
                </div>
              )}
              <div className="mt-6">
                <button
                  onClick={handleAddNowClick}
                  className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition duration-300 ml-4"
                >
                  Add NOW!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contacts />
      {showModal && <BookingModal message="Your booking has been successfully completed!" onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default EventDetail;
