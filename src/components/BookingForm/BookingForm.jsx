import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router";
import { PulseLoader } from "react-spinners";
import { create, updateBooking, getAllBooking as fetchAllBooking, getOccupiedSeats } from "../../../lib/api";
import CinemaBooking from "../Cinema/CinemaBooking";



const BookingForm = ({ setFormIsShown, bookingToUpdate }) => {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [occupied, setOccupied] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    timing: "",
    seat: [],
    movieId: "",
    movieName: ""
  });



  // Populate form when editing
  useEffect(() => {
    if (bookingToUpdate) {
      setFormData({
        name: bookingToUpdate.name || "",
        date: bookingToUpdate.date || "",
        timing: bookingToUpdate.timing || "",
        seat: bookingToUpdate.seat || [],
        movieId: bookingToUpdate.movieId || "",
        movieName: bookingToUpdate.movieName || ""
      });

    }
  }, [bookingToUpdate]);

  useEffect(() => {
    if (formData.movieId && formData.date && formData.timing) {
      (async () => {
        try {
          const res = await getOccupiedSeats(formData.movieId, formData.date, formData.timing);
          setOccupied(res.status === 200 ? res.data.occupied : []);
        } catch (err) {
          console.error("Error fetching occupied seats:", err);
          setOccupied([]);
        }
      })();
    }
  }, [formData.movieId, formData.date, formData.timing]);

  const handleSeatSelect = (seats) => setFormData({ ...formData, seat: seats });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "movieId") {
      const movieName = event.target.selectedOptions[0].text;
      setFormData({ ...formData, movieId: value, movieName });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const submitData = {
      name: formData.name,
      movieId: formData.movieId,
      movieName: formData.movieName,
      date: formData.date,
      timing: formData.timing,
      seat: formData.seat
    };

    if (bookingToUpdate) {
      await updateBooking(bookingToUpdate._id, submitData);
    } else {
      await create(submitData);
    }

    // setFormIsShown(false);
    setIsSubmitting(false);
    navigate("/booking-list");
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
          onChange={handleChange}
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="timing">Timing</label>
        <select
          id="timing"
          name="timing"
          value={formData.timing}
          onChange={handleChange}
          required
        >
          <option value="">Select a time</option>
          <option value="13:00">13:00</option>
          <option value="15:30">15:30</option>
          <option value="17:45">17:45</option>
          <option value="19:30">19:30</option>
          <option value="23:00">23:00</option>
          <option value="00:15">00:15</option>
        </select>

        <label htmlFor="movieId">Movie</label>
        <select
          id="movieId"
          name="movieId"
          value={formData.movieId}
          onChange={handleChange}
          required
        >
          <option value="">-</option>
          <option value="68a56f0d0fdd4b71a3b515c6">Top Gun mavrick</option>
          <option value="68a56f0d0fdd4b71a3b515c7">Zootopia</option>
          <option value="68a56f0d0fdd4b71a3b515c8">Knives Out</option>
          <option value="68a56f0d0fdd4b71a3b515c9">The Incredibles</option>
          <option value="68a56f0d0fdd4b71a3b515ca">Shrek</option>
          <option value="68a56f0d0fdd4b71a3b515cb">Spider-Man: Into the Spider-Verse</option>
          <option value="68a56f0d0fdd4b71a3b515cc">Guardians of the Galaxy</option>
          <option value="68a56f0d0fdd4b71a3b515cd">Avengers: Endgame</option>
          <option value="68a56f0d0fdd4b71a3b515ce">Jumanji: Welcome to the Jungle</option>
          <option value="68a56f0d0fdd4b71a3b515cf">The Lion King</option>
          <option value="68a56f0d0fdd4b71a3b515d0">Aladdin</option>
          <option value="68a56f0d0fdd4b71a3b515d1">Finding Nemo</option>
          <option value="68a56f0d0fdd4b71a3b515d2">Coco</option>
          <option value="68a56f0d0fdd4b71a3b515d3">Harry Potter and the Sorcerer's Stone</option>
          <option value="68a56f0d0fdd4b71a3b515d4">Jurassic Park</option>
          <option value="68a56f0d0fdd4b71a3b515d5">Paddington</option>
          <option value="68a56f0d0fdd4b71a3b515d6">Inception</option>
          <option value="68a56f0d0fdd4b71a3b515d7">Frozen II</option>
          <option value="68a56f0d0fdd4b71a3b515d8">Moana</option>
          <option value="68a56f0d0fdd4b71a3b515d9">Cinderella</option>
        </select>

        <CinemaBooking
          movie={{ name: formData.movieName }}
          occupied={occupied}
          onSeatSelect={handleSeatSelect}
        />

        <button type="submit">
          {isSubmitting
            ? bookingToUpdate ? "Updating..." : "Submitting..."
            : bookingToUpdate ? "Update" : "Submit"}
        </button>

        {isSubmitting && <PulseLoader />}
      </form>
    </>
  );
};

export default BookingForm;
