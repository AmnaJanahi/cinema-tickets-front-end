import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router";
import { PulseLoader } from "react-spinners";


import {
  create,
  updateBooking,
  getAllBooking as fetchAllBooking,
  getAllMovie as fetchAllMovies,
} from "../../../lib/api";

const BookingForm = ({ setFormIsShown, bookingToUpdate }) => {
  const { movieId } = useParams(); 
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [movie, setMovie] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    timing: "",
  });

  useEffect(() => {
    if (bookingToUpdate) {
       setMovie({
        name: bookingToUpdate.name,
        image: bookingToUpdate.image,
        rating: bookingToUpdate.rating,
        description: bookingToUpdate.description,
      });
      setFormData({ name: bookingToUpdate.name });
    }
  }, [bookingToUpdate]);

  const handelChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    let response;
    if (bookingToUpdate) {
      response = await updateBooking(bookingToUpdate._id, formData);
    } else {
      response = await create(formData);
    }

    if (response.status === 200 || response.status === 201) {
      setFormData({
        name: "",
        date: "",
        timing: "",
      });
      setFormIsShown(false);
      fetchAllBooking();
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <h2>{bookingToUpdate ? "Update Your Ticket" : "Book Your Ticket"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handelChange}
        />
        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handelChange}
        />
        <label htmlFor="timing">Timing</label>
        <input
          id="timing"
          name="timing"
          value={formData.timing}
          onChange={handelChange}
        />
        {/* adding seats */}
        <button type="submit">
          {isSubmitting
            ? bookingToUpdate
              ? "Updating..."
              : "Submitting..."
            : bookingToUpdate
            ? "Update"
            : "Submit"}
        </button>

        {isSubmitting && <PulseLoader />}
      </form>
    </>
  );
};
export default BookingForm;
