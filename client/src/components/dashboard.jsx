import React from 'react'
import { IoHome } from "react-icons/io5";
import { NavLink, Route, Routes } from 'react-router-dom';
import Header from './header';
import { DashboardHome , DashboardAdmin , DashboardAlbum , DashboardSongs , DashboardUsers , NewSongs } from './index';



const Dashboard = () => {


  const  activeStyle = " text-lg text-headingColor font-semibold hover:text-headingColor duration-10";
  const notActiveStyle = " text-lg text-textColor hover:text-headingColor duration-100 transition-all";
  
  


  return (
    <div className=' w-full h-auto flex flex-col justify-center items-center bg-primary'>
    <Header/>

    <div className=' w-[60%] my-2 gap-14 p-4 flex justify-center items-center'>
      <NavLink to={"/dashboard/home"} className={({ isActive }) =>isActive ? activeStyle : notActiveStyle}><IoHome className=' text-2xl text-textColor'/></NavLink>
      <NavLink to={"/dashboard/user"}  className={({ isActive }) =>isActive ? activeStyle : notActiveStyle}>Users</NavLink>
      <NavLink to={"/dashboard/songs"}  className={({ isActive }) =>isActive ? activeStyle : notActiveStyle}>Songs</NavLink>
      <NavLink to={"/dashboard/artists"}  className={({ isActive }) =>isActive ? activeStyle : notActiveStyle}>Artists</NavLink>
      <NavLink to={"/dashboard/album"}  className={({ isActive }) =>isActive ? activeStyle : notActiveStyle}>Albums</NavLink>
     </div>

     <div>
      <Routes>

        <Route  path='/home' element={<DashboardHome/>}/>
        <Route  path='/user' element={<DashboardUsers/>}/>
        <Route  path='/songs' element={<DashboardSongs/>}/>
        <Route  path='/artists' element={<DashboardAdmin/>}/>
        <Route  path='/album' element={<DashboardAlbum/>}/>
        <Route  path='/newsongs' element={<NewSongs />}/>

      </Routes>

     </div>
 </div>
  )
}

export default Dashboard ;
