"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { useToast } from "@/components/ui/use-toast";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/register");
    }
  }, [sessionStatus, router]);


  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <button
              type="submit"
              className="flex w-full border border-black justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => signIn("google",{callbackUrl: "/register"})}
            >
              ❤️ Sign up with Google
            </button>

            <p className="text-red-600 text-center text-[16px] my-4">
              {error && error}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default RegisterPage;
