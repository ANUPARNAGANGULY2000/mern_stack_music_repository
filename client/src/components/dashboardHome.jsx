import React from 'react';
import { useEffect } from 'react';
import {useStateValue} from '../contaxt/StateProvider';
import {getAllUser,getAllArtist,getAllSongs ,getAllAlbums } from "../api/index";
import {actionType} from "../contaxt/reducer";
import {FaUser} from "react-icons/fa";
import {RiUserStarFill} from "react-icons/ri";
import {GiLoveSong , GiMusicalNotes} from "react-icons/gi";



export const bgColors = [ 

  "#ddb2e6",
  "#e0b7bd",
  "#a9f6bb",
  "#b7c6d0",
  "#aae8f2",
  "#b2eec5",
  "#ffe2ad",
  "#dfdf93",
  "#f0c1c1",
  "#eac3e2",
  "#dbb0b0",
];





export const DashboardCard = ({ icon , name , count })=>{


  const bg_color = bgColors[parseInt(Math.random() * bgColors.length)];
  return (

    <div  style ={{ background : `${bg_color}`}} className={' p-4 w-40 gap-3 h-auto rounded-lg shadow-md flex flex-col justify-center items-center'}> 
      {icon}
      <p className=' text-xl text-textColor font-semibold'> {name}</p>
      <p className=' text-xl text-textColor font-semibold'> {count}</p>
    </div>
  );
};



const DashboardHome = () => {

  const [{allUsers ,allArtists ,allAlbums ,allSongs }, dispatch ] = useStateValue();



  useEffect (()=>{

    if(!allUsers)
    {
      getAllUser().then((data)=>{
       // console.log(data);

       dispatch({

        type : actionType.SET_ALL_USERS,
        allUsers : data.user,
       })
      })
    }


    if(!allArtists){

      getAllArtist().then((data)=> {
        console.log("artist calling ");
        //console.log(data);

        dispatch({

          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists,
        })
      })
    }

    if(!allSongs){

      getAllSongs().then((data)=> {
        console.log("songs calling ");
       // console.log(data);

        dispatch({

          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        })
      })
    }

    if(!allAlbums){

      getAllAlbums().then((data)=> {
        console.log("album calling ");
       // console.log(data);

        dispatch({

          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album,
        })
      })
    }


  } , []);
  return (
    <div className=' w-full p-4  gap-6 flex items-center flex-wrap'>
      <DashboardCard  icon={< FaUser className='text-3xl text-textColor'/>} name={"User"} count={allUsers?.length >0 ? allUsers.length : 0 }/>
      <DashboardCard  icon={<GiLoveSong className='text-3xl text-textColor'/>} name={"Songs"} count={allSongs?.length >0 ? allSongs.length : 0}/>
      <DashboardCard  icon={<RiUserStarFill className='text-3xl text-textColor' />} name ={"Artists"} count={ allArtists?.length > 0 ? allArtists.length : 0 }/>
      <DashboardCard icon={<GiMusicalNotes  className='text-3xl text-textColor' />} name={"Albums"} count ={allAlbums?.length > 0 ? allAlbums.length : 0 }/> 
    </div>
  )
}

export default DashboardHome;
