import { useState, useEffect } from "react";
import axios from "axios"

import { PulseLoader } from "react-spinners";
import { create, updateBooking , getAllBooking as fetchAllBooking } from "../../../lib/api";

const BookingForm = ({ setFormIsShown, bookingToUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    if (bookingToUpdate) {
      setFormData({ name: bookingToUpdate.name })
    }
  }, [bookingToUpdate])

  const handelChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (isSubmitting) return
    setIsSubmitting(true)


    let response
    if (bookingToUpdate) {
      response = await updateBooking(bookingToUpdate._id, formData)
    } else {
      response = await create(formData)
    }

    if (response.status === 200 || response.status === 201) {
      await fetchAllBooking()
      setFormIsShown(false)
    }

    setIsSubmitting(false)
  }

  return (
    <>
      <h2>{bookingToUpdate ? "Update Your Ticket" : "Book Your Ticket"}</h2>
      <form onSubmit={handleSubmit}>
        <lable htmlFor="name">Name</lable>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handelChange}
          
        />
        <lable htmlFor="date">Date</lable>
        <input
          id="date"
          name="date"
          value={formData.date}
          onChange={handelChange}
          
        />
        <lable htmlFor="timing">Timing</lable>
        <input
          id="timing"
          name="timing"
          value={formData.timing}
          onChange={handelChange}
          
        />
        {/* adding seats */}
        <button type="submit">
          {
            isSubmitting
              ?
              (bookingToUpdate ? "Updating..." : "Submitting...")
              :
              (bookingToUpdate ? "Update" : "Submit")
          }
        </button>

        {isSubmitting && <PulseLoader />}
      </form>
    </>
  );
};
export default BookingForm;
