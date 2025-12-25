import React, { useState } from 'react';
import Header from './components/Header';
import Contacts from './components/Contacts';
import { db, collection, addDoc, storage, ref, uploadBytes, getDownloadURL } from './firebase';

const AddEvent = ({ addEvent }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    terms: '',
    img: null,
    studentLimit: '',
    price: 'free',
    priceAmount: '',
    priceOption: '',
    duration: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img') {
      setFormData({ ...formData, img: files[0] });
    } else if (name === 'price') {
      // Reset price options if switching to free
      setFormData({ ...formData, price: value, priceAmount: '', priceOption: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Event name is required';
    if (!formData.date) newErrors.date = 'Event date is required';
    if (!formData.location) newErrors.location = 'Event location is required';
    if (!formData.description) newErrors.description = 'Event description is required';
    if (!formData.terms) newErrors.terms = 'Terms and conditions are required';
    if (formData.price === 'paid') {
      if (!formData.priceAmount) newErrors.priceAmount = 'Price amount is required';
      if (!formData.priceOption) newErrors.priceOption = 'Payment method is required';
    }
    if (!formData.img) newErrors.img = 'Event image is required';
    if (!formData.studentLimit) newErrors.studentLimit = 'Student limit is required';
    if (!formData.duration) newErrors.duration = 'Event duration is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debugging line
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        let imgUrl = null;

        if (formData.img) {
          const imgRef = ref(storage, `events/${formData.img.name}`);
          const snapshot = await uploadBytes(imgRef, formData.img);
          imgUrl = await getDownloadURL(snapshot.ref);
        }

        const eventData = {
          name: formData.name,
          date: formData.date,
          location: formData.location,
          description: formData.description,
          terms: formData.terms,
          img: imgUrl,
          studentLimit: formData.studentLimit,
          price: formData.price,
          priceAmount: formData.priceAmount || null,
          priceOption: formData.priceOption || null,
          duration: formData.duration,
        };

        const eventsCollection = collection(db, 'events');
        await addDoc(eventsCollection, eventData);

        setFormData({
          name: '',
          date: '',
          location: '',
          description: '',
          terms: '',
          img: null,
          studentLimit: '',
          price: 'free',
          priceAmount: '',
          priceOption: '',
          duration: '',
        });
        setShowModal(true);
      } catch (error) {
        console.error('Error adding event: ', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col">
      <Header />

      <form className="p-4 px-20 space-y-4" onSubmit={handleSubmit}>
        <label
          htmlFor="img"
          className="flex items-center p-4 gap-3 rounded-3xl border border-gray-300 border-dashed bg-gray-50 cursor-pointer mb-4"
        >
          <img
            className="h-16 w-auto"
            src="https://demo.tailus.io/images/icons/upload.webp"
            alt=""
          />
          <div className="space-y-2">
            <h4 className="text-base font-semibold text-gray-700">Upload a file</h4>
            <span className="text-sm text-gray-500">Max 2 MB</span>
          </div>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/png, image/jpeg"
            hidden
            onChange={handleChange}
          />
        </label>
        {errors.img && <p className="text-red-500">{errors.img}</p>}

        <input
          className="inputEvent"
          type="text"
          name="name"
          placeholder="Write the name of the event"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}

        <input
          className="inputEvent"
          type="date"
          name="date"
          placeholder="Select the date"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="text-red-500">{errors.date}</p>}

        <input
          className="inputEvent"
          type="text"
          name="location"
          placeholder="Write the location"
          value={formData.location}
          onChange={handleChange}
        />
        {errors.location && <p className="text-red-500">{errors.location}</p>}

        <textarea
          className="inputEvent"
          name="description"
          placeholder="Add a description for the event"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        {errors.description && <p className="text-red-500">{errors.description}</p>}

        <textarea
          className="inputEvent"
          name="terms"
          placeholder="Add any Terms & Conditions"
          value={formData.terms}
          onChange={handleChange}
        ></textarea>
        {errors.terms && <p className="text-red-500">{errors.terms}</p>}

        <input
          className="inputEvent"
          type="number"
          name="studentLimit"
          placeholder="Enter student limit"
          value={formData.studentLimit}
          onChange={handleChange}
        />
        {errors.studentLimit && <p className="text-red-500">{errors.studentLimit}</p>}

        <select
          className="inputEvent"
          name="price"
          value={formData.price}
          onChange={handleChange}
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        {formData.price === 'paid' && (
          <>
            <input
              className="inputEvent"
              type="number"
              name="priceAmount"
              placeholder="Enter amount to be paid"
              value={formData.priceAmount}
              onChange={handleChange}
            />
            {errors.priceAmount && <p className="text-red-500">{errors.priceAmount}</p>}

            <select
              className="inputEvent"
              name="priceOption"
              value={formData.priceOption}
              onChange={handleChange}
            >
              <option value="">Select payment method</option>
              <option value="cash">Pay in Cash</option>
              <option value="wallet">Deduct from Wallet</option>
            </select>
            {errors.priceOption && <p className="text-red-500">{errors.priceOption}</p>}
          </>
        )}

        <input
          className="inputEvent"
          type="text"
          name="duration"
          placeholder="Enter event duration (hours/days)"
          value={formData.duration}
          onChange={handleChange}
        />
        {errors.duration && <p className="text-red-500">{errors.duration}</p>}

        <div className="flex justify-center">
          <button type="submit" className="bg-primary rounded-lg text-white px-8 py-2">
            Add Event
          </button>
        </div>
      </form>

      <Contacts />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Event Added</h2>
            <p className="mb-4">The event has been successfully added.</p>
            <button
              className="bg-primary rounded-lg text-white px-4 py-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEvent;
