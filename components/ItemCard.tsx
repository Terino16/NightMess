/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from 'react';
import { toast } from './ui/use-toast';

type ItemProps = {
  id: string;
  name: string;
  photo: string;
  quantity: number | null;
  price: number;
  sellerId: string;
};

const ItemCard: React.FC<ItemProps> = ({ id, name, photo, quantity, price, sellerId }) => {
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const handleIncrease = () => {
    setCurrentQuantity((prevQuantity) => (prevQuantity !== null ? prevQuantity + 1 : 1));
  };

  const handleDecrease = () => {
    setCurrentQuantity((prevQuantity) => (prevQuantity && prevQuantity > 0 ? prevQuantity - 1 : 0));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: currentQuantity,itemid:id }),
      });

      const data = await response.json();
      toast({title:data.message})
      
    } catch (error:any) {
      console.error('Error updating quantity:', error);
      toast({title:error.message})
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemid:id }),
      });

      const data = await response.json();
      toast({title:data.message})
      
    } catch (error:any) {
      console.error('Error updating quantity:', error);
      toast({title:error.message})
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-purple-100">
      <img className="w-full h-48 object-contain" src={photo} alt="Item Photo" />
      <div className="px-6 py-4">
        <div className="font-bold text-black text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">Quantity: {currentQuantity}</p>
        <p className="text-gray-700 text-base">Price: Rs{price}</p>
        <p className="text-gray-700 text-base">Seller ID: {sellerId}</p>
      </div>
      <div className="flex items-center justify-around">
        <button className="px-4 py-2 bg-green-400 border font-bold text-white grow" onClick={handleIncrease}>+</button>
        <button className="px-4 py-2 bg-red-400 border font-bold text-white grow" onClick={handleDecrease}>-</button>
        <button className="px-4 py-2 bg-blue-400 border font-bold text-white grow" onClick={handleUpdate}>Update</button>
        <button className="px-4 py-2 bg-black border font-bold text-white grow" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ItemCard;
