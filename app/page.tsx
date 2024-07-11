"use client"
import React from "react";
import { Spotlight } from "@/components/ui/Spotlist";
import { useEffect } from "react";
import { Vortex } from "@/components/ui/vortex";

export default async function Index() {

  return (
    <>
      <div className="h-72 w-full flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Your trash... <br /> Someone else's treasure.
          </h1>
        </div>
      </div>
      <div className="w-full mx-auto h-[30rem] overflow-hidden">
        <Vortex
          backgroundColor="black"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Got something to sell?<br/> Looking to buy?
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 w-52 text-center">
            Sign up now and start selling your trash and finding your next treasure.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <button className="px-4 py-2 bg-green-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
              Get Started
            </button>
          </div>
        </Vortex>
      </div>
    </>
  );
}
