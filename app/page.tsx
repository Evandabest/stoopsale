"use client"
import React from "react";
import { Spotlight } from "@/components/ui/Spotlist";
import { Vortex } from "@/components/ui/vortex";
import { AuroraBackground } from "@/components/aurora-background";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation";

export default async function Index() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  }
  return (
        <div className="flex flex-col items-center justify-center h-full w-screen">       
          <div className="lg:h-[40rem] sm:h-[18rem] sm:max-w-screen-sm max-w-[90%] rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden px-0">
            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20 max-w-[90%]"
              fill="white"
            />
            <div className=" p-4 mx-auto relative z-10 sm:max-w-screen-sm max-w-screen w-screen pt-20 md:pt-0">
              <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                Your trash... <br /> Someone else's treasure.
              </h1>
            </div>
          </div>
          <AuroraBackground className="h-[18rem] w-full sm:max-w-[90%] md:h-[40rem]">
             <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
              <div className="text-3xl md:text-7xl font-bold text-white text-center">
              Trying to clear up your closet?
              </div>
              <button onClick={goToLogin} className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
              Sell Now
              </button>
            </motion.div>
          </AuroraBackground>
          <div className="bg-black max-w-[90%] text-white text-center p-4">
            <p className="text-white text-center text-2xl font-bold mt-8 mb-4">
              Where:
            </p>
            <p className="text-2xl text-white font-bold">Carroll Gardens</p>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11331.578185013102!2d-74.00707938542834!3d40.68021691780987!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a58118fdf65%3A0x1636270596a992dc!2sCarroll%20Gardens%2C%20Brooklyn%2C%20NY!5e0!3m2!1sen!2sus!4v1720746222652!5m2!1sen!2sus"
            width="600"
            height="450"
            className="max-w-[90%] m-auto h-96"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="bg-black text-white text-center max-w-[90%] p-4">
            <p className="text-white text-center text-2xl font-bold mt-8 mb-4">
                When:
              </p>
              <p className="text-2xl font-bold mb-4">Saturday, July 13th</p>
              <Calendar
                mode="single"
                selected={new Date(new Date().getFullYear(), 6, 13)}
                className="rounded-md m-auto border"
              />
          </div>
          <div className="w-[90%] mx-auto h-[30rem] overflow-hidden">
            <Vortex
              backgroundColor="black"
              className="flex flex-col items-center justify-center px-2 md:px-10 py-4 w-full h-full"
            >
              <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
                Got something to sell?<br/> Looking to buy?
              </h2>
              <p className="text-white text-sm md:text-2xl max-w-xl mt-6 w-52 text-center">
                Start selling your trash and finding your next treasure. 
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
                <button onClick={goToLogin} className="px-4 py-2 bg-green-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
                  Get Started
                </button>
              </div>
            </Vortex>
          </div>
        </div>
  );
}