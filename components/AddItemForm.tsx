"use client"
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Toast } from './ui/toast';
import { toast } from './ui/use-toast';


const AddItemForm = () => {
    const { data: session } = useSession();
    const email = session?.user?.email;
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/additems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name, photo, quantity, price, email}),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                toast({title:"Item Added Succesfully"});
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md  p-8 rounded-lg shadow-lg">
            <div className="mb-4">
                <label htmlFor="name" className="block font-bold mb-2">Item Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="photo" className="block  font-bold mb-2">Photo URL:</label>
                <input
                    type="text"
                    id="photo"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block  font-bold mb-2">Quantity:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block  font-bold mb-2">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                />
            </div>
            <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700">
                Add Item
            </button>
        </form>
    );
};

export default AddItemForm;