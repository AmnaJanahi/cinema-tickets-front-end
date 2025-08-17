import { useState } from "react";

import { PulseLoader } from "react-spinners";
import { create } from "../../../lib/api";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handelChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handelSubmite = async (event) => {
    event.preventDefault();

    const response = await create(formData);
    console.log(response);
  };

  return (
    <>
      <h2>Book Your Ticket</h2>
      <form onSubmit={handelSubmite}>
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
