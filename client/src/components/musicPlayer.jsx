import React,{useEffect,useState} from 'react';
import {useStateValue} from '../contaxt/StateProvider';
import {actionType} from '../contaxt/reducer';
import {RiPlayListFill} from 'react-icons/ri';
import {IoMdClose ,IoMdMusicalNote ,IoMdShareAlt} from "react-icons/io";
import {motion} from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {getAllSongs} from "../api/index";
import {AiOutlineHeart} from 'react-icons/ai';

const MusicPlayer = () => {

    const [ {allSongs , songTrack , isPlayerOn ,  miniplayer } ,dispatch ] = useStateValue();
    const [ playlist ,setPlaylist ] = useState(false);

    const nextPlay = () => {
        if(songTrack > allSongs.length){
            dispatch({
                type : actionType.SET_SONG_TRACK,
                songTrack: 0 ,
            })
        }
        else{
            dispatch({
                type: actionType.SET_SONG_TRACK,
                songTrack : songTrack + 1 ,
            })
        }
    }

    const previousPlay = () => { 

        if(songTrack === 0){
            dispatch({
                type: actionType.SET_SONG_TRACK,
                songTrack : 0
            })
        }
        else{
            dispatch({
                type: actionType.SET_SONG_TRACK,
                songTrack : songTrack - 1,
            })
        }
    }

    const closePlayer = () => {
        if(isPlayerOn){
            dispatch({
                type: actionType.SET_IS_PLAYER_ON,
                isPlayerOn : false,
            })
        }
    }

    const toggolPlayer = () => {
        if(miniplayer){
            dispatch({
                type: actionType.SET_MINI_PLAYER,
                miniplayer:false ,
            })
        }
        else{
            dispatch({
                type: actionType.SET_MINI_PLAYER,
                miniplayer:true ,
            })
        }
    }

    useEffect(()=>{
        if(songTrack > allSongs.length ){
            dispatch({
                type : actionType.SET_SONG_TRACK , 
                songTrack : 0, 
            })
        }
    } , [songTrack])

    const toggol = () => {
         if (playlist == true)
        {  
            setPlaylist(false)
        } 
        else {
            setPlaylist(true)
        } 
    }

  return (
    <div className=' w-full flex items-center gap-3 '>
        <div className=" w-full full items-center gap-3 p-4 bg-slate-300  flex relative">
            <img src={allSongs[songTrack]?.imageURL} className='w-40 h-20 object-cover rounded-md' alt=''/>
            <div className=' flex flex-col items-start'>
                <p className=' text-headingColor text-xl font-semibold'>
                    {`${allSongs[songTrack]?.name.length > 20? allSongs[songTrack]?.name.slice(0,20) : allSongs[songTrack]?.name}`}{" "}
                    <span className='text-base'>({allSongs[songTrack]?. albumm})</span>
                </p>
                <p className=' text-gray-700 font-semibold text-sm'>
                    {`${allSongs[songTrack]?.artist}`}
                </p>
                <motion.i whileTap={{scale:0.8}} onClick={ toggol} className=' flex gap-4'>
                    <RiPlayListFill className=' text-textColor hover:text-headingColor text-3xl cursor-pointer'/>
                    <AiOutlineHeart className=" text-textColor hover:text-headingColor text-3xl cursor-pointer"/> 
                </motion.i>

                

            </div>

            <div className=' flex-1 '>
                <AudioPlayer src={allSongs[songTrack]?.songURL} onPlay={(e)=> console.log("onPlay")} autoPlay={true} onClickNext={nextPlay} 
                onClickPrevious={previousPlay} showSkipControls={true} /> 
            </div>
            <div className=' h-full flex flex-col gap-3 justify-center items-center '>
                <motion.i whileTap={{scale:0.8}} onClick={closePlayer}>
                    <IoMdClose  className=" text-textColor hover:text-headingColor text-2xl cursor-pointer"/>
                </motion.i>

                <motion.i whileTap={{scale:0.8}} onClick={() => toggolPlayer}> 
                    <IoMdShareAlt className=" text-textColor hover:text-headingColor text-2xl cursor-pointer"/> 
                </motion.i>
            </div>
        </div>
        { playlist && (
            <>
            <PlaylistBook />
            </>
        )}
     
    </div>
  )
}

export const PlaylistBook = () => {

    const [{allSongs , songTrack  , isPlayerOn } , dispatch ] = useStateValue();

    useEffect( () => {
        if(!allSongs){
            getAllSongs().then((data) => {
                dispatch({
                    type :actionType.SET_ALL_SONGS ,
                    allSongs: data.songs,
                })
            })
        }
    } , [] );

    const CurrentPlay = (index) => {
        if(!isPlayerOn){
            dispatch({
                type: actionType.SET_IS_PLAYER_ON,
                isPlayerOn:true ,
            })
        }
        if(songTrack !== index ){
            dispatch({
                type: actionType.SET_SONG_TRACK,
                songTrack: index ,
            })
        }
    }

    return ( 
        <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll 
        shadow-md bg-primary z-50'>
            {allSongs.length > 0 ? (
                allSongs.map((music , index ) => (
                    <motion.div key={index}
                    initial={{ opacity : 0 , translateX : -50}}
                     animate={{ opacity : 1 , translateX : 0 }}
                     transition ={{ duration : 0.3 , delay: index * 0.2 }}
                     className={` w-full group p-4 hover:bg-gray-300 flex gap-3 items-center cursor-pointer ${
                     music._id === songTrack._id  ?  "bg-card" : "bg-cardOverlay"}`}
                      onClick={() => CurrentPlay(index)} >
                        
                    <IoMdMusicalNote className=' text-2xl text-textColor hover:text-headingColor cursor-pointer'/> 
                    <div className=' flex flex-col items-start '>
                        <p className=' text-headingColor text-lg font-semibold'>
                            {`${music?.name.length > 20 ? music?.name.slice(0,20) : music?.name }`}{" "}
                            <span className='text-base'>({music?.albumm})</span>
                         </p>
                         <p className='text-textColor'>
                            {music?.artist}{" "}
                            <span className=' font-semibold text-textColor text-sm'>{music?.category} </span>
                         </p>
                    </div>
                    </motion.div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default MusicPlayer;
