import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { ClipLoader } from 'react-spinners';

import BookingDeleteButton from './BookingDeleteButton';
import { getAllBooking as fetchAllBooking } from '../../../lib/api';


const movieMap = {
    "68a56f0d0fdd4b71a3b515c6": "Top Gun Maverick",
    "68a56f0d0fdd4b71a3b515c7": "Zootopia",
    "68a56f0d0fdd4b71a3b515c8": "Knives Out",
    "68a56f0d0fdd4b71a3b515c9": "The Incredibles",
    "68a56f0d0fdd4b71a3b515ca": "Shrek",
    "68a56f0d0fdd4b71a3b515cb": "Spider-Man: Into the Spider-Verse",
    "68a56f0d0fdd4b71a3b515cc": "Guardians of the Galaxy",
    "68a56f0d0fdd4b71a3b515cd": "Avengers: Endgame",
    "68a56f0d0fdd4b71a3b515ce": "Jumanji: Welcome to the Jungle",
    "68a56f0d0fdd4b71a3b515cf": "The Lion King",
    "68a56f0d0fdd4b71a3b515d0": "Aladdin",
    "68a56f0d0fdd4b71a3b515d1": "Finding Nemo",
    "68a56f0d0fdd4b71a3b515d2": "Coco",
    "68a56f0d0fdd4b71a3b515d3": "Harry Potter and the Sorcerer's Stone",
    "68a56f0d0fdd4b71a3b515d4": "Jurassic Park",
    "68a56f0d0fdd4b71a3b515d5": "Paddington",
    "68a56f0d0fdd4b71a3b515d6": "Inception",
    "68a56f0d0fdd4b71a3b515d7": "Frozen II",
    "68a56f0d0fdd4b71a3b515d8": "Moana",
    "68a56f0d0fdd4b71a3b515d9": "Cinderella"
};


const BookingList = ({ setFormIsShown, setBookingToUpdate }) => {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

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
            navigate("/booking");
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
                            <p><strong>Name:</strong> {booking.name}</p>
                            <p><strong>Movie:</strong> {booking.movieName || booking.movieId}</p>
                            <p>
                                <strong>Date:</strong>{" "}
                                {new Date(booking.date).toLocaleDateString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </p>
                            
                            <p><strong>Time:</strong> {booking.timing}</p>
                            <p><strong>Seats:</strong> {booking.seat?.join(", ")}</p>                            <button onClick={() => handleEditClick(booking)}>Update</button>

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
