"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import mainPic from "../../public/image/main_pic.jpg";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getSpecialHouses } from "@/store/house/house.action";
import HotOfferCards from "@/components/hotOffer";
import { CircularProgress } from "@mui/material";

const HomePage = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const special = useAppSelector((state) => state.houses.special);

  useEffect(() => {
    dispatch(getSpecialHouses());

    setMounted(true);
  }, [dispatch]);

  if (!mounted) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-white z-[-2] pb-5">
      <div className="container-main md:px-2.5 p-0">
        <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <Image
            src={mainPic}
            alt="main pic"
            priority={true}
            className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-w[500px] md:rounded-2xl object-cover absolute z-[1] left-1/2 -translate-x-1/2"
          />
          <div className="sm:ps-14 ps-5 md:ps-16 sm:pt-14 pt-12 md:pt-16 flex flex-col gap-y-3">
            <h1 className="font-semibold lg:text-5xl lg:max-w-[494px] md:text-4xl text-3xl text-white z-[2] text-shadow-lg">
              {t("main_title")}
            </h1>
            <p className="max-w-[382px] text-lg text-white z-[2] text-shadow-lg">
              {t("main_desc")}
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5 flex flex-col items-center justify-center">
        <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold">
          {t("best_offers")}
        </h2>
        <HotOfferCards special={special} />
      </div>
    </div>
  );
};

export default HomePage;
