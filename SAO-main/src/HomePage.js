import React from 'react';
import Header from './components/Header';
import UpcomingEvents from './components/UpcomingEvents';
import TopSelling from './components/TopSelling';
import Contacts from './components/Contacts';
import SearchHeader from './components/SearchHeader';

function HomePage({ events }) {
  return (
    <div>
      <Header />
      <SearchHeader />
      <UpcomingEvents events={events} />
      <TopSelling events={events} />
      <Contacts />
    </div>
  );
}

export default HomePage;
