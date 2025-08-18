import { useState } from "react";
import axios from "axios"

import { PulseLoader } from "react-spinners";
import { create } from "../../../lib/api";

const BookingForm = ({setFormIsShown} ) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
  });

  const handelChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (isSubmitting) return
        setIsSubmitting(true)
        
        const response = await create(formData)
        console.log(response)
        if (response.status === 201) {
            setFormIsShown(false)
        }
        setIsSubmitting(false)
    }

  return (
    <>
      <h2>Book Your Ticket</h2>
      <form onSubmit={handleSubmit}>
        <lable htmlFor="name">Name</lable>
        <input
          id="name"
          name="name"
          onChange={handelChange}
          value={formData.name}
        />
        <lable htmlFor="date">Date</lable>
        <input
          id="date"
          name="date"
          type="date"
          onChange={handelChange}
          value={formData.date}
        />
        <lable htmlFor="timing">Timing</lable>
        <input
          id="timing"
          name="timing"
          onChange={handelChange}
          value={formData.timing}
        />
        {/* adding seats */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default BookingForm;
