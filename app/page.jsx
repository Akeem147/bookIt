import RoomCard from "../components/RoomCard";
import { getAllRooms, revalidateHome } from "../app/actions/getAllRooms"; // Correctly import named exports
import Heading from '../components/Heading';

export default async function Home() {
  // Fetch rooms data
  const rooms = await getAllRooms();

  // Revalidation should be triggered AFTER fetching data, NOT in the render
  // Trigger revalidation AFTER data is fetched, or through another action (e.g., button click, API call)
  // await revalidateHome(); // Make sure this is not blocking your render
    // await revalidateHome();

  return (
    <>
      <Heading title="Available Rooms" />
      {rooms.length > 0 ? (
        rooms.map((room) => <RoomCard key={room.$id} room={room}  />)
      ) : (
        <p>No rooms available</p>
      )}
    </>
  );
}
