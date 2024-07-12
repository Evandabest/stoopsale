"use client";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input1";
import { cn } from "@/utils/cn";
import { signUp, signIn } from "./actions";
import { useState } from "react";


export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const handlesignUp = async (e: any) => {
    
    await signUp({email, password});
  };

  const handlesignIn = async (e: any) => {
    await signIn({email, password});
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
    <img src="https://csabmhnamijitrwiiaga.supabase.co/storage/v1/object/public/posts/Screenshot_2024_07_11_at_11.33.42_PM.png?t=2024-07-12T03%3A38%3A06.326Z" alt="logo" className="h-24 w-24 mt-4" />
    <div className=" max-w-md mt-32 shadow-md shadow-black w-80 rounded-none md:rounded-2xl p-4 md:p-8 bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
        Welcome to Stoop Sale Snipers
      </h2>
      <p className="text-neutral-600 text-center text-sm max-w-sm my-8 dark:text-neutral-300">
        Login to view the marketplace and post your own items for sale.
      </p>

      <form className="my-4">
        
        <LabelInputContainer className="my-8">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" value={email} onChange={handleEmail} placeholder="myemailaddress.com" type="email" required/>
        </LabelInputContainer>
        <LabelInputContainer className="my-8">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={handlePassword} placeholder="••••••••" type="password" required/>
        </LabelInputContainer>
        <div className="flex items-center justify-between my-8 space-x-2">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            onClick={handlesignUp}
          >
            Sign up
            <BottomGradient />
          </button>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            formAction={handlesignIn}
          >
            Sign in
            <BottomGradient />
          </button>
        </div>


      </form>
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};