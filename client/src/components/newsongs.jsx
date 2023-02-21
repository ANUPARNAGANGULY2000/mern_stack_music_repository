import React from 'react'
import {getStorage , ref , getDownloadURL , uploadBytesResumable,deleteObject} from "firebase/storage";
import {BiCloudUpload} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import {motion} from "framer-motion";

import {storage} from "../config/firebase.config";

import {useStateValue} from "../contaxt/StateProvider";
import {actionType} from "../contaxt/reducer";

import {getAllSongs,getAllAlbums,getAllArtist , saveSongs , saveArtist , saveAlbums} from "../api";

import {FilterButton}  from "./index";
import { useState , useEffect } from 'react';



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


const NewSongs = () => {

  /* State value of songs  */
  const [songName ,setSongName] = useState("");
  const [isImageLoading , setIsImageLoading ] = useState(false);
  const [loadingProgress , setLoadingProgress] = useState(0);
  const [isImageCover , setIsImageCover] = useState(null);

  const [songCoverImage , setSongCoverImage ] = useState(null);
  const [audioUploadProgress , setAudioUploadProgress ] = useState(0);
  const [isAudioLoading , setIsAudioLoading ]= useState(false); 

  /** state value of artist  */
  const [artistName , setArtistName ] = useState("");
const [instagramId , setInstagramId] = useState("");
const [facebookId , setFacebookId ] = useState("");
const [twitterId , setTwitterId ] = useState("");
const [artistImage ,setArtistImage ]= useState(null);
const [isArtistImageLoading , setIsArtistImageLoading ] = useState(false);
const [artistLoadingProgress , setArtistLoadingProgress] = useState(0);

/** state value of album  */
const [albumName , setAlbumName ] = useState("");
const [albumCover , setAlbumCover ] = useState(null);
const [isAlbumCoverLoading , setIsAlbumCoverLoading ] = useState(false) ;
const [isAlbumProgress , setIsAlbumProgress ] = useState(0);

  const [{allArtists , allAlbums ,albumFilter , artistFilter ,  languageFilter , allFilter ,  allSongs} , dispatch ] = useStateValue();

/** load allartist and albums */
useEffect(()=>{
if(!allArtists){
getAllArtist().then((data)=> {
dispatch({ type: actionType.SET_ALL_ARTISTS, allArtists: data.artists, })
  })
  }
if(!allAlbums){
getAllAlbums().then((data)=> {
dispatch({ type: actionType.SET_ALL_ALBUMS, allAlbums: data.album , })
})
}
} , [] );


/** save value for songs */
const save = () => {

 if(songName && isImageCover && songCoverImage){
    setIsImageLoading(true);
    setIsAudioLoading(true);
    const data = {

      name : songName ,
      imageURL : isImageCover,
      songURL : songCoverImage,
      artist  : artistFilter,
      albumm  : albumFilter,
      language : languageFilter, 
      category : allFilter,  
    }
    saveSongs(data).then((res) => {
      getAllSongs().then((data) => {
        dispatch({ type:actionType.SET_ALL_SONGS, allSongs:data.songs,  })
      })
    })

    setIsImageLoading(false);
    setIsAudioLoading(false);
    setIsImageCover(null);
    setSongCoverImage(null);
    setSongName("");
    dispatch({  type: actionType.SET_ALBUM_FILTER, albumFilter:null, });
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter:null, });
    dispatch({ type : actionType.SET_LANGUAGE_FILTER,  languageFilter:null, })
    dispatch({ type: actionType.ALL_FILTER,  allFilter:null, })

  }
}

/** save the value of artist  */
const savetheArtist = () => {

  if(artistName && instagramId && facebookId && twitterId && artistImage){
    
    setIsArtistImageLoading(true);
    const data = {
        name : artistName ,
        imageURL : artistImage, 
        instagram : instagramId, 
        facebook : facebookId, 
        twitter : twitterId ,
      };
    saveArtist(data).then((res)=>{
    getAllArtist().then((data) => {
    dispatch({
    type:actionType.SET_ALL_ARTISTS,
    allArtists: data.artists
    })
   })
   })
  setIsArtistImageLoading(false);
  setArtistName("");
  setInstagramId("");
  setFacebookId("");
  setTwitterId("");
  setArtistImage(null);
  }
  };

  /** save the value of album  */
const saveNewAlbum = () => {
if(albumName && albumCover){
 setIsAlbumCoverLoading(true);
      
  const data = {
  
   name : albumName ,
   imageURL : albumCover,
   }
  saveAlbums(data).then((res)=> {
  getAllAlbums().then((data) => {
  dispatch({ type:actionType.SET_ALL_ALBUMS,  allAlbums: data.album ,})
    })
  })
  
 setAlbumCover(null);
 setAlbumName("");
 setIsAlbumCoverLoading(false);
}
}

/** Delete the song image and audio  */
const deleteFile = (location , isImage) => {

  if(isImage){
    setIsImageLoading(true);
    setIsAudioLoading(true);}
  const deleteRef = ref(storage , location);
  deleteObject(deleteRef).then(() => {
    setIsImageCover(null);
    setSongCoverImage(null);
    setIsImageLoading(false)
    setIsAudioLoading(false)})
 .catch((error) => {
   // console.log(error);
  });
}

/** Delete the album image  */
const deleteAlbum = (location) => {

setIsAlbumCoverLoading(true);
setAlbumCover(null);
const deleteRef = ref(storage , location);
deleteObject(deleteRef).then(() => {
  setIsAlbumCoverLoading(false);
  })
.catch((error) => {
  //console.log(error);
});
}

/** Delete the artist */
const deleteArtist = (location) => {

 
  setIsArtistImageLoading(true);
    setArtistImage(null);
  const deleteRef = ref(storage , location);
  deleteObject(deleteRef).then(() => {
    setIsArtistImageLoading(false);  
  })
 .catch((error) => {
    //console.log(error);
  });

}

 return (
  <div className=' flex gap-8 '>
    
    <div className=' p-4 border border-gray-400 flex flex-col  rounded-md gap-3 '>
      <div className=' flex items-center justify-center text-xl font-bold'>New Song Details</div>
        <input type="text" placeholder='Enter Song name...' className=' w-full p-4 rounded-md border border-gray-400 text-base font-semibold text-textColor outline-none shadow-md bg-transparent hover:border-gray-500' value={songName} onChange={(e) => setSongName(e.target.value)}/>
        
        <div className=' w-full flex gap-10 p-4 shadow-md justify-between items-center flex-wrap'>
        <FilterButton filterData={allArtists}  flag={"Artist"}/>
        <FilterButton filterData={allAlbums}  flag={"Album"}/>
        <FilterButton filterData={Language}  flag={"Language"}/>
        <FilterButton filterData={filter}  flag={"Category"}/>
        </div>
  
  
      <div className=' bg-card backdrop-blur-md border-2 border-dotted rounded-md h-300 w-656 relative border-gray-400 cursor-pointer
           hover:border-gray-600 hover:shadow-md  transition-all duration-150 ease-in-out '>
          
          { isImageLoading &&  <FileUploadProgess progress={loadingProgress} />}
         { !isImageLoading && (
            <> {!isImageCover ? (
  
            <FileUpload 
             updateState = {setIsImageCover} 
             setProgress = {setLoadingProgress} 
             isLoading ={setIsImageLoading} 
             isImage ={true}/> ) :(
  
              <div className=' w-full h-full relative overflow-hidden rounded-md'>
  
                <img src={isImageCover} alt='' className=' w-full h-full object-cover' ></img>
  
                <button className=' absolute bottom-3 right-3 p-3 bg-white rounded-full text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out' onClick={()=> deleteFile(isImageCover , true)}>
                <MdDelete className=' text-red-600' onClick={()=> deleteFile(isImageCover , true)}/>
                </button>
  
              </div>
              
            )}</>
        )}
       </div>
    
  
  
      {/* audio file */}
      <div className=' bg-card backdrop-blur-md border-2 border-dotted rounded-md h-300 w-656 relative border-gray-400 cursor-pointer
           hover:border-gray-600 hover:shadow-md  transition-all duration-150 ease-in-out '>
          
          { isAudioLoading &&  <FileUploadProgess progress={audioUploadProgress} />}
         { !isAudioLoading && (
            <> {!songCoverImage ? (
  
            <FileUpload 
             updateState = {setSongCoverImage} 
             setProgress = {setAudioUploadProgress} 
             isLoading ={setIsAudioLoading} 
             isImage ={false}/> ) :(
  
              <div className=' w-full h-full relative overflow-hidden rounded-md flex items-center justify-center'>
  
                <audio src={songCoverImage} controls ></audio>
  
                <button className=' absolute bottom-3 right-3 p-3 bg-white rounded-full text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out' >
                <MdDelete className=' text-red-600' onClick={()=> deleteFile(songCoverImage , false)}/>
                </button>
                
              </div>
              
            )}</>
        )}
       </div>
    
      <div className=' flex items-center justify-center w-full p-4'>
        { isImageLoading && isAudioLoading ? ( 
        <Processing/>
  
        ) : ( 
  
          <motion.button whileTap={{scale : 0.75}} 
          className=' rounded-md text-white bg-red-600 hover:shadow-lg px-8 py-3 '
          onClick={save}> Save Song</motion.button>
        )}
      </div>
  </div>
    
    <div>
    <div className='p-4 border border-gray-400 flex flex-col rounded-md gap-3 w-656'> 
        <div className=' flex items-center justify-center text-xl font-bold'>New Artist Details</div>
        <input type="text" placeholder='Enter Artist Name here.....' value={artistName} onChange={(e) => setArtistName(e.target.value)}
        className=' w-full p-4 rounded-md border border-gray-400 text-base font-semibold text-textColor outline-none shadow-md bg-transparent hover:border-gray-500'></input>


        <input type="text" placeholder='https://www.instagram.com/artistsname/?hl=en' value={instagramId} onChange={(e) => setInstagramId(e.target.value)}
        className=' w-full p-4 rounded-md border border-gray-400 text-base font-semibold text-textColor outline-none shadow-md bg-transparent hover:border-gray-500'></input>

        <input type="text" placeholder='https://www.facebook.com/artistname/' value={facebookId} onChange={(e) => setFacebookId(e.target.value)}
        className=' w-full p-4 rounded-md border border-gray-400 text-base font-semibold text-textColor outline-none shadow-md bg-transparent hover:border-gray-500'></input>

        <input type="text" placeholder='https://twitter.com/artistname?lang=en' value={twitterId} onChange={(e) => setTwitterId(e.target.value)}className=' w-full p-4 rounded-md border border-gray-400 text-base font-semibold text-textColor outline-none shadow-md bg-transparent hover:border-gray-500'></input>

        {/* artist image */}

        <div className='bg-transparent border rounded-md h-300 w-full  border-gray-400 cursor-pointer
         hover:border-gray-600 hover:shadow-md  transition-all duration-150 ease-in-out '>
        
        { isArtistImageLoading  &&  <FileUploadProgess progress={artistLoadingProgress} />}
        { !isArtistImageLoading  && (
          <> {!artistImage  ? (

          <FileUpload 
           updateState = {setArtistImage} 
           setProgress = {setArtistLoadingProgress} 
           isLoading ={setIsArtistImageLoading} 
           isImage ={true}/> ) :(

            <div className=' w-full h-full relative overflow-hidden rounded-md'>

              <img src={artistImage} alt='' className=' w-full h-full object-cover' ></img>

              <button className=' absolute bottom-3 right-3 p-3 bg-white rounded-full text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out' onClick={()=> deleteFile(artistImage , true)}>
              <MdDelete className=' text-red-600' onClick={()=> deleteArtist(artistImage)}/>
              </button>

            </div>
            )}
          </>
      )}
     </div>

     <div className=' flex items-center justify-center w-full p-4'>
      { isArtistImageLoading ? ( 
      <Processing/>

      ) : ( 

        <motion.button whileTap={{scale : 0.75}} 
        className=' rounded-md text-white bg-red-600 hover:shadow-lg px-8 py-3 '
        onClick={savetheArtist}> Save Artist</motion.button>
      )}
    </div>
     </div>
     <div className='p-4 border border-gray-400 flex flex-col rounded-md gap-3 w-656'> 
    <div className=' flex items-center justify-center text-xl font-bold'>New Album Details</div>
    <input type="text" placeholder='Enter Album Name here ...' value={albumName} onChange={(e) => setAlbumName(e.target.value)}
       className=' w-full p-4 rounded-md border border-gray-400 text-base font-semibold text-textColor outline-none shadow-md bg-transparent hover:border-gray-500'></input>

       <div className='bg-transparent border rounded-md h-300 w-full  border-gray-400 cursor-pointer
        hover:border-gray-600 hover:shadow-md  transition-all duration-150 ease-in-out '>
       {isAlbumCoverLoading && <FileUploadProgess progress={isAlbumProgress}/>}
       {!isAlbumCoverLoading && (
         <>
         { !albumCover ? ( <FileUpload 
          updateState = {setAlbumCover} 
          setProgress = {setIsAlbumProgress} 
          isLoading ={setIsAlbumCoverLoading } 
          isImage ={true}/>) : (<div className=' w-full h-full relative overflow-hidden rounded-md'>

          <img src={albumCover} alt='' className=' w-full h-full object-cover' ></img>

          <button className=' absolute bottom-3 right-3 p-3 bg-white rounded-full text-xl cursor-pointer outline-none border-none hover:shadow-md duration-200 transition-all ease-in-out' onClick={()=> deleteFile(albumCover , true)}>
          <MdDelete className=' text-red-600' onClick={()=> deleteAlbum(albumCover)}/>
          </button>

        </div>)}
         </>
       )}
</div>
{/*album save button */}

<div className=' flex w-full items-center justify-center'>
         {isAlbumCoverLoading ? (
           <Processing />
         ) : (
           <motion.button whileTap={{scale : 0.75}} 
           className='rounded-md text-white bg-red-600 hover:shadow-lg px-8 py-3 ' onClick={saveNewAlbum}>Save Album</motion.button>
         )}
       </div>
       
    </div>

    </div>
    
 </div>
)
}



export const FileUploadProgess = ({progress}) =>{
  console.log("progress");

  return (
    <div  className=' w-full h-full flex flex-col items-center justify-center'>
      <div className=' w-14 h-14 bg-green-600 animate-bounce rounded-full flex items-center justify-center relative'>
        <div className=' absolute inset-0 rounded-full blur-xl bg-green-600'></div>
      </div>
      <p className=' text-textColor font-semibold text-xl'>
        {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
      </p>

    </div>
  );
};


export const FileUpload = ({  updateState , setProgress, isLoading ,isImage}) => {

//............ first get the file then upload it to the furebase storage...........

  const uploadFile = (e) => {

    isLoading(true);//it will start the loading animation

    const updated = e.target.files[0];  // step to take the value in "updated" veriable 
   
   const storageRef = ref(storage,`${isImage ? "images" : "audio"}/${Date.now()}-${updated.name}`);
   const uploadTask = uploadBytesResumable(storageRef,updated); //uploadByResesumble is a firebase provided function 
   uploadTask.on('state_changed', 
  (snapshot) => {
   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
   setProgress(progress);
   console.log('Upload is ' + progress + '% done');
 }, 
 (error) => {
   console.log(error)
 }, 
 () => {

   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     console.log('File available at', downloadURL);
     updateState(downloadURL);
     isLoading(false);
     setProgress(0);
   });
 }
 );

 }
   
return (
<label>
<div className=' flex flex-col h-full w-full items-center justify-center'>
  <div className=' flex flex-col justify-center items-center' >
    <p className=' font-bold text-2xl'><BiCloudUpload /></p>
    <p className='text-lg'> click to upload {isImage? "an Image" : "an Audio"}</p>
  </div>
</div>
<input type="file" name='upload-file' accept={`${isImage ? "image/*" : "audio/*"}`} className='h-0 w-0' onChange={uploadFile}/>
</label>
  
)}


export const Processing = () => {

  return (
    <button disabled type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
    Loading...
</button>
  )
}

export default NewSongs;
