import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../slices/userSlice";

function Header() {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  
  const handleSignOut = async () => {
    dispatch(clearUser());
    // alert("You have signed out of your account.")
  }


  return (
    <div className="h-[10vh] w-[96vw] flex flex-row justify-around items-center border-b-2 border-black bg-teal-200">
        <span className="text-[35px] text-violet-800 font-bold">FiredChat</span>
        <div className="flex flex-row-reverse gap-x-4 justify-start sm:pr-0 pr-4 sm:justify-evenly items-center w-1/2 sm:w-1/4">
        
          <div className="flex flex-col">
            <span className="font-bold">{
              user.email != "" 
              ? 
              <div className="sm:flex-row flex flex-row justify-center items-center gap-4 cursor-pointer ">
                <div className="border-[1px] cursor-pointer border-black rounded-[10px] bg-white px-2.5 py-1">
                  <Link to = '/roomsList'>
                    <span className=" text-violet-800">Rooms</span>
                  </Link>
                </div>
                <div  onClick={handleSignOut}>
                  <div className="border-[1px] cursor-pointer border-black rounded-[10px] bg-white px-2.5 py-1 hidden sm:block">
                    <span className="mb-[1px] text-violet-800">Log out</span>
                  </div>
                  <div className="flex sm:hidden justify-center items-center ">
                    <i className="fas fa-sign-out-alt text-2xl "></i>
                  </div>
                </div>
              </div>
              : 
              <Link to = '/login'>
                <div className="sm:flex-row flex flex-row items-baseline sm:gap-2 cursor-pointer">
                  <div className="border-[1px] cursor-pointer border-black rounded-[10px] bg-white px-2.5 py-1 block ">
                    <span className="mb-[1px] text-violet-800">Sign in</span>
                  </div>
                  <div className="hidden">
                    <i className="fas fa-sign-in-alt text-[12.5px]"></i>
                  </div>
                </div>
              </Link>
            }</span>
          </div>
        
      </div>
    </div>
  )
}

export default Header