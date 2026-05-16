import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import b_url from './Credentials';
import '@fortawesome/fontawesome-free/css/all.css'
import { GoogleGenAI } from "@google/genai";
import Popup from './Popup';
const ai = new GoogleGenAI({ apiKey: "YOUR_AI_API_KEY" });

function Chat({ socket, userName, room }) {
  // const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);
  const [, setOnlineStatus] = useState(navigator.onLine);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState(
    JSON.parse(localStorage.getItem(`${userName}${room}`)) 
    || 
    []
  );
  const [aiRes, setAiRes] = useState("");
  // const [pendingMessages, setPendingMessages] = useState(
  //   JSON.parse(localStorage.getItem(`${userName}pending${room}`)) 
  //   || 
  //   []
  // );
  const [roomUsers, setRoomUsers] = useState(() => {
    const storedUsers = localStorage.getItem(`users-in-${room}`);
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const askAI = async (message) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        // model: "gemini-3-flash-preview",
        model: "gemini-2.5-flash-lite",
        contents: "Answer precisely. " + message,
        generationConfig: {
          maxOutputTokens: 200
        }
      });
      return(response.text);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  const handleRoomUsers = async () => {
    try {
      const response = await axios.get(`${b_url}/users/room/${room}`);
      const usersInRoom = response.data;
      
      setRoomUsers(usersInRoom);
      localStorage.setItem(`users-in-${room}`, JSON.stringify(usersInRoom));
    } 
    catch (error) {
      console.log("Error while handling user addition to room:\n", error.message);
      
    }
  };
  
  useEffect(() => {
    handleRoomUsers();
  }, [room]); 

  const scrollToBottom = () => {
    setTimeout(() =>{
      const container = document.getElementById('message-container')
      container.scrollTop = container.scrollHeight;
    }, 10)
  }

  // const sendPendingMessages = async () => {
  //   for(let i = 0; i < pendingMessages.length; i++){
  //     await socket.emit("send_message", pendingMessages[i]);
  //     // await axios.post(`${process.env.b_url}/messages`, {
  //     //   "sender": pendingMessages[i].author,
  //     //   "room": pendingMessages[i].room,
  //     //   "content": pendingMessages[i].message
  //     // })
  //   }

  //   localStorage.removeItem(`${userName}pending${room}`)
  // }


  const sendMessage = async () => {
    if(currentMessage === "") return;
    if(currentMessage.includes('@fire')) {      
      const aiRes = await askAI(currentMessage.slice(7).trim());
      setAiRes(aiRes);
      setCurrentMessage('');
      return;
    }

    const messageData = {
      room: room,
      author: userName,
      message: currentMessage,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      status: "send"
    };

    try {
      
      await socket.emit("send_message", messageData);
      setMessageList(list => {
        localStorage.setItem(
          `${userName}${room}`,
          JSON.stringify([...list, messageData])      
        );

        return [...list, messageData];
      });


      // if(!navigator.onLine) {        
      //   setPendingMessages(list => {
      //     localStorage.setItem(
      //       `${userName}pending${room}`,
      //       JSON.stringify([...list, messageData])      
      //     );

      //     return [...list, messageData]
      //   })
      // }

    } 
    catch (error) {
      console.log("Error while sending message:\n", error.message);
    }
    finally {
      setCurrentMessage("");
      setTimeout(() =>{
        const container = document.getElementById('message-container')
        container.scrollTop = container.scrollHeight;
      }, 10)
    } 
  }

  const handleReset = async () => {
    localStorage.removeItem(`${userName}${room}`)
    setMessageList([]);
    // await axios.delete(`${process.env.b_url}/messages`, {
    //   "sender": userName,
    //   "room": room
    // })
  }

  const handleVideoCall = async () => {
    const newID = uuidv4();
    try {
      const videoCallMessage = `##Video call invite: https://webchat-fa0u.onrender.com/${newID}`;

      const messageData = {
        room: room,
        author: userName,
        message: videoCallMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        status: "send"
      };

      await socket.emit("send_message", messageData);
      
      setMessageList(list => {
        localStorage.setItem(
          `${userName}${room}`,
          JSON.stringify([...list, messageData])      
        );

        return [...list, messageData];
      });

      
      
      setCurrentMessage("");
      setTimeout(() =>{
        const container = document.getElementById('message-container')
        container.scrollTop = container.scrollHeight;
      }, 10)
      

    } 
    catch (error) {
      console.log("Error while generating new ID:\n", error.message);  
    }
    finally {
      window.open(`https://webchat-fa0u.onrender.com/${newID}`, "_blank");
    }
  }


  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageList((list) => [...list, data]);
      setTimeout(() => {
        const container = document.getElementById("message-container");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 10);
    };
  
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  // useEffect(() => {
  //   sendPendingMessages()
  // }, [onlineStatus])


  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setOnlineStatus(navigator.onLine);
    };

    
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);
 

  return (
    <div className="relative flex flex-col justify-between items-center border-[3px] sm:border-[3px] border-black rounded-[24px] overflow-hidden sm:h-4/5 sm:w-2/3 max-w-[1000px] w-[98%] h-[98vh]">
      {aiRes && <Popup aiRes={aiRes} onClose={() => setAiRes("")} />}
      <div className="h-auto w-full px-4 flex flex-row justify-between items-center border-b-[1px] border-black bg-teal-300">

        <div 
          className='flex flex-col justify-start py-1 items-start max-w-[90%] h-full'
        >
          <div className="text-purple-800 text-[28px] max-w-max font-bold py-0">
            <span>FiredChat</span>
          </div>

          <div className='flex flex-row items-center gap-1'>
            <div className="text-[15px] max-w-max font-semibold">
              <div>
                <span className='text-purple-800 font-semibold font-mono'>{room}</span>
                {' - ' + '[' + roomUsers.length + ']'}
              </div>
            </div>
            <div className="relative w-full max-w-[50%] sm:max-w-[65%] mx-2 overflow-hidden items-center">
              <div
                title="Click to copy usernames"
                className={`flex w-full gap-1 whitespace-nowrap cursor-pointer ${
                  roomUsers.length > 2 ? "animate-marquee" : ""
                }`}
                onClick={() => {
                  navigator.clipboard.writeText(roomUsers.join(", "));
                  alert("Copied usernames to clipboard!");
                }}
              >
                {roomUsers.map((user, index) => (
                  <h5 key={index} className="text-[14px] font-medium font-mono">
                    {user}{index === roomUsers.length - 1 ? "" : ", "}
                  </h5>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-row items-center justify-end max-w-[10%] h-full">
          <div onClick={handleVideoCall} className="mr-3 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125 max-w-max">
            <i className='fas fa-video transition-all duration-300 ease-in-out active:scale-75'></i>
          </div>
          <div 
            title="Reset Chat" 
            onClick={handleReset}
            className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125 max-w-max"
          >
            <i 
              title="Clear chat" 
              className="fas fa-trash-alt transition-all duration-300 ease-in-out hover:text-red-500 active:scale-75"
            ></i>
          </div>
        </div>

      </div>



      <div id="message-container" className="h-[82vh] w-full bg-gray-300 border-t-2 border-b-2 border-black overflow-auto p-2 pb-[40px]">
        {messageList.map((messageContent, index) => {
          return (
            userName === messageContent.author ? (
            <div key={index} className="max-w-[1/2] flex flex-col justify-end items-end text-black">
              <div className="flex flex-row gap-4 justify-start">
                <h5 className="text-[12px]">{messageContent.time}</h5>
                <h5 className="text-[12px] font-semibold">You</h5>
              </div>
              <div className="bg-blue-400 max-w-[80vw] break-words p-1 rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px] mb-4">
                {messageContent.message.includes("##Video call invite") ? (
                  <div className="w-full px-2 py-1">
                    <h4>Video call invite</h4> <a className='text-black cursor-pointer underline' href={messageContent.message.split(": ")[1]} target='_blank' rel='noreferrer'>Link</a>
                  </div>
                ) : (
                  <h4>{messageContent.message}</h4>
                )}
              </div>
            </div>
            )
            : 
            (
            <div key={index} className="flex flex-col items-start max-w-[1/2]">
              <div className="flex flex-row gap-4 justify-start">
                <h5 className="text-[12px] font-semibold">{messageContent.author}</h5>
                <h5 className="text-[12px]">{messageContent.time}</h5>
              </div>
              <div className="bg-white max-w-[80vw] break-words p-1 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] mb-4">
                {messageContent.message.includes("Video call invite") ? (
                  <div className=" w-full px-2 py-1">
                    <h4>Video call invite</h4> <a className='text-black cursor-pointer underline' href={messageContent.message.split(": ")[1]} target='_blank' rel='noreferrer'>Link</a>
                  </div>
                ) : (
                  <h4>{messageContent.message}</h4>
                )}
              </div>
            </div>
            )
          );
        })}
      </div>



      <div className="h-[8vh] w-full flex flex-row justify-between p-2 border-t-[1px] border-black bg-teal-300 relative">
        <input 
          className="border-none rounded text-[20px] h-[35px] p-1 w-10/12 bg-slate-200"
          type="text" 
          placeholder="Message..." 
          value={currentMessage}
          onChange = {(e) => setCurrentMessage(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              await sendMessage();
            }
          }}
        />
        <div className=" flex justify-center items-center rounded-full h-[40px] w-[40px] bg-white text-[20px]">
          <button onClick = {sendMessage} title="Send" disabled={loading} >
            {loading ?
              <i className="fas fa-spinner fa-spin"></i>
              :
              <i className="fas fa-paper-plane -ml-1"></i>
            }
          </button>
         </div>
        <button 
          onClick = {scrollToBottom} 
          id='scroll-to-bottom-button' 
          className="absolute flex justify-center items-center rounded-full w-[40px] h-[40px] bg-sky-300 text-[20px] text-black -top-12 right-2"
        >
          <i className="fas fa-arrow-down"></i>
        </button>

      </div>         
    </div>
  )
}

Chat.propTypes = {
  socket: PropTypes.any.isRequired,
  userName: PropTypes.any.isRequired,
  room: PropTypes.any.isRequired
};

export default Chat;