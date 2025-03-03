"use client";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import image from "../../public/image/main_pic.jpg";
import Image from "next/image";
export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
        <div className="relative">
          <Image
            src={image}
            alt="main pic"
            className="w-full h-[350px] sm:h-[400px] md:h-[450px] rounded-2xl lg:h-[500px] object-cover absolute z-[-10] left-1/2  -translate-x-1/2"
          />
          <div className="ps-16 pt-16 flex flex-col gap-y-3">
            <h1 className="text_black font-semibold lg:text-5xl lg:max-w-[494px]">
              Find an apartment for your vacation
            </h1>
            <p className="max-w-[382px] text-lg">We have several thousand apartments for every taste in every corner of the globe</p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
