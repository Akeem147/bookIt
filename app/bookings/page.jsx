import React from "react";
import Heading from "../../components/Heading";
import getMyBookings from "../actions/getMyBookings";
import BookedRoomCard from '../../components/BookedRoomCard'

export default async function Bookings() {
  const bookings = await getMyBookings();

  return <>
  <Heading title='My Bookings' />
  {bookings.length === 0 ? (
    <p className="text-gray-600 mt-4">You have no bookings</p>
  ) : (
    bookings.map((booking) => (
      <BookedRoomCard key={booking.$id} booking={booking}/>
    ))
  )}
  </>
}
