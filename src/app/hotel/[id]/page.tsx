"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getHousesById } from "@/store/house/house.action";
import Image from "next/image";
import { CircularProgress } from "@mui/joy";
import { getUserById } from "@/store/user/user.action";

const Page = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;

  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const houseArray = useAppSelector((state) => state.houses.house);
  const user = useAppSelector((state) => state.users.user);

  const house = houseArray?.[0];

  useEffect(() => {
    if (id) {
      dispatch(getHousesById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (house?.owner) {
      dispatch(getUserById(house.owner));
    }
  }, [dispatch, house?.owner]);

  useEffect(() => {
    if (user && user.name) {
      console.log(user.name.kg);
    }
  }, [user]);

  return user && house ? (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 text-gray-800">
      <div className="mb-8 border-b pb-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl md:text-4xl font-bold capitalize">
            {house.name?.[lang as keyof typeof house.name]}
          <button></button>
          </h1>
        </div>
        <div className="flex items-center flex-wrap gap-2 text-lg">
          <div className="flex items-center flex-wrap gap-2">
            <LocationOnOutlinedIcon />
            <span className="font-semibold capitalize">{t("location")}:</span>
          </div>
          {house.location?.[lang as keyof typeof house.location]}
        </div>
        <div className="flex items-center flex-wrap gap-2 text-lg">
          <BedOutlinedIcon />
          <span className="font-semibold capitalize">{t("details")}:</span>
          <div>
            {house.beds} {t("beds")}, {house.rooms} {t("rooms")},{" "}
            {house.bathrooms} {t("bathrooms")}, {house.square} m²
          </div>
        </div>
        <div className="flex items-center gap-2 text-lg">
          <LocalOfferOutlinedIcon />
          <span className="font-semibold capitalize">{t("price")}:</span>{" "}
          {house.price} {house.currency}
        </div>
        <div className="flex items-center gap-2 text-lg">
          <StarBorderOutlinedIcon />
          <span className="font-semibold capitalize">{t("rating")}:</span>{" "}
          {house.rating}
        </div>
        <div className="flex items-center gap-2 text-lg">
          <AccountCircleOutlinedIcon />
          <span className="font-semibold capitalize">{t("owner")}:</span>{" "}
          {user?.name?.[lang as keyof typeof user.name] || user?.name?.en}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 capitalize">
          {t("gallery")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3 gap-y-3">
          <div className="col-span-1 flex flex-col ">
            <Image
              width={500}
              height={250}
              priority
              src={house.images[0]}
              alt={`house image 1`}
              className="w-full h-full object-cover rounded shadow-md"
            />
          </div>

          <div className="col-span-2 md:w-1/3 grid grid-rows-2 gap-4">
            {house.images.slice(1, 3).map((img: string, index: number) => (
              <div key={index} className="flex justify-center">
                <Image
                  width={500}
                  height={250}
                  priority
                  src={img}
                  alt={`house image ${index + 2}`}
                  className="w-full h-full object-cover rounded shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 capitalize">
          {t("description")}
        </h2>
        <p className="text-lg leading-relaxed">
          {house.description?.[lang as keyof typeof house.description]}
        </p>
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 capitalize">
            {t("amenities")}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {house.amenities?.[lang as keyof typeof house.amenities].map(
              (amenity: string, index: number) => (
                <li key={index} className="text-lg">
                  {amenity}
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 capitalize">
            {t("services")}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {house.services?.[lang as keyof typeof house.services].map(
              (service: string, index: number) => (
                <li key={index} className="text-lg">
                  {service}
                </li>
              )
            )}
          </ul>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl md:text-2xl font-bold mb-2 capitalize">
            {t("availability")}
          </h2>
          <h3 className="text-md md:text-lg font-bold mb-2 capitalize">
            График:
          </h3>
          <div className="flex items-center gap-2 text-lg">
            <CalendarTodayOutlinedIcon />
            <span className="font-semibold capitalize">
              {t("check-in")}:
            </span>{" "}
            {house.availability.check_in}
          </div>
          <div className="flex items-center gap-2 text-lg">
            <CalendarTodayOutlinedIcon />
            <span className="font-semibold capitalize">
              {t("check-out")}:
            </span>{" "}
            {house.availability.check_out}
          </div>
          <p className="text-lg">
            <span className="font-semibold capitalize">
              {t("rooms available")}:
            </span>{" "}
            {house.availability.available_count} {t("of")}{" "}
            {house.availability.total_count}
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl md:text-2xl font-bold mb-2 capitalize">
            {t("policies")}
          </h2>
          <p className="text-lg">
            {
              house.policies.cancellation?.[
                lang as keyof typeof house.policies.cancellation
              ]
            }
          </p>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl md:text-2xl font-bold mb-2 capitalize">
            {t("contact")}
          </h2>
          <p className="text-lg">
            <span className="font-semibold capitalize">{t("phone")}:</span>{" "}
            {house.contact.phone}
          </p>
          <p className="text-lg">
            <span className="font-semibold capitalize">{t("email")}:</span>{" "}
            {house.contact.email}
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-xl md:text-2xl font-bold mb-2 capitalize">
            {t("owner")}
          </h2>
          <p className="text-lg">
            <span className="font-semibold capitalize">{t("name")}:</span>{" "}
            {user?.name?.[lang as keyof typeof user.name] || user?.name?.en}
          </p>
          <p className="text-lg">
            <span className="font-semibold capitalize">{t("phone")}:</span>{" "}
            {user && user.phone}
          </p>
          <p className="text-lg break-words">
            <span className="font-semibold capitalize">{t("email")}:</span>{" "}
            {user && user.email}
          </p>
        </div>
      </section>
    </div>
  ) : (
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
};

export default Page;
