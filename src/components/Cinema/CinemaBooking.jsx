import './CinemaBooking.css'
import React, { useState } from 'react'
import clsx from 'clsx'

const seats = Array.from({ length: 8 * 8 }, (_, i) => i)

function CinemaBooking({ movie, occupied = [], onSeatSelect }) {
  const [selectedSeats, setSelectedSeats] = useState([])

  const handleSelectedState = (seat) => {
    const isSelected = selectedSeats.includes(seat)
    let updatedSeats
    if (isSelected) {
      updatedSeats = selectedSeats.filter((s) => s !== seat)
    } else {
      updatedSeats = [...selectedSeats, seat]
    }
    setSelectedSeats(updatedSeats)
    onSeatSelect(updatedSeats)
  }

  return (
    <div className="Cinema">
      <div className="screen" />
      <div className="seats">
        {seats.map((seat) => {
  const isSelected = selectedSeats.includes(seat.id)
  const isOccupied = occupied.includes(seat.id)

  return (
    <span
      tabIndex="0"
      key={seat.id}
      title={seat.id}  
      className={clsx(
        'seat',
        isSelected && 'selected',
        isOccupied && 'occupied',
      )}
      onClick={isOccupied ? null : () => handleSelectedState(seat.id)}
      onKeyPress={
        isOccupied
          ? null
          : (e) => {
              if (e.key === 'Enter') {
                handleSelectedState(seat.id)
              }
            }
      }
    />
  )
})}

      </div>
    </div>
  )
}

export default CinemaBooking
