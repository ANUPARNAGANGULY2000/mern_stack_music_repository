import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStateValue } from "../contaxt/StateProvider";
import { userValid } from "../api";
import { actionType } from "../contaxt/reducer";
import { LoginVideo } from "../assets/video";

const Login = ({ setAuth }) => {

  
  const firebaseAuth = getAuth(app);

  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {

    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
    if (userCred) 
    {
      setAuth(true);//that means we get the  user authentication data   

      window.localStorage.setItem("auth", "true");

      firebaseAuth.onAuthStateChanged((userCred) => {

      if (userCred) {
      userCred.getIdToken().then((token) => {
       //console.log(token);
       userValid(token).then((data) => {
        dispatch({
          type: actionType.SET_USER,
          user: data,
           });
        });
      });
      navigate("/", { replace: true });

      
  } else {
        setAuth(false);
        dispatch({
         type: actionType.SET_USER,
         user: null,
        });
        navigate("/login");
      }
        });
      }
    });
  };
  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <div className="w-screen h-screen relative">
      <video src={LoginVideo} autoPlay muted loop className=" w-full"></video>
      <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
        <div
          className="w-full md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center
         justify-center "
        >
          <div
            className=" flex justify-center items-center gap-4 px-2 py-4 rounded-md cursor-pointer hover:bg-card hover: shadow-md 
            duration-100 ease-in-out transition-all"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-xl" />
            Login with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
