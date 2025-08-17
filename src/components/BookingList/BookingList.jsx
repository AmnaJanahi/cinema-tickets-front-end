import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

import PetDeleteButton from './BookingDeleteButton'

const BookingList = () => {
    const [bookings, setBookings] = useState([])

    const getAllBooking = async () => {
        console.log(import.meta.env.VITE_BACKEND_URL)
        const url = `${import.meta.env.VITE_BACKEND_URL}/booking`
        const response = await axios.get(url)
        console.log(response)
        setBookings(response.data)
    }

    useEffect(() => {
        getAllBooking()
    }, [])

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

                                    <PetDeleteButton
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