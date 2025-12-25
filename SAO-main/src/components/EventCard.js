import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <Link to={`/event/${event.id}`} className="text-decoration-none">
      <div className="bg-white p-4 m-4 rounded-xl shadow w-96 hover:shadow-lg transition-shadow relative">
        {event.img && (
          <div className="relative">
            <img src={event.img} alt={event.name} className="w-full h-32 object-cover rounded-t-xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-t-xl flex justify-between p-4">
              <div className="text-white">
                <p className="text-lg font-bold">{event.date}</p>
                <p className="text-base">{event.time}</p>
              </div>
              <div className="text-white">
                <p className="text-lg font-bold">AUD17</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex mt-4">
          <div className="flex flex-col items-center mr-4">
            <p className="text-lg font-bold">NOV</p>
            <p className="text-3xl font-bold">02</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{event.name}</h3>
            <p className="mt-1">
              {event.price === 'free' ? (
                <span className="text-green-500 font-bold">Free</span>
              ) : (
                <span className="text-red-500 font-bold">${event.priceAmount} ({event.priceOption})</span>
              )}
            </p>
            <p className="mt-2 flex items-center">
              <span className="mr-1">📍</span> {event.location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
