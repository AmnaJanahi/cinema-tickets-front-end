import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

import BookingDeleteButton from './BookingDeleteButton'
import { getAllBooking as fetchAllBooking } from '../../../lib/api'


const BookingList = ({ setFormIsShown, setBookingToUpdate }) => {
    
    const [bookings, setBookings] = useState([])

    const getAllBooking = async () => {
        const response = await fetchAllBooking()
        setBookings(response.data)
    }

    useEffect(() => {
        getAllBooking()
    }, [])

    const handleEditClick = (booking) => {
        setBookingToUpdate(booking)
        setFormIsShown(true)
    }


    return (
        <div>
            <ol>
                {
                    bookings.length
                        ?
                        bookings.map(booking => {
                            return (
                                <>

                                    <p>{booking.name}</p>

                                    <button onClick={() => handleEditClick(booking)}>Update</button>

                                    <BookingDeleteButton
                                        BookingId={booking._id}
                                        getAllBooking={getAllBooking}
                                    />

                                </>
                            )


                        })
                        :
                        <ClipLoader
                            color='#575657ff'
                        />
                }
            </ol>
        </div>
    )
}

export default BookingList