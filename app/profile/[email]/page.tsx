import prisma from '@/lib/prisma';
import React from 'react';
import ProfilePage from "../../../components/ProfilePage"




export async function getUserByEmail(email: string) {
  console.log(email);
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  return user;
}

const Page = async ({ params }:string) => {
  const decodedEmail = decodeURIComponent(params.email);
  console.log(decodedEmail);

  const user = await getUserByEmail(decodedEmail);
  console.log(user);

  return (
    <div className="lg:px-20 lg:py-8 p-4 mb-[200px]">
        <h1 className='text-xl lg:text-5xl font-bold'>My Account</h1>
        <div className='w-full '>
      {user ? (
        <ProfilePage user={user}/>
      ) : (
        <div className="text-center">
          <p>Profile not found</p>
        </div>
        
      )}
       </div>
    </div>
  );
};

export default Page;
