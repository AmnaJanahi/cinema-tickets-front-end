import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { create, updateBooking, getAllBooking as fetchAllBooking, getOccupiedSeats } from "../../../lib/api";
import CinemaBooking from "../Cinema/CinemaBooking";

const BookingForm = ({ setFormIsShown, bookingToUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [occupied, setOccupied] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    timing: "",
    seat: []
  });
  const [availableMovies,setAvailableMovies] = useState()

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
  const handleChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    let response;

    const submitData = { name: formData.movieName, id: formData.movieId, date: formData.date, timing: formData.timing, seat: formData.seat };

    console.log('submit data',submitData)
    if (bookingToUpdate) {
      response = await updateBooking(bookingToUpdate._id, submitData);
    } else {
      response = await create(submitData);
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
        <label htmlFor="movieName">Name</label>
        <input
          id="name"
          name="name"
          value={formData.movieName}
          onChange={handleChange} />

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


 <label htmlFor="movieId">movie</label>
        <select
          id="movieId"
          name="movieId"
          value={formData.movieId}
          onChange={handleChange}
          required
        >
          
        </select>


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
