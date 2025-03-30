"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { createHouse, getCreated } from "@/store/house/house.action";
import { getUserById } from "@/store/user/user.action";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import CardComponent from "@/components/card";
import { useTranslation } from "react-i18next";
import HouseForm from "@/components/houseComp";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { House } from "@/helpers/types";

export default function Page() {
  const [mounted, setMounted] = useState<boolean>(false);
  const params = useParams();
  const id = params.id as string;
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { created } = useAppSelector((state) => state.houses);
  const user = useAppSelector((state) => state.users.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getCreated(user.id));
    }
  }, [dispatch, user]);

  const handleCreateHouse = (house: House): void => {
    dispatch(createHouse(house));
    setOpen(false);
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container">
      <Modal
        aria-labelledby="create-house-modal"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: "90%",
            maxWidth: 800,
            borderRadius: "md",
            p: 3,
            maxHeight: "90vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ModalClose variant="outlined" />
          <Typography
            component="h2"
            id="create-house-modal"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: "lg", mb: 2 }}
          >
            Add house
          </Typography>
          {
            //@ts-ignore

            <HouseForm
              onSubmit={handleCreateHouse}
              onClose={() => setOpen(false)}
            />
          }
        </Sheet>
      </Modal>

      <div className="max-w-[80vw] mt-8">
        <div className="flex items-center gap-4 h-fit">
          <h4 className="text-xl font-bold  capitalize">
            {t("Your created houses")}
          </h4>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            Create
          </Button>
        </div>

        {created && created.length > 0 ? (
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
            {created.map((house) => (
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
          <p className="text-gray-500">{t("no_created_houses")}</p>
        )}
      </div>
    </div>
  );
}
