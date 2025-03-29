"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import CardComponent from "@/components/card";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { getFav, getHousesById } from "@/store/house/house.action";
import { getUserById } from "@/store/user/user.action";
import { House } from "@/store/house/house.slice";

const Page = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
  const [mounted, setMounted] = useState(false);
  const { user } = useAppSelector((state) => state.users);
  const { favorites } = useAppSelector((state) => state.houses);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id.toString()));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (user && user.favorites) {
      dispatch(getFav(user?.favorites));
    }
  }, [user]);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="max-w-full mt-6">
        <h4 className="text-xl font-bold mb-0 capitalize">
          {t("your_favorites")}
        </h4>
        {favorites && favorites.length > 0 ? (
          <Swiper
            slidesPerView="auto"
            spaceBetween={14}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            className="mt-[16px] w-auto"
          >
            {favorites.map((house) => (
              <SwiperSlide key={house.id} className="!w-auto">
                <CardComponent
                  house={house}
                  currentLanguage={currentLanguage}
                  t={t}
                  user={user}
                />
              </SwiperSlide>
            ))}

            <div className="swiper-button-next max-w-10 !w-fit max-h-10 bg-white rounded-full custom-next-button before:content-none after:!content-none right-1">
              <ArrowCircleRightOutlinedIcon
                color="primary"
                className="!w-full"
              />
            </div>
            <div className="swiper-button-prev max-w-10 !w-fit max-h-10 bg-white rounded-full custom-prev-button before:content-none after:!content-none left-1">
              <ArrowCircleRightOutlinedIcon
                color="primary"
                className="rotate-180 !w-12"
              />
            </div>
          </Swiper>
        ) : (
          <p className="text-gray-500"></p>
        )}
      </div>
    </div>
  );
};

export default Page;
