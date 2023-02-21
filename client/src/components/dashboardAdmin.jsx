import React, { useEffect } from 'react';
import {actionType} from '../contaxt/reducer';
import {useStateValue} from '../contaxt/StateProvider';
import {getAllArtist} from '../api/index';
import {motion } from 'framer-motion';

const DashboardAdmin = () => {

  const [{allArtists} , dispatch ] =useStateValue();
  useEffect(() => {

    if(!allArtists){
      getAllArtist().then((data) => {
        dispatch({ type : actionType.SET_ALL_ARTISTS, allArtists : data.artists , });
      })
    }
  } ,[]);


  return (
    <div className=' w-full p-4 flex items-center justify-center '>
      <div className=' flex flex-wrap w-full gap-3  border border-gray-400 rounded-md justify-evenly p-4 my-4 py-14 '>
      { allArtists && allArtists.map((data , index )=> (
          <>
          <ArtistCard key={index} data={data} index = {index}/>
          </>
        ))}
      </div>
      
    </div>
  )
}

export const ArtistCard = ({data , index }) =>{

  return (
    <motion.div  
    initial= { { opacity : 0 , translateX : -50  } }
    animate= { { opacity : 1 , translateX : 0 }}
    transition ={ { duration : 0.3 ,delay : index * 0.1 } }
    className =' relative overflow-hidden w-44 min-w-[180px] cursor-pointer py-4 px-2 gap-4  hover:shadow-xl hover:bg-card bg-gray-200 
    rounded-md flex flex-col'> 
    <img src={data.imageURL} alt='' className=' w-full h-40 object-cover rounded-md '></img>
    <p className=' text-base text-textColor'>{data. name }</p>
    </motion.div>
  )

} 
export default DashboardAdmin;
