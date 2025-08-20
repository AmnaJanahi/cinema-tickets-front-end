import React from 'react'
import { deleteBooking } from '../../../lib/api'
import "./BookingList.css"

const BookingDeleteButton = ({ BookingId, getAllBooking }) => {
  console.log(BookingId)

  const handleDelete = async () => {
    await deleteBooking(BookingId)
    getAllBooking()
  }

  return (
    <button className="btn-delete" onClick={handleDelete}>Delete</button>
  )
}

export default BookingDeleteButton
