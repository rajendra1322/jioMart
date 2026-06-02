import React, { useEffect, useState } from 'react'
import './Userdetails.css'
import Adminhome from './Adminhome'
import axios from 'axios';
import TableSkeleton from './skeletons/TableSkeleton';


function Userdetails  ()  {
    const[users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
       async function fetchData(){
          try {
            const res= await axios.get("https://backend-fgbg.onrender.com/getalluser");
            setUsers(res.data);
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }

       }
       fetchData();
    },[])
    
  return (
   <div className="admin-page bg-gray-100">
  
  
    <Adminhome />

  
  <div className="admin-content">
    
    <h1 className="text-3xl font-bold text-gray-800 mb-2">
      RajMart Users
    </h1>
    <p className="text-gray-500 mb-6">
      Manage and view all registered users
    </p>

    
    {loading ? (
      <TableSkeleton rows={8} cards />
    ) : (
    <div className="grid gap-6 
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">

      {users.map((user) => (
        <div
          key={user._id}
          className="
            bg-gradient-to-br from-blue-400 to-indigo-600
            text-white p-5 rounded-2xl
            shadow-md hover:shadow-2xl
            transform hover:-translate-y-2 hover:scale-[1.02]
            transition-all duration-300 ease-in-out
            cursor-pointer relative overflow-hidden w-full
          "
        >
          
          
          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition duration-300"></div>

          {/* Avatar */}
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 mb-4 text-xl font-bold">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          
          <p className="text-lg font-semibold break-all">
            {user.email}
          </p>

          
          <p className="text-sm mt-2 opacity-90">
            📞 {user.number}
          </p>

        </div>
      ))}

    </div>
    )}
  </div>
</div>
  )
}

export default Userdetails
