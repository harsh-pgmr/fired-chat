import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import b_url from './Credentials'
import io from "socket.io-client";
const socket = io(`${b_url}`, {
    transports: ['websocket'], // Use WebSocket transport
});

import Chat from './Chat';
import { setUser } from '../slices/userSlice';
import axios from 'axios';



function JoinChat() {

  const user = useSelector(state => state.user.value)
  const isOnline = navigator.onLine;
  
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  async function joinRoomLogic (e) {
    e.preventDefault();

    const invalidChars = [" ", ".", "/", "\\", "?", "#", "$", "%", "^", "&", "{", "}", "<", ">", ":", ";", ",", "|", "!", "@", "`", "~", "'", '"', "+", "=", "*", "(", ")", "[", "]"];
    const newRoomEntry = user.currentRoom;

    if(newRoomEntry === "" ||
      !newRoomEntry ||
      newRoomEntry.length < 3 ||
      invalidChars.some(char => newRoomEntry.includes(char))
    ){
      alert('Invalid room name.\nPlease enter a valid room name.\n Room name should not contain any special characters or spaces.')
      return;
    }
    setIsLoading(true);
    const userRooms = user.rooms
    const roomExists = userRooms.some(room => room === user.currentRoom)
    
    if( !roomExists ){
      patchRooms();
      joinRoom()
    }
    else{
      joinRoom()
    }

    setIsLoading(false);
  }

  async function patchRooms () {
    const userDataPatchRequest = {
      "newRoom": user.currentRoom
    }
    try{   
      const response = await axios.patch(`${b_url}/users/${user.email}`, userDataPatchRequest);
      dispatch(setUser({
        userName: user.userName,
        email: user.email,
        currentRoom: user.currentRoom,
        rooms: [...user.rooms, user.currentRoom]
      }))
  
      if( response.status === 200 ){
        // alert(`New room added to your list.`)
        console.log("New room added to your list.");
      }
  
    }
    catch(err){
      alert('An unexpected error occured in join.')
    }
  }

  const settingRoom = (event) => {
    dispatch(setUser({
      userName: user.userName,
      email: user.email,
      currentRoom: event.target.value,
      rooms: user.rooms
    }))
  }

 
  async function joinRoom () {
    if( user.currentRoom !== "" && user.userName !== "" ){ 
      if(isOnline){
        socket.emit("join_room", { 
          room: user.currentRoom, 
          userName: user.userName, 
          id: socket.id
        });
        setShowChat(true);
      }
      else{
        alert('You seem to be offline!\nPlease reconnect to join room.')
        return;
      }
    }
    else{
      alert("Please fill the details.")
    }
  }



  return (
    <div className="flex justify-center items-center flex-col h-screen w-screen bg-sky-100">
      { !showChat ? 
      (
        <div className="flex flex-col items-center border-black border-2 border-solid max-w-[400px] w-[50vw] min-w-[250px] text-center gap-12 p-2 rounded py-12">

          <strong className="text-2xl "><u>Join Chat</u></strong>


          <div className=" flex flex-col justify-center text-left">

            <p className="font-semibold">userName</p>
            <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="text" defaultValue={user.userName} />
            <p className="font-semibold">Chat Room ID</p>
            <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="text" value={user.currentRoom} onChange={settingRoom} />
            <button 
              className=" rounded border-2 border-black border-solid mt-12 p-1 bg-blue-400  active:bg-blue-500" 
              onClick={joinRoomLogic}
            >
              {
                isLoading 
                ? <i className="fa fa-spinner fa-spin"></i>
                : "Join"
              }
            </button>

          </div>

        </div>
      ) 
      : 
      <Chat socket = {socket} userName = {user.userName} room = {user.currentRoom} />
      }
    </div>
  )
}

export default JoinChat
