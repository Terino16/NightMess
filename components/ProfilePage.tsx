
"use client";
import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import animationData from '../public/ProfileAnimation.json'; // Replace with the path to your animation JSON file
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';



interface User {
  id:string,
  email:string,
  name: string|null;
  phone: string|null;
  hostel: string|null;
  room: number|null;
  profile:boolean|null;
}

interface ProfilePageProps {
  user: User;
}
const ProfilePage: React.FC<ProfilePageProps>= ({ user }) => {

  const router=useRouter();
  const{data:session,status}=useSession();

  useEffect(()=>{
    if(status=="unauthenticated")
      router.push("/signup");
  })
  const [editMode, setEditMode] = useState({
    name: false,
    phone: false,
    hostel: false,
    room: false,
  });

  const [userData, setUserData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    hostel: user.hostel || '',
    room: user.room || '',
  });

  const handleEditClick = (field:string) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-4 w-full flex justify-around">
      <div className="space-y-8  w-full lg:w-1/2  p-6 rounded-[8px] border border-gray-700">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <div className='space-y-2'>
            <p className="text-sm font-semibold text-gray-500">Name</p>
            {editMode.name ? (
              <input
                type="text"
                name="name"
                value={userData?.name}
                onChange={handleInputChange}
                className="text-lg bg-transparent  border-gray-700 focus:outline-none"
              />
            ) : (
              <p className="text-lg">{userData.name}</p>
            )}
          </div>
          <button onClick={() => handleEditClick('name')} className="text-blue-600">
            {editMode.name ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <div className='space-y-2'>
            <p className="text-sm font-semibold text-gray-500">Phone number</p>
            {editMode.phone ? (
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="text-lg bg-transparent border-b border-gray-700 focus:outline-none"
              />
            ) : (
              <p className="text-lg">{userData.phone || 'Not provided'}</p>
            )}
          </div>
          <button onClick={() => handleEditClick('phone')} className="text-blue-600">
            {editMode.phone ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <div className='space-y-2'>
            <p className="text-sm font-semibold text-gray-500">Hostel</p>
            {editMode.hostel ? (
              <input
                type="text"
                name="hostel"
                value={userData.hostel}
                onChange={handleInputChange}
                className="text-lg bg-transparent border-b border-gray-700 focus:outline-none"
              />
            ) : (
              <p className="text-lg">{userData.hostel || 'Not provided'}</p>
            )}
          </div>
          <button onClick={() => handleEditClick('hostel')} className="text-blue-600">
            {editMode.hostel ? 'Save' : 'Edit'}
          </button>
        </div>

        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <div className='space-y-2'>
            <p className="text-sm font-semibold text-gray-500">Room</p>
            {editMode.room ? (
              <input
                type="number"
                name="room"
                value={userData.room}
                onChange={handleInputChange}
                className="text-lg bg-transparent border-b border-gray-700 focus:outline-none"
              />
            ) : (
              <p className="text-lg">{userData.room || 'Not provided'}</p>
            )}
          </div>
          <button onClick={() => handleEditClick('room')} className="text-blue-600">
            {editMode.room ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
      <div className='hidden lg:block'>
      <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default ProfilePage;
