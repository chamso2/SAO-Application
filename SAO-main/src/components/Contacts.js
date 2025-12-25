import React from 'react';

const contacts = [
  { name: 'Chaimae Akkati', title: 'S&C Manager', email: 'C.Akkati@aui.ma', phone: '001-123-456-7890', img: 'contact1.jpg' },
  { name: 'Loubna Blayachi', title: 'Sustainability and Emission Coordinator', email: 'L.Blayachi@aui.ma', phone: '001-987-654-3210', img: 'contact2.jpg' },
  { name: 'Ayoub Bounasser', title: 'Student Development Officer', email: 'A.Bounasser@aui.ma', phone: '001-456-789-0123', img: 'contact3.jpg' },
  { name: 'Driss Ouattabou', title: 'Club Advisor', email: 'D.Ouattabou@aui.ma', phone: '001-321-654-0987', img: 'contact4.jpg' },
];

function Contacts() {
  return (
    <section className="bg-gray-100 p-4">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 flex justify-center">Contacts</h2>
        <div className="flex flex-wrap ">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-white shadow p-4 m-auto w-5/12 mt-8 rounded-xl">
              <img src={contact.img} alt={contact.name} className="w-full h-5 object-cover rounded-lg" />
              <h3 className="text-xl font-bold mt-2">{contact.name}</h3>
              <p>{contact.title}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <button className="bg-primary rounded-lg text-white px-4 py-2 mt-2">Contact Now</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contacts;
