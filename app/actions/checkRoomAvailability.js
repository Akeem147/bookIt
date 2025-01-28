"use server";

import { createSessionClient } from "../../config/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { DateTime } from "luxon";

function toUTCDateTime(dateStr) {
  return DateTime.fromISO(dateStr, { zone: "utc" }), toUTC();
}

function dateRangesOverlap(checkInA, checkOutA, checkInB, checkOutB) {
  return checkInA < checkInB && checkOutA > checkInB;
}

// Async function to get all rooms
async function checkRoomAvailability(roomId, checkIn, checkOut) {
  const sessionCookie = await cookies().get("appwrite-session"); 
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { documents: bookings } = await createSessionClient(
      sessionCookie.value
    );

    const checkInDateTime = toUTCDateTime(checkIn);
    const checkOutDateTime = toUTCDateTime(checkOut);

    for (const booking of bookings) {
      const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

      if (
        dateRangesOverlap(
          checkInDateTime,
          checkOutDateTime,
          bookingCheckInDateTime,
          bookingCheckOutDateTime
        )
      ) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.log("Failed to check availability", error);
    return {
      error: "Failed to check availabilty",
    };
  }
}

export default checkRoomAvailability;
