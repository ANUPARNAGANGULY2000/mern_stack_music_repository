import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {Logo} from '../assets/images' 
import {FaCrown, FaSignOutAlt} from 'react-icons/fa'
import {useStateValue } from  "../contaxt/StateProvider";
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase.config';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Header = () => {

  const [{user}, dispatch] = useStateValue() ;
  const navigate = useNavigate();
  const [Isbox , setIsBox] = useState(false);
  const signOut = () =>{

    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then( () => {
      window.localStorage.setItem("auth", "false");
    }).catch((error) => console.log(error));
    navigate("/login",{replace : true})
  }

    let activeStyle = {
        textDecoration: "underline",
      };
    
      let activeClassName = "underline";

  return (
    <header className=' w-full h-auto items-center flex p-4 sm:py-2 sm:px-4 md:py-2 md:px-4'>
        <NavLink to={"/"}>
           <img src={Logo} alt="Logo" className=' w-20'/>
        </NavLink>
       
        <ul className='flex justify-center items-center ml-7'>
                <li className='mx-5 text-lg'><NavLink to={"/home"} style={({ isActive }) =>isActive ? activeStyle : undefined}>Home</NavLink></li>
                <li className='mx-5 text-lg '><NavLink to={"/musics"} style={({ isActive }) =>isActive ? activeStyle : undefined}>Musics</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={"/premium"} style={({ isActive }) =>isActive ? activeStyle : undefined}>Premium</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={"/contact" } style={({ isActive }) =>isActive ? activeStyle : undefined}>Contact Us</NavLink></li>
        </ul>

        <div 
          onMouseEnter={()=> setIsBox(true)}
          onMouseLeave={()=>setIsBox(false)}
          className='flex items-center cursor-pointer ml-auto gap-2'>
            <img  src={user?.user.imageURL} className=' w-12 h-12 min-w-[44px] rounded-full object-cover shadow-lg' alt='' referrerPolicy='no-referrer'/>
            <div className='flex flex-col' >
              <p className=' text-lg text-textColor hover:text-headingColor font-semibold'>{user?.user?.name}</p>
              <p className='flex text-sm gap-2 items-center text-gray-500 font-normal'>Premimum MemberShip <FaCrown  className=' text-yellow-500'/></p>
            </div>

            {Isbox && (

<motion.div 
initial={{opacity : 0, y : 50}}
animate = {{opacity : 1 ,y: 0}}
exit = {{opacity : 0 , y : 50}}
className=' absolute z-10 top-14 p-3 right-0 w-275 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col'>
<NavLink to={'/profile'}>
   <p className=' text-base text-textColor hover:font-semibold duration-75 transition-all ease-in-out'>profile</p>
   
</NavLink>
<p className=' text-base text-textColor hover:font-semibold duration-75 transition-all ease-in-out'>My Favourites</p>

<hr/>

{
    user?.user?.role === "admin" && (
<NavLink to={"/dashboard/home"}>
<p className=' text-base text-textColor hover:font-semibold duration-75 transition-all ease-in-out'>My Dashboard</p>
<hr/>

</NavLink>
)
      
}

<p className=' text-base items-center text-textColor hover:font-semibold duration-75 transition-all ease-in-out flex gap-2 font-normal ' onClick={signOut}>Sign Out <FaSignOutAlt/></p>

</motion.div>
            )}
           
        </div>
    </header>
  )
}
export default Header
