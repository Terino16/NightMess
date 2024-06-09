
import ItemCard from '@/components/UserComponents/ItemCard';
import prisma from '@/lib/prisma'
import React from 'react'

const Page = async () => {

  const items=await prisma.item.findMany();
  console.log(items,"items");
  if(!items)
    {
      return(<p>No items to Display</p>)
    }
 
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row'>
      {items.map((item)=>{
        return(
          <ItemCard key={item.id}
          id={item.id}
          name={item.name}
          photo={item.photo}
          price={item.price}
          sellerId={item.sellerId}/>
        )
      })

      }

    </div>
  )
}

export default Page