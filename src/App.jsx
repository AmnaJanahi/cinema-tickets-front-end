import axios from "axios"
import { useState, useEffect } from "react"

import { PulseLoader } from "react-spinners";

import BookingForm from "./components/BookingForm/BookingForm";
import BookingList from "./components/BookingList/BookingList";

const App = () => {
  const [formIsShown, setFormIsShown] = useState(false)
  const [bookingToUpdate, setBookingToUpdate] = useState(null)
  
  const handleShowFormClick = () => {
    console.log('show form button is clicked')
    setBookingToUpdate(null)
    setFormIsShown(true)
  }

  return(
    <>
    <h1>Welcome</h1>
    <button onClick={handleShowFormClick}>Book your ticket</button>
      {
        formIsShown
          ?
          <BookingForm 
           setFormIsShown={setFormIsShown}
           bookingToUpdate={bookingToUpdate} 
           />
          :
          <BookingList
          setFormIsShown = {setFormIsShown}
          setBookingToUpdate= {setBookingToUpdate}
          />
        
      }
    </>
  )

}

export default App