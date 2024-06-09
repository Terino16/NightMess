"use client";

import { useState } from 'react';
import { toast } from './ui/use-toast';

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

interface Props {
  user: User;
  onUpdate: (updatedUser: Partial<User>) => void;
}

const UpdateUserForm: React.FC<Props> = ({ user, onUpdate }) => {
  const [hostel, setHostel] = useState(user.hostel ?? '');
  const [phone, setPhone] = useState(user.phone ?? '');
  const [room, setRoom] = useState(user.room ?? 0);
  const [seller, setSeller] = useState(user.seller ?? false);
  const  email=user.email;
  const [name,setName]=useState(user.name ?? "");
  const [change, setChange]=useState(true);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = `Seller=${seller.toString()}`;
    seller==true && toast({
      title:"User is Seller ",
      description:"Please refresh and Login again to See Dashbaord"
    })
    seller==false && toast({
      title:"Lost Seller Access ",
      description:"Will lose dashboard access "
    })
    onUpdate({ hostel, phone, room, seller,email,name });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 text-lg font-sedan'>
       <div >
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={change}
            className="bg-transparent px-4 mx-4 border-white border rounded-lg py-2"
          />
        </label>
      </div>
      <div >
        <label>
          Hostel:
          <input
            type="text"
            value={hostel}
            onChange={(e) => setHostel(e.target.value)}
            disabled={change}
            className="bg-transparent px-4 mx-4 border-white border rounded-lg py-2"
          />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={change}
            className="bg-transparent px-4 mx-4 border-white border rounded-lg py-2"
          />
        </label>
      </div>
      <div>
        <label>
          Room:
          <input
            type="number"
            value={room}
            onChange={(e) => setRoom(parseInt(e.target.value))}
            disabled={change}
            className="bg-transparent px-4 mx-4 border-white border rounded-lg py-2"
          />
        </label>
      </div>
      <div>
        <label className='flex items-center'>
          Seller:
          <input
            type="checkbox"
            checked={seller}
            onChange={(e) => setSeller(e.target.checked)}
            disabled={change}
            className="bg-transparent h-5 w-5  px-4 mx-4 border-white border rounded-lg py-2"
          />
        </label>
      </div>
      <button  type="button" onClick={()=>{setChange(!change)}} className='bg-red-500 p-3 rounded-lg mx-4'>Update</button>
      <button type="submit" className='bg-red-500 p-3 rounded-lg'>Update Data</button>
    </form>
  );
};

export default UpdateUserForm;
