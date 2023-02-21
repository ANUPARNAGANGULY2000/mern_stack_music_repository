import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import {Login , Home , Dashboard ,MusicPlayer , Loader} from './components/index';
import {app} from './config/firebase.config';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {AnimatePresence , motion} from 'framer-motion'
import {userValid , getAllSongs  } from "./api";
import {useStateValue } from  "./contaxt/StateProvider";
import { actionType } from './contaxt/reducer';

const App = () => {


  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [loading , setLoading ] = useState(false);

  const [{user , allSongs , songTrack , isPlayerOn , miniplayer  }, dispatch] = useStateValue() ;
  const [ auth, setAuth ] = useState(false || window.localStorage.getItem("auth") === "true");

  useEffect( ()=>{
    setLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if(userCred){
        userCred.getIdToken().then((token)=>{
          //console.log(token);
          userValid (token).then((data) => {
              //console.log(data);

              dispatch( {

                type: actionType.SET_USER ,
                user : data ,
              })
          })
        })

        setLoading(false);
      }else{
        setAuth(false);
        dispatch({
          type : actionType.SET_USER ,
          user : null, 
        });
        setLoading(false);
        window.localStorage.setItem("auth" , "false");
        navigate("/login");

      }

    });
  },[]);


  useEffect( () => {

    if(!allSongs && user ){
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs:data.songs,
        })
      })
    }
  } , []);

  return (

    <AnimatePresence >
      <div className='h-auto min-w-min flex justify-center items-center bg-primary'>
        {loading || (
          !user && (
            <div className=' fixed inset-0 bg-loaderOverlay backdrop-blur-sm'>
              <Loader/>
            </div>
          )
        )

        }
        <Routes>
            <Route path='/login' element= {<Login setAuth={setAuth} />} />
            <Route path='/*' element= {<Home  />} />
            <Route path ='/dashboard/*' element = {<Dashboard />}/>
        </Routes>
        
        {isPlayerOn && (
          <motion.div initial={{ opacity : 0 , y:50 }}
          animate={{ opacity : 1 , y:0}}
          exit={{opacity : 0, y:50}}  className ={`flex justify-center bg-cardOverlay drop-shadow-2xl fixed min-w-[700px] h-28 
          inset-x-0 bottom-0 backdrop-blur`}> 
            <MusicPlayer/>

          </motion.div>
        )}
      </div>
    </AnimatePresence>
  
  )
}

export default App
