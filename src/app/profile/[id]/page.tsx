"use client";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getUserById } from "@/store/user/user.action";
import ProfileInput from "@/components/profileInput";
import EditIcon from "@mui/icons-material/Edit";
import { getHousesById } from "@/store/house/house.action";
import { User } from "@/store/user/user.slice";
import { House } from "@/store/house/house.slice";
import CardComponent from "@/components/card";
import i18n from "@/i18n";
const ProfilePage: FC = () => {
  const [isEdit, setEdit] = useState(false);
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.users);
  const hotel = useAppSelector((state) => state.houses.house);
  const currentLanguage = i18n.language;
  const [userHotels, setUserHotels] = useState<House[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserById(1));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      user?.hotels.forEach((item) => {
        dispatch(getHousesById(item));
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (hotel[0]) {
      setUserHotels((prev) =>
        prev === undefined ? [hotel[0]] : [...prev, hotel[0]]
      );
    }
  }, [hotel]);

  useEffect(() => {
    console.log(userHotels);
  }, [userHotels]);

  return (
    <div className="relative ">
      <div className="bg-green-white h-32 w-full"></div>
      <div className="bg-white max-w-[1320px] w-[90%] min-h-[80vh]  shadow-[0px_0px_20px_-3px_#636363] flex flex-col sm:flex-row flex-nowrap rounded-3xl absolute  left-1/2 transform -translate-x-1/2 top-1/3 p-4 gap-3">
        <div className="">
          <button
            className="w-10 cursor-pointer"
            onClick={() => setEdit(!isEdit)}
          >
            {/* <Image
              src={edit}
              alt="edit profile button"
              className="absolute left-2 top-2 "
            /> */}
            <EditIcon
              className="text-blue"
              sx={{ width: "30px", height: "30px" }}
            />
          </button>
        </div>
        {isEdit ? (
          <form className="w-full scrollbar-visible p-3  flex-col  bg-white rounded-lg ">
            <ul className="flex flex-col gap-10">
              <li>
                <label htmlFor="ava" className=" overflow-hidden">
                  {/* {watch("ava")?.[0] instanceof File ? (
                    <img
                      alt="ava"
                      src={URL.createObjectURL(watch("ava")[0])}
                      className="w-full h-full object-cover rounded-circle max-w-32 max-h-32 mx-auto"
                    />
                  ) : ( */}
                  {/* <Image
                    src={avatarBasic}
                    alt="avatar image"
                    className="w-24 sm:w-28 md:w-36 rounded-full bg-white p-2"
                  /> */}
                  {/* )} */}

                  <input
                    id="ava"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                </label>
              </li>

              <li className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="font-bold text-green md:text-xl text-lg md:mb-5"
                >
                  {t("first_name")}
                </label>
                <ProfileInput type="text" placeholder="John" />
              </li>
              <li className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="font-bold text-green md:text-xl text-lg md:mb-5"
                >
                  {t("last_name")}
                </label>
                <ProfileInput type="text" placeholder="Doe" />
              </li>
              <li className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-bold text-green md:text-xl text-lg md:mb-5"
                >
                  {t("email")}
                </label>
                <ProfileInput type="email" placeholder="john.doe@example.com" />
              </li>
              <li className="flex flex-col">
                <label
                  htmlFor="username"
                  className="font-bold text-green md:text-xl text-lg md:mb-5"
                >
                  {t("username")}
                </label>
                <ProfileInput type="text" placeholder="john_doe" />
              </li>
              <li className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="font-bold text-green md:text-xl text-lg md:mb-5"
                >
                  {t("phone_number")}
                </label>
                <ProfileInput type="tel" placeholder="+1 (555) 123-4567" />
              </li>
              <li className="flex flex-col">
                <label
                  htmlFor="payment"
                  className="font-bold text-green md:text-xl text-lg md:mb-5"
                >
                  {t("payment_type")}
                </label>
                <ProfileInput
                  type="text"
                  placeholder="Credit card, PayPal, Cash"
                />
              </li>
            </ul>
            <div className="sm:text-18 font-semibold  gap-5 justify-center bottom-9 flex mt-8">
              <button
                type="button"
                className="w-20 h-10 md:w-32 md:h-11 text-green bg-white rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-[#ee685f] hover:text-white active:bg-[#ee685f] active:text-white  transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                className="w-28 h-10 sm:w-32 md:h-11  bg-green-bg rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-[#2a90d9] hover:text-white active:bg-[#2a90d9] active:text-white transition-colors"
              >
                {t("save")}
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
        {isEdit ? (
          ""
        ) : (
          <div className="w-full justify-center items-center">
            {" "}
            <form className=" w-fit scrollbar-visible  flex-col bg-white rounded-lg ">
              <ul className="flex flex-col gap-4">
                {userHotels &&
                  user &&
                  userHotels.map((house) => (
                    <CardComponent
                      currentLanguage={currentLanguage}
                      t={t}
                      house={house}
                      key={house.id}
                      user={user}
                    />
                  ))}
              </ul>

              <div className="sm:text-18 font-semibold  gap-5 justify-center bottom-9 flex mt-8">
                <button
                  type="button"
                  className="w-20 h-10 md:w-32 md:h-11 text-green bg-white rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-[#ee685f] hover:text-white active:bg-[#ee685f] active:text-white  transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="w-28 h-10 sm:w-32 md:h-11  bg-green-bg rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-[#2a90d9] hover:text-white active:bg-[#2a90d9] active:text-white transition-colors"
                >
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
