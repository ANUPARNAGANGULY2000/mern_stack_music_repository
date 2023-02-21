import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {IoAddSharp} from "react-icons/io5";
import {AiOutlineClear} from "react-icons/ai"
import {getAllSongs} from "../api/index";
import { actionType} from "../contaxt/reducer";
import {useStateValue} from "../contaxt/StateProvider";
import {SongCard} from "./index";




const DashboardSongs = () => {



  const [isClicked , setIsClicked ] = useState(false);

  const [filter , setFilter ] = useState("");

  const [{allSongs } , dispatch ] = useStateValue();

  useEffect(()=> {

    if(!allSongs)
    {
      getAllSongs().then((data) => {
        dispatch({

          type : actionType.SET_ALL_SONGS,
          allSongs: data.songs
        })
      })
    }
  })


  return (
    <div className=' flex flex-col items-center justify-center w-full p-4 '>
      <div className=' w-full flex gap-20 justify-center items-center'>
        <NavLink to={"/dashboard/newsongs"} className=" px-3 py-3 rounded-md border border-gray-500 hover:border-gray-900 hover:shadow-md hover:shadow-slate-500">
            <IoAddSharp className=' text-xl'/>
  
        </NavLink>
        <input type="text" placeholder='Type here to Search....'  className={`w-60 px-4 py-2 border ${isClicked ? "shadow-md border-gray-900 shadow-slate-500" : "border-gray-500"} rounded-md bg-transparent outline-none duration-200 transition-all ease-in-out text-base text-textColor font-semibold`}  value={filter}  onChange= { (e) => setFilter(e.target.value)} onMouseOver={() => setIsClicked(true)}  onMouseLeave={() => setIsClicked(false)}/>

        
      <i>
        <AiOutlineClear className=' text-3xl text-textColor cursor-pointer'/>
      </i>
      </div>
      

      {/* Container of songs  */}

      <div className='relative  p-4 my-4  py-12 border border-gray-500 rounded-md w-full'>
        {/* counter part  */}
          <div className=' absolute top-2 left-4 '>
            <p  className=' font-bold text-xl'>
              <span className=' text-textColor font-semibold text-sm'> Count : </span>  {allSongs?.length}
            </p>
          </div>
          
          <SongsContainer data ={allSongs} />
          
          
         
          

      </div>

    </div>
  )
}


export const SongsContainer = ({data}) => {

  return (
    <div className=' w-full flex flex-wrap justify-evenly items-center gap-4'>
      { data && data.map((songs , i)=> 
    
        <SongCard key={songs._id} data={songs} index={i} />
        
        
        )}
    </div>
    
  );
};
export default DashboardSongs;
