import { useState, useEffect } from "react";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { create, updateBooking, getAllBooking as fetchAllBooking, getOccupiedSeats } from "../../../lib/api";
import CinemaBooking from "../Cinema/CinemaBooking";

const BookingForm = ({ setFormIsShown, bookingToUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [occupied, setOccupied] = useState([]);
  const [formData, setFormData] = useState({
    movieId: "",
    movieName: "",
    date: "",
    timing: "",
    seat: []
  });

  useEffect(() => {
    if (formData.movieId && formData.date && formData.timing) {
      (async () => {
        try {
          const res = await getOccupiedSeats(formData.movieId, formData.date, formData.timing);
          if (res.status === 200) {
            setOccupied(res.data.occupied);
          } else {
            setOccupied([]);
          }
        } catch (err) {
          console.error("Error fetching occupied seats:", err);
          setOccupied([]);
        }
      })();
    }
  }, [formData.movieId, formData.date, formData.timing]);

  const handleSeatSelect = (seats) => {
    setFormData({ ...formData, seat: seats });
  };

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
      await fetchAllBooking();
      setFormIsShown(false);
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
          name="movieName"
          value={formData.movieName}
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

        <CinemaBooking
          movie={{ name: formData.movieName }}
          occupied={occupied}
          onSeatSelect={handleSeatSelect}
        />

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
