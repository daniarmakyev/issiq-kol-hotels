"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import {
  Button,
  CircularProgress,
  Modal,
  ModalClose,
  Sheet,
  Typography,
} from "@mui/joy";
import {
  getOwnerById,
  getUserById,
  updateUser,
} from "@/store/user/user.action";

const Page = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id } = params;
  const [open, setOpen] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const houseArray = useAppSelector((state) => state.houses.house);
  const owner = useAppSelector((state) => state.users.owner);
  const user = useAppSelector((state) => state.users.user);
  let yourDate = new Date();
  let y = yourDate.getFullYear();
  let m = String(yourDate.getMonth() + 1).padStart(2, "0");
  let d = String(yourDate.getDate()).padStart(2, "0");
  const today = `${y}-${m}-${d}`;

  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const house = houseArray?.[0];

  useEffect(() => {
    if (id) {
      dispatch(getHousesById(id + ""));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const idUser = localStorage.getItem("id");
    if (house?.owner) {
      dispatch(getUserById(idUser + ""));
      dispatch(getOwnerById(house.owner));
    }
  }, [dispatch, house?.owner]);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "start" | "end",
    price: number
  ) => {
    const newDate = e.currentTarget.value;

    if (type === "start") {
      setStartDate(newDate);
      setEndDate("");
      setTotalPrice(0);
    } else {
      setEndDate(newDate);
    }

    if (type === "end" && startDate) {
      const start = new Date(startDate);
      const end = new Date(newDate);
      const diff = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diff > 0) {
        setTotalPrice(diff * price);
      } else {
        setTotalPrice(0);
      }
    }
  };

  function rentFunc(houseid: string | number, userId:string|number) {
    dispatch(
      updateUser({
        id: userId,
        data: { rented: [String(houseid)] },
      })
    );
  }

  return owner && house ? (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 text-gray-800">
      <div className="mb-8 border-b pb-4 flex flex-col gap-4 ">
        <Modal
          aria-labelledby="create-house-modal"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
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
              {user ? (
                <div>
                  <h3 className="mx-auto w-fit mb-2">Оплата</h3>
                  <form className="flex flex-col max-w-fit mx-auto px-4 py-2 items-center justify-center gap-y-1 border-1 border-zinc-600 rounded-lg">
                    <div className="flex gap-2">
                      <h5>От</h5>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                          handleDateChange(e, "start", house.price)
                        }
                        min={today}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <h5>До</h5>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                          handleDateChange(e, "end", house.price)
                        }
                        min={startDate}
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <h5>Сумма:</h5>
                      <span>{totalPrice} KGS</span>
                    </div>
                    <div className="flex gap-1">
                      <h4>Ваша карта: </h4>
                      <span>{user.payment}</span>
                    </div>
                    <button className="border-1 border-zinc-600 px-2 py-1 rounded-lg mt-3">
                      Оплатить
                    </button>
                  </form>
                </div>
              ) : (
                "Unexpected error"
              )}
            </Typography>
          </Sheet>
        </Modal>
        <div className="flex items-center gap-2 justify-between w-full">
          <h1 className="text-3xl md:text-4xl font-bold capitalize">
            {house.name?.[lang as keyof typeof house.name]}
          </h1>
          {house.id && user && user?.type === "user" ? (
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => {
                setOpen(true);
                rentFunc(house.id + "", user.id+'');
              }}
            >
              {t("rent")}
            </Button>
          ) : (
            ""
          )}
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
          {owner?.name?.[lang as keyof typeof owner.name] || owner?.name?.en}
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
            {owner?.name?.[lang as keyof typeof owner.name] || owner?.name?.en}
          </p>
          <p className="text-lg">
            <span className="font-semibold capitalize">{t("phone")}:</span>{" "}
            {owner && owner.phone}
          </p>
          <p className="text-lg break-words">
            <span className="font-semibold capitalize">{t("email")}:</span>{" "}
            {owner && owner.email}
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
