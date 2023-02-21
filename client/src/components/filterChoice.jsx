import React, { useEffect } from 'react';
import {FilterButton} from './index';
import {VscClearAll} from 'react-icons/vsc';
import {motion} from 'framer-motion';
import {actionType} from '../contaxt/reducer';
import {useStateValue} from '../contaxt/StateProvider';
import {getAllAlbums,getAllArtist } from "../api";

export const filter = [
    { id : 1 , name: "Jazz" , value : "jazz"},
    { id : 2 , name: "Rock" , value : "rock"},
    { id : 3 , name: "Melody", value: "melody"},
    { id : 4 , name : "Karoke", value: "karoke"},
    { id : 5 , name : "hip-hop", value: "hip-hop"},
  ];
  export const Language = [
  
    { id : 1 , name: "Bengali" , value: "bengali" },
    { id : 2 , name: "English" , value: "english" },
    { id : 3 , name: "Hindi"   , value: "hindi" },
    { id : 4 , name: "Tamil"   , value: "tamil" },
    { id : 5 , name: "Malayalam" , value: "malayalam"},
  
  ];

const FilterChoice = ({ setFilteredMusic  }) => {
    const [{allArtists , allAlbums } , dispatch ] = useStateValue();

    useEffect( () => {

        if(!allAlbums)
        getAllAlbums().then((data)=>{
            dispatch({
                type: actionType.SET_ALL_ALBUMS, 
                allAlbums:data.album,
            })
        })
    } , []);

    useEffect( () => {

        if(!allArtists)
        getAllArtist().then((data)=>{
            dispatch({
                type: actionType.SET_ALL_ARTISTS, 
                allArtists:data.artists,
            })
        })
    } , []);

    
const clearfilter = () => { 
    
        setFilteredMusic(null);

        dispatch({ type: actionType.SET_ALBUM_FILTER,  albumFilter: null });
      
        dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
      
        dispatch({ type : actionType.SET_LANGUAGE_FILTER,languageFilter:null });
      
        dispatch({ type: actionType.ALL_FILTER, allFilter:null,
    })
}
       
  return (

    <div className=' w-880 flex gap-10 p-4 shadow-md justify-between items-center flex-wrap'>
    <FilterButton filterData={allArtists}  flag={"Artist"}/>
    <FilterButton filterData={allAlbums}  flag={"Album"}/>
    <FilterButton filterData={Language}  flag={"Language"}/>
    <FilterButton filterData={filter}  flag={"Category"}/>
    <motion.div whileTap={{scale :0.75} } onClick={clearfilter}><VscClearAll className=' text-2xl' /></motion.div>
    </div>
  )
}

export default FilterChoice ;
