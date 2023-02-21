import React,{useEffect, useState} from 'react'
import {Header,SearchBox ,FilterChoice} from './index';
import {useStateValue} from '../contaxt/StateProvider';
import {actionType} from '../contaxt/reducer';
import {getAllSongs} from "../api";
import {motion} from "framer-motion";


const Home = () => {

  const [ filteredMusic,setFilteredMusic ] = useState(null);
  const [{ albumFilter,artistFilter,languageFilter,allFilter,allSongs, allSearch} , dispatch ] = useStateValue();

  useEffect(()=>{
    if(!allSongs)
    {
      getAllSongs().then((data) =>{
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs:data.songs,
        })
      })
    }

},[]);

useEffect( ()=>{

  const filterSong = allSongs?.filter((data)=>  data.artist === artistFilter );
  if(filterSong){
    setFilteredMusic(filterSong);
  } 
  else{
    setFilteredMusic(null);
  }
} , [artistFilter]);


useEffect( ()=>{

  const filterSong = allSongs?.filter((data)=>  data.albumm === albumFilter );
  if(filterSong){
    setFilteredMusic(filterSong);
  } 
  else{
    setFilteredMusic(null);
  }
} , [albumFilter]);


useEffect( ()=>{

  const filterSong = allSongs?.filter((data)=>  data.language === languageFilter );
  if(filterSong){
    setFilteredMusic(filterSong);
  } 
  else{
    setFilteredMusic(null);
  }
} , [languageFilter] );


useEffect( ()=>{

  const filterSong = allSongs?.filter((data)=> data.category === allFilter );
  if(filterSong){
    setFilteredMusic(filterSong);
  } 
  else{
    setFilteredMusic(null);
  }
} , [allFilter] );

useEffect( ()=>{

  const filterSong = allSongs?.filter((data)=> 
  
  data.artist.toLowerCase().includes(allSearch) || 
  data.language.toLowerCase().includes(allSearch) || 
  data.artist.includes(artistFilter) || 
  data.name.toLowerCase().includes(allSearch) ||
  data.category.toLowerCase().includes(allSearch) );

  if(filterSong){
    setFilteredMusic(filterSong);
  } 
  else{
    setFilteredMusic(null);
  }
} , [allSearch] );


  
  return (
    <div className=' w-full h-auto flex flex-col justify-center items-center'>
      <Header/>
      <SearchBox/>
      <FilterChoice setFilteredMusic={setFilteredMusic} />
      <div className=' w-full h-auto flex flex-wrap items-center py-4 px-7 gap-4'>
      <MusicCard music={ filteredMusic ? filteredMusic : allSongs }/>
      </div>

    </div>
  )
}


export const MusicCard = ({ music }) => {

  const [ {songTrack , isPlayerOn} ,  dispatch] = useStateValue();

  const playSong = (index) => {
    console.log("index = " ,index);
    if(!isPlayerOn){
      dispatch({
        type : actionType.SET_IS_PLAYER_ON,
        isPlayerOn: true,
      });
    }
    if(songTrack !== index ){
      dispatch({
        type: actionType.SET_SONG_TRACK,
        songTrack:index ,
      });
    }
  } ;

  return (
    <>

      { music?.map (( data , index) => (

        <motion.div key={data._id} 
        whileTap={{ scale: 0.9 }}
        initial={{ opacity : 0 , translateX : -50}}
        animate={{ opacity : 1 , translateX : 0 }}
        transition ={{ duration : 0.3 , delay: index * 0.1 }}
        className=' flex flex-col w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-md
         relative items-center'
         onClick={() => playSong (index)}>

        <div className=' w-40 h-40 min-w-[160px] min-h-[160px] relative overflow-hidden rounded-lg drop-shadow-lg'>
          <motion.img whileHover={{scale : 1.05 }} src={data.imageURL} alt='' className='w-full h-full object-cover'></motion.img>
        </div>
        <p className=' text-base text-headingColor font-semibold my-2 '>
        { data.name.length > 25 ? `${data.name.slice(0,25)}`: data.name }
        <span className=' text-sm block text-gray-400 my-1'>{data.artist} </span>
        </p>

        </motion.div>
      ))}
    </>
    
  )
}

export default Home;
