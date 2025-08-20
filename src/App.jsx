import { jwtDecode } from "jwt-decode";

import LoginForm from "./LoginForm";
import SignUp from "./SignupForm";
import LogoutButton from "./LogoutButton";
import ProtectedRoute from "./ProtectedRoute";

import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import { PulseLoader } from "react-spinners";

import BookingForm from "./components/BookingForm/BookingForm";
import BookingList from "./components/BookingList/BookingList";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [formIsShown, setFormIsShown] = useState(false);
  const [bookingToUpdate, setBookingToUpdate] = useState(null);

  function handleLogin(newToken) {
    setToken(newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  // This is how to decode the token and gget the
  // information that you added to the payload in your login
  // route in the backend
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  }

  const handleShowFormClick = () => {
    console.log("show form button is clicked");
    setBookingToUpdate(null);
    setFormIsShown(true);
  };

  return (
    <>
      <Router>
        <NavBar onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="booking"
            element={
              <ProtectedRoute>
                <BookingForm
                  setFormIsShown={setFormIsShown}
                  bookingToUpdate={bookingToUpdate}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="booking-list"
            element={
              <BookingList
                setFormIsShown={setFormIsShown}
                bookingToUpdate={bookingToUpdate}
              />
            }
          />

          {/* <button onClick={handleShowFormClick}>Book your ticket</button>
            {
              formIsShown
              ?
              <BookingForm  setFormIsShown={setFormIsShown}/>
              :
              <BookingList />
              
            } */}
        </Routes>
      </Router>
    </>
  );
};

export default App;

