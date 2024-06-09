import AddItemForm from '@/components/AddItemForm';
import ItemCard from '@/components/ItemCard';
import { getselleritems } from '@/lib/getselleritems';
import { Item } from '@prisma/client';
import React from 'react'

interface Params {
  params: {
    email: string;
  };
}

const fetchSelleritems = (email: string): Promise<Item[]|null> => {
  return getselleritems(email);
};

export default async function Page({ params }: Params) {
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);
  const items=await fetchSelleritems(decodedEmail);
  console.log(items);
  return (
    <div className='bg-[#070F2B] text-[#9290C3] p-8 lg:mx-10'>
      <h1 className='text-5xl font-sedan'>Seller Dashboard</h1>
      <p>{decodedEmail}</p>

      <AddItemForm />
      <div className='py-8'>
      <h1 className='text-5xl font-sedan'>Seller Itinerary</h1>
      <div className='p-4 grid grid-cols-3 '>
     
        {items?.map((item)=>{return( <ItemCard
          key={item.id}
          id={item.id}
          name={item.name}
          photo={item.photo}
          quantity={item.quantity}
          price={item.price}
          sellerId={item.sellerId}
        />)})}
      </div>
      </div>
    </div>
  )
}





