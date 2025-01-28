import RoomCard from "../components/RoomCard";
import { getAllRooms, revalidateHome } from "../app/actions/getAllRooms"; // Correctly import named exports
import Heading from '../components/Heading';

export default async function Home() {
  // Fetch rooms data
  const rooms = await getAllRooms();

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
