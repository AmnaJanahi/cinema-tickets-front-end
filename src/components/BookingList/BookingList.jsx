import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { ClipLoader } from 'react-spinners';

import BookingDeleteButton from './BookingDeleteButton';
import { getAllBooking as fetchAllBooking } from '../../../lib/api';

const BookingList = ({ setFormIsShown, setBookingToUpdate }) => {
<<<<<<< HEAD
    
    const [bookings, setBookings] = useState([])
=======
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
>>>>>>> main

    const getAllBooking = async () => {
        const response = await fetchAllBooking();
        setBookings(response.data);
    };

    useEffect(() => {
        getAllBooking();
    }, []);

    const handleEditClick = (booking) => {
        if (setBookingToUpdate) {
            setBookingToUpdate(booking);
            navigate("/booking"); // navigate to BookingForm page
        } else {
            console.error("setBookingToUpdate function is missing!");
        }
    };

    return (
        <div>
            <ol>
                {bookings.length ? (
                    bookings.map(booking => (
                        <li key={booking._id}>
                            <p>{booking.movieId}</p>
                            <button onClick={() => handleEditClick(booking)}>Update</button>
                            <BookingDeleteButton
                                BookingId={booking._id}
                                getAllBooking={getAllBooking}
                            />
                        </li>
                    ))
                ) : (
                    <ClipLoader color='#575657ff' />
                )}
            </ol>
        </div>
    );
};

export default BookingList;
