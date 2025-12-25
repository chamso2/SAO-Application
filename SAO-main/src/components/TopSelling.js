import React from 'react';
import EventCard from './EventCard'; // Import the new component

function TopSelling({ events }) {
  return (
    <section className="bg-white p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Top Selling</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event) => (
              <EventCard event={event} /> 
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopSelling;
