import {jwtDecode} from 'jwt-decode'

import LoginForm from './LoginForm'
import SignUp from './SignupForm'
import LogoutButton from './LogoutButton'
import ProtectedRoute from './ProtectedRoute'

import axios from "axios"
import { useState, useEffect } from "react"

import { PulseLoader } from "react-spinners";

import BookingForm from "./components/BookingForm/BookingForm";
import BookingList from "./components/BookingList/BookingList";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'))

  

  const [formIsShown, setFormIsShown] = useState(false)

  const handleShowFormClick = () => {
    console.log('show form button is clicked')
    setFormIsShown(true)
  }

  return(
    <>
    <h1>Welcome</h1>
    <button onClick={handleShowFormClick}>Book your ticket</button>
      {
        formIsShown
          ?
          <BookingForm  setFormIsShown={setFormIsShown}/>
          :
          <BookingList />
        
      }
    </>
  )

}

export default App