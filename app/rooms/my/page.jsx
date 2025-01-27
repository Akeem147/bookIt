import React from 'react'
import getMyRooms from '../../actions/getMyRooms'
import Heading from '../../../components/Heading'
import MyRoomCard from '../../../components/MyRoomCard'

export default async function MyRoomPage() {
    const rooms = await getMyRooms()
  return (
    <>
     <Heading title='My Rooms'/>
     {rooms.length > 0 ? (rooms.map((room) => <MyRoomCard key={room.$id} room={room}/>)) : (<p>No rooms found</p>)}
    </>
  )
}
