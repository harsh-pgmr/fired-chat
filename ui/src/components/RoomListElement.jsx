import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setUser } from "../slices/userSlice";


function RoomListElement(props) {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userData = {
    userName: user.userName,
    email: user.email,
    currentRoom: props.room,
    rooms: user.rooms
  }

  const handleRoomEntry = (e) =>{
    e.preventDefault();
    dispatch(setUser(userData))
    navigate('/joinChat')
  }


  return (
    <div 
        className="w-[90%] sm:w-[80%] max-w-[1200px] min-h-[100px] h-auto rounded-[10px] border-2 border-black bg-gradient-to-r from-blue-200 to-gray-200 hover:from-gray-200 hover:to-blue-300 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex flex-row justify-center items-center text-2xl sm:text-3xl font-bold text-white cursor-pointer"
        onClick={handleRoomEntry}
    >
        <span className="text-black text-3xl font-semibold font-serif">{props.room}</span>
    </div>
  )
}




RoomListElement.propTypes = {
  room: PropTypes.any.isRequired,
};

export default RoomListElement