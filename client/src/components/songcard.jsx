import React from 'react';
import {motion} from 'framer-motion';
import {MdDelete} from "react-icons/md";

const SongCard = ({data, i}) => {
  return (
    <motion.div  className=' relative  w-48  min-w-[160px] h-full min-h-[160px] px-2 py-4 cursor-pointer hover:bg-slate-300 bg-gray-200 shadow-md rounded-lg flex flex-col items-center overflow-hidden '>
      <div className=' h-40 w-40 '>
        <motion.img  whileHover={{ scale: 1.05 }} src={data.imageURL} className=' w-full h-full rounded-lg object-cover'>
        </motion.img>

      </div>

      <p className=' text-base text-headingColor my-2 font-semibold'>{ data.name.length > 25 ? `{data.name.slice(0,25)}..` : data.name}
            <span className=' block text-gray-500 my-1 text-sm'>{ data.artist.length > 25 ? `{data.artist.slice(0,25)}..` : data.artist}</span>
      </p>

    <div className=' w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
      
    <motion.i whileTap={{scale : 0.75 }} className=' text-red-400 hover:text-red-600 drop-shadow-md text-base' >
     <MdDelete className=' text-red-600'/>
    </motion.i>
   </div>
    
    </motion.div>
  )
}

export default SongCard;
