"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/helpers/hooks";
import CardComponent from "@/components/card";
import { useState } from "react";
const Page = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
    const [mounted, setMounted] = useState(false);

  const { t, i18n } = useTranslation();
  return (
    <div className="container">
      <h1>Your favorite</h1>

      <div className="max-w-[80vw]">
        <h4 className="text-xl font-bold mb-4 up capitalize">
          {t("current_rented")}
        </h4>
        <Swiper
          slidesPerView="auto"
          spaceBetween={14}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev ",
          }}
          modules={[Navigation]}
          className="mt-[26px] w-auto"
        >
          {userRented.rented.map((house) => (
            <SwiperSlide key={house.id} className="!w-auto">
              <CardComponent
                house={house}
                currentLanguage={currentLanguage}
                t={t}
                user={user}
              />
            </SwiperSlide>
          ))}

          <div className="swiper-button-next max-w-10 !w-fit max-h-10  bg-white rounded-full custom-next-button before:content-none after:!content-none  right-1">
            <ArrowCircleRightOutlinedIcon color="primary" className="!w-full" />
          </div>
          <div className="swiper-button-prev  max-w-10 !w-fit max-h-10  bg-white rounded-full custom-prev-button before:content-none after:!content-none  left-1">
            <ArrowCircleRightOutlinedIcon
              color="primary"
              className="rotate-180 !w-12"
            />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default Page;
