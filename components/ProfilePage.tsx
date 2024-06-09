"use client";

import { useState } from 'react';
import UpdateUserForm from '@/components/UpdateUserForm';


interface User {
    id: string;
    email: string;
    password: string;
    name: string | null;
    hostel: string | null;
    room: number | null;
    phone: string | null;
    seller: boolean | null;
  }
  
import { updateUser } from '@/lib/updateUser';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Props {
  user: User;
}

const ProfilePage: React.FC<Props> = ({ user }) => {
  const { data: session }: any = useSession();
  if(session==null)
  redirect("/");

  const [userData, setUserData] = useState(user);

  const handleUpdate = async (updatedUser: Partial<User>) => {
    const updatedUserData = await updateUser(userData.id, updatedUser);
    setUserData(updatedUserData);
  };

  return (
    <div className=' p-4 md:mx-10 font-sedan  md:p-8 rounded-md'>
      <h1 className='text-xl md:text-5xl  font-bold'>Profile Page</h1>
      <p className=' text-lg md:text-2xl '>{userData.email}</p>
     

     <div className='my-2  space-y-2 md:m-10 md:space-y-4 '>
        <UpdateUserForm user={userData} onUpdate={handleUpdate} />
     </div>
      
    </div>
  );
};

export default ProfilePage;
