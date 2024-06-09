
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


export  async function DELETE(req: NextRequest) {
    try {
    const body =  await req.json();
      const { itemid } =body;
      const item = await prisma.item.delete({
        where: { id:itemid },
      });
      if(!item)
        return NextResponse.json({message:"item not found in inventory"})
      return NextResponse.json({ message: 'Item deleted'});
    } catch (error) {
      console.error('Error deleting item:', error);
      return NextResponse.json({ message: 'Internal server error' });
    }
 
}

export async function POST(req: NextRequest) {
    try {
    
      const body =  await req.json();
      const {quantity,itemid}=body;
      console.log(quantity,itemid)
      if(itemid==null)
        return NextResponse.json({message:"Unable to find item in DB"})

      const parsedQuantity = parseFloat(quantity);
      if (isNaN(parsedQuantity)) {
        return NextResponse.json(
          { message: "Quantity must be a valid number" },
          { status: 400 }
        );
      }
  
      const item = await prisma.item.update({
        where: { id: itemid },
        data: { quantity:parsedQuantity},
      });

      if(!item)
        return NextResponse.json({message:"Unable to locate item"});
      
      return NextResponse.json({ message: 'Item updated'});
    } catch (error) {
      console.error('Error updating item:', error);
     return  NextResponse.json({ message: 'Internal server error' });
    }
  }