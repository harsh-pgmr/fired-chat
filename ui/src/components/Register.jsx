import { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice'
import b_url from './Credentials';
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const dispatch = useDispatch();
  

  const userDataPostRequest = {
    userName: userName,
    email: email,
    password: password
  };

  const userData = {
    userName: userName,
    email: email,
    currentRoom: "",
    rooms: []
  };



  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      if( userName == '' || email == '' || password == '' ){
        alert(`Please fill all the details!`);
        return;
      }
      if( navigator.onLine == false ){
        alert(`Oops!\nYou seem to be offline!\nPlease reconnect to register.`);
        return;
      }
  
      const response = await axios.post(`${b_url}/users/register`, userDataPostRequest);

      if( response.status === 400 ){
        alert(`Email already in use. \nPlease provide a different email.`)
        return;
      }
      else if( response.status === 401 ){
        alert(`userName already in use. \nPlease provide a different userName.`)
        return;
      }
      else if( response.status === 201 ){
        console.log('Registered user');
        dispatch(setUser(userData));
      }
      else{
        alert("Some unexpected error occured on our end.\nPlease try again.")
      }


      navigate("/roomsList")


    }
    catch(err){
      alert('An unexpected error occured.');
      console.error(err.message);
      console.error(err.stack);
    }
    finally{
      setIsLoading(false);
    }

  }




  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
      <div className="flex flex-col items-center border-black border-2 border-solid max-w-[400px] w-[50vw] min-w-[250px] text-center gap-12 rounded py-4 sm:py-12">

        <strong className="text-2xl "><u>Create Account</u></strong>


        <form className=" flex flex-col justify-center text-left gap-[2px] ">

          <p className="font-semibold">userName</p>
          <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="text" value={userName} onChange={(event) => setUserName(event.target.value)} />
          <p className="font-semibold">E-mail</p>
          <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <p className="font-semibold">Password</p>
          <input className="mb-4 p-1 rounded w-full border-2 border-black border-solid" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className=" rounded border-2 border-black border-solid mt-4 sm:mt-8 p-1 bg-blue-400 active:bg-blue-500" type="submit" onClick={register}>{isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Create Account"}</button>

        </form>
        <p className="-mt-4 sm:mt-0">Have an account? <Link to="/login"  className="font-semibold text-blue-800"><u>Login</u></Link></p>

      </div>

    </div>
  )
}

export default Register