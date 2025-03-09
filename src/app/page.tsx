"use client";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import image from "../../public/image/main_pic.jpg";
import Image from "next/image";
import HotOfferCards from "@/components/hotOffer";
import { CircularProgress } from "@mui/material";
export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center mt-[23%]">
          <CircularProgress size="3rem" />
        </div>
      }
    >
      <div className="bg-white z-[-2] pb-5">
        <div className="container-main md:px-2.5 p-0">
          <div className="relative  h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
            <Image
              src={image}
              alt="main pic"
              className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] md:rounded-2xl  object-cover absolute z-[1] left-1/2  -translate-x-1/2"
            />
            <div className="sm:ps-14 ps-5 md:ps-16 sm:pt-14 pt-12 md:pt-16 flex flex-col gap-y-3">
              <h1 className="font-semibold lg:text-5xl lg:max-w-[494px] md:text-4xl text-3xl text-white z-[2] text-shadow-lg">
                Find an apartment for your vacation
              </h1>
              <p className="max-w-[382px] text-lg text-white z-[2] text-shadow-lg">
                We have several thousand apartments for every taste in every
                corner of the globe
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 flex flex-col items-center justify-center">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold">
          Best offers
        </h2>
        <HotOfferCards />
      </div>
    </Suspense>
  );
}
