"use client";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import cancelBooking from "../app/actions/cancelBooking";

export default function CancelBookingBtn({ bookingId }) {
  const handleCancelBtn = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
        const result = await cancelBooking(bookingId)
        if(result.success){
            toast.success('Booking cancelled successfully!')
        }
    } catch (error) {
        console.log('Failed to cancel booking', error);
        return{
            error: 'Failed to cancel booking'
        }
    }


  };
  return (
    <>
      <Toaster />
      <button
        onClick={handleCancelBtn}
        className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
      >
        Cancel Booking
      </button>
    </>
  );
}
