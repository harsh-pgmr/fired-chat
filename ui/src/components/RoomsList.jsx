import { useSelector, useDispatch } from "react-redux"
import RoomListElement from "./RoomListElement";
import { useNavigate } from "react-router-dom";
import { setUser } from "../slices/userSlice";


function RoomsList() {
  const user = useSelector(state => state.user.value)
  // const [roomsList, setRoomsList] = useState(user.rooms)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const newUserData = {
    userName: user.userName,
    email: user.email,
    currentRoom: "",
    rooms: user.rooms
  };



  const list = user.rooms.map((room, index) => {
    return(
      <RoomListElement room={room} key={index} roomID={index} />
    )
  })


  const createRoom = async (e) => {
    e.preventDefault()
    dispatch(setUser(newUserData))
    navigate('/joinChat')
  }

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div className="w-[96vw] mx-[2vw]">
      <div className="w-[100vw] sm:w-[96vw] h-[8vh] border-b-[2px] border-black bg-teal-200 flex flex-row justify-around items-center" >
        <span className="text-[35px] text-violet-800 font-bold cursor-pointer" onClick={handleClick}>FiredChat</span>
          <div
            className="border-[1px] border-black rounded-[10px] bg-white px-2.5 py-1 max-w-max"
            onClick={createRoom}
          >
            <span className="mb-[1px] font-bold cursor-pointer text-violet-800">Create Room</span>
          </div>
      </div>
      <div className="w-[100vw] sm:w-[96vw] h-auto min-h-[92vh] bg-sky-100 flex justify-center items-center">
      {
        user.rooms.length > 0 
        ?
        <div className="w-[98vw] sm:w-[94vw] h-auto min-h-[92vh] flex flex-col gap-20 justify-start items-center px-[1vw] py-12">
          {list}
        </div>
        : 
        <div className="w-[100vw] sm:w-[96vw] h-[92vh] bg-sky-100 text-center flex flex-col justify-center items-center text-2xl sm:text-4xl">
          <p className="max-w-[80%]">You have no Chat Rooms yet.</p>
          <p className="max-w-[80%]">Create one above.</p>
        </div>
      }
      </div>
    </div>
  )
}

export default RoomsList