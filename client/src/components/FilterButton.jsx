import React, { useState } from 'react'
import {AiOutlineCaretDown} from 'react-icons/ai';
import {motion} from 'framer-motion';
import {useStateValue} from '../contaxt/StateProvider';
import {actionType} from '../contaxt/reducer';


const FilterButton = ({ filterData ,  flag}) => {

  const [toggle , setToggle] = useState(false);
  const [filterName , setFilterName ] = useState(null)
  const [{allFilter , languageFilter , artistFilter, albumFilter} , dispatch ] = useStateValue();

  const updateFilter = (name)=> {

    setFilterName(name);
    setToggle(false);

  

  if(flag === "Artist")
  {
    dispatch({

      type: actionType.SET_ARTIST_FILTER,
      artistFilter : name,
    })
  }

  if(flag === "Album")
  {
    dispatch({
      type: actionType.SET_ALBUM_FILTER,
      albumFilter: name,
    })
  }

  if(flag === "Language"){

    dispatch({
      type: actionType.SET_LANGUAGE_FILTER,
      languageFilter: name,
    })
  }


  if(flag === "Category"){

    dispatch({
      type: actionType.ALL_FILTER,
      allFilter: name ,
    })
  }
}
  return (
    <div className=' border border-gray-400 rounded-md px-4 py-2 relative cursor-pointer hover:border-gray-500 text-base shadow-md
     justify-between flex'>
     <p className=' flex items-center gap-2 tracking-wide' onClick={() => setToggle(!toggle)}>
      
      { !filterName  &&  flag }
      { filterName && (
        <>
        {filterName.length >15 ? `${filterName.slice(0,14)}...` : filterName }
        
        </>
      )}
      
<AiOutlineCaretDown onClick={()=> setToggle(!toggle)} className={`${toggle ? "rotate-180" : "rotate-0"} transition-all ease-in-out duration-150`}/> </p> 
{toggle && filterData && (

      <motion.div
      initial={{opacity: 0 , y: 50}}
      animate={{opacity: 1 , y: 0}}
      exit={{opacity: 0 , y: 50}}
      className="w-44 z-50 backdrop-blur-sm bg-white max-h-48 rounded-md shadow-md absolute top-9 left-1 overflow-y-scroll  flex flex-col"> 
        
      {filterData ?.map((data) => (

          <div key={data.name}
          className=" flex items-center gap-2 px-2 py-1 hover:bg-gray-300"
          onClick={()=> updateFilter (data.name)} >

          {( flag === "Artist"  || flag === "Album")  && (
            <img src={data.imageURL} alt='' className="w-8 min-w-min h-8 rounded-full object-cover"></img>
            
          )}
          <p className=' w-full'>
            {data.name.length > 15 ? `${data.name.slice(0,15)}...` : data.name}
          </p>

          </div>
        ))}
      
      
      
      </motion.div>
     )}
    </div>
  )
}

export default FilterButton
