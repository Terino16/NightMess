"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

const hostelOptions = ["R Block", "Q Block", "L Block", "K Block"];

function Page({}: Props) {
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus == "unauthenticated") router.push("/sigin");
    if(session?.user?.profile==true) router.push("/");
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const hostel = e.target.hostel.value;
    const room = e.target.room.value;
    const email = session?.user?.email;
    console.log(email, name, phone, hostel, room);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          phone,
          hostel,
          room,
        }),
      });
      if (res.status === 200) {
        toast({
          title: "Success",
          description: "Successfully registered",
        });
        // router.push("/home");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
      console.log(error);
    }
    };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="w-screen ">
      <form className="lg:my-16 space-y-6 mt-12  mx-[20%]" onSubmit={handleSubmit}>
        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="text"
              required
              className="appearance-none block w-full bg-transparent text-white border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
            Phone number
          </label>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="text"
              autoComplete="text"
              required
              className="appearance-none block w-full bg-transparent text-white border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
            Hostel Name
          </label>
          <div className="mt-2">
            <select
              id="hostel"
              name="hostel"
              required
              className="appearance-none block w-full bg-transparent text-white border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            >
              <option value="" disabled selected>
                Select your hostel
              </option>
              {hostelOptions.map((hostel) => (
                <option key={hostel} value={hostel}>
                  {hostel}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full">
          <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
            Room Number
          </label>
          <div className="mt-2">
            <input
              id="room"
              name="room"
              type="number"
              autoComplete="text"
              required
              className="appearance-none block w-full bg-transparent text-white border border-white rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
      <svg
        className="absolute bottom-0"
        viewBox="0 0 1425 205.55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M0,17.27l23.75,5.09C47.5,27.38,95,37.57,142.5,39.47s95-4.36,142.5-10.28,95-11.35,142.5-7.4,95,17.43,142.5,24,95,6.25,142.5,5.83,95-.9,142.5-3S950,43,997.5,42.92s95,3.12,142.5,2.88,95-4.11,142.5-3.62,95,5.51,118.75,8L1425,52.62v170.2H0Z"
            fill="#fffff"
          ></path>
          <path
            d="M0,94.56l23.75-6.17C47.5,82.22,95,69.89,142.5,65.2s95-1.64,142.5,4.85S380,86.33,427.5,86.5,522.5,77,570,73.59s95-.66,142.5,1.81,95,4.6,142.5,3.78,95-4.6,142.5-6.58,95-1.89,142.5,1.24,95,9.45,142.5,13.15,95,4.85,118.75,5.35l23.75.57V222.82H0Z"
            fill="#6FD1FF"
          ></path>
          <path
            d="M0,134,23.75,132C47.5,129.91,95,125.8,142.5,125.39s95,2.88,142.5,5.75,95,5.35,142.5,4,95-6.58,142.5-8.06,95,.66,142.5-.41,95-5.51,142.5-9.21,95-6.66,142.5-5.83,95,5.42,142.5,9.86,95,8.47,142.5,9.05,95-2.47,118.75-4L1425,125v97.84H0Z"
            fill="#027CFF"
          ></path>
          <path
            d="M0,178.42l23.75-1.64c23.75-1.65,71.25-4.94,118.75-5.59s95,1.23,142.5,2.71,95,2.63,142.5,4.11,95,3.45,142.5,2.88,95-3.54,142.5-8.8,95-12.58,142.5-13.57,95,4.53,142.5,8.23,95,5.67,142.5,4,95-6.91,142.5-9.79,95-3.37,118.75-3.7L1425,157v65.78H0Z"
            fill="#27272a"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="1425" height="444" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default Page;
