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
    </>
  )
};
export default BookingForm;
