import '@fortawesome/fontawesome-free/css/all.css'


function Body() {


  return (
    <div className="min-h-[90vh] h-auto w-[96vw] flex sm:flex-row flex-col gap-[10vh] sm:gap-0 justify-center items-center bg-sky-100">
        <div className="flex flex-col justify-center items-center sm:w-[48vw] gap-[12vh] sm:gap-[20vh] min-h-[90vh] sm:min-h-[90vh]">
            <div className="flex flex-col justify-center items-center sm:w-[48vw] gap-[2vh]">
                <p className=" text-lg sm:text-2xl text-gray-600 font-bold">
                    Welcome to the most 
                </p>
                <p className="text-4xl sm:text-7xl text-violet-800 font-extrabold">
                    PRIVATE
                </p>
                <p className=" text-lg sm:text-2xl text-gray-600 font-bold">
                    chat app in the world!
                </p>
            </div>
            <div className="flex flex-col justify-center items-center text-center sm:w-[48vw] gap-[3vh]">
                <span className=" text-lg sm:text-2xl text-gray-600 font-bold -mb-[3vh]">
                    What lies at our core?
                </span>
                <hr className="border-[1px] border-black sm:w-[48vw] w-[96vw]" />
                <ul className="text-3xl sm:text-4xl font-extrabold   text-violet-900">
                    <li>USER PRIVACY</li>
                </ul>
                <p className="text-gray-600 font-bold  text-lg sm:text-2xl">We do not even store your messages!</p>
                <p className="text-gray-600 font-bold  text-lg sm:text-2xl">You can clear complete chat in one click.</p>
                <p className="text-gray-600 font-bold  text-lg sm:text-2xl">No history! No database!</p>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[90vw] sm:w-[48vw] gap-[3vh] pb-8 sm:pb-0  min-h-[110vh] sm:min-h-[90vh]">

            <div className="flex flex-col w-[90vw] sm:w-[48vw] gap-[3vh]  min-h-[100vh] sm:min-h-[90vh] text-left justify-center items-center ">
                <h1 className="text-3xl sm:text-5xl font-bold text-violet-900">How to use?</h1>
                <div className="text-gray-600 font-bold  text-lg sm:text-xl flex flex-col gap-[1vh]">
                    <div className="flex flex-row gap-[1vw] border-[0.5px] rounded-[10px] border-black p-4 py-5 hover:bg-teal-200">
                        <span>• </span>
                        <p>Sign in or register with a userName, email and password.</p>
                    </div>
                    <div className="flex flex-row gap-[1vw] border-[0.5px] rounded-[10px] border-black p-4 py-5 hover:bg-teal-200">
                        <span>• </span>
                        <p>Ask your friend(s) to do the same.</p>
                    </div>
                    <div className="flex flex-row gap-[1vw] border-[0.5px] rounded-[10px] border-black p-4 py-5 hover:bg-teal-200">
                        <span>• </span>
                        <p>Create a room or join a pre-existing one with a unique chat room ID.</p>
                    </div>
                    <div className="flex flex-row gap-[1vw] border-[0.5px] rounded-[10px] border-black p-4 py-5 hover:bg-teal-200">
                        <span>• </span>
                        <p>Share this chat room ID with your friend(s).</p>
                    </div>
                    <div className="flex flex-row gap-[1vw] border-[0.5px] rounded-[10px] border-black p-4 py-5 hover:bg-teal-200">
                        <span>• </span>
                        <p>Anyone with the chat room ID can join the room.</p>
                    </div>
                    <div className="flex flex-row gap-[1vw] border-[0.5px] rounded-[10px] border-black p-4 py-5 hover:bg-teal-200">
                        <span>• </span>
                        <p>Enjoy your chat!</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Body