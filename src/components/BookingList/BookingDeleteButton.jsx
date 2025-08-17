import React from 'react'
import { deleteBooking } from '../../../lib/api'

const BookingDeleteButton = ({ BookingId, getAllBooking }) => {
  console.log(BookingId)

  const handleDelete = async () => {
    await deleteBooking(BookingId)
    getAllBooking()
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  )
}

export default BookingDeleteButton
