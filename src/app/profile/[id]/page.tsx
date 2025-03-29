"use client";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getUserById, updateUser } from "@/store/user/user.action";
import ProfileInput from "@/components/profileInput";
import EditIcon from "@mui/icons-material/Edit";
import { User } from "@/store/user/user.slice";
import CardComponent from "@/components/card";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import i18n from "@/i18n";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { getUserRentedHouses } from "@/store/house/house.action";
import axios from "axios";

interface ProfileFormData {
  name: {
    en: string;
    ru: string;
    kz: string;
    kg: string;
  };
  email: string;
  phone: string;
  payment: string;
}

const ProfilePage: FC = () => {
  const [isEdit, setEdit] = useState(false);
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.users);
  const { userRented } = useAppSelector((state) => state.houses);
  const currentLanguage = i18n.language;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileFormData>({
    name: { en: "", ru: "", kz: "", kg: "" },
    email: "",
    phone: "",
    payment: "",
  });
  const [initialFormData, setInitialFormData] = useState<ProfileFormData>({
    name: { en: "", ru: "", kz: "", kg: "" },
    email: "",
    phone: "",
    payment: "",
  });
  const [formChanged, setFormChanged] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user?.rented && user?.rented_before) {
      dispatch(
        getUserRentedHouses({
          rented: user.rented,
          rentedBef: user.rented_before,
        })
      );
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      const userData = {
        name: {
          en: user.name?.en || "",
          ru: user.name?.ru || "",
          kz: user.name?.kz || "",
          kg: user.name?.kg || "",
        },
        email: user.email || "",
        phone: user.phone || "",
        payment: user.payment?.toString() || "",
      };

      setFormData(userData);
      setInitialFormData(userData);
    }
  }, [user]);

  useEffect(() => {
    const hasChanged =
      JSON.stringify(formData) !== JSON.stringify(initialFormData);
    setFormChanged(hasChanged);

    const isValid =
      formData.name.en.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.phone.trim() !== "";

    setFormValid(isValid);
  }, [formData, initialFormData]);

  const handleNameChange = (lang: string, value: string) => {
    setFormData({
      ...formData,
      name: {
        ...formData.name,
        [lang]: value,
      },
    });
  };

  const handleFieldChange = (
    field: keyof Omit<ProfileFormData, "name">,
    value: string
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formValid || !formChanged) return;

    const id = localStorage.getItem("id");
    if (!id) return;

    setLoading(true);

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        payment: formData.payment ? Number(formData.payment) : undefined,
      };

      dispatch(updateUser({ id, data: updateData }));

      setFormChanged(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData(initialFormData);
    setEdit(false);
  };

  return (
    <div className="relative ">
      <div className="bg-green-white h-32 w-full"></div>
      <div className="bg-white max-w-[1320px] w-[90%] min-h-[80vh]  shadow-[0px_0px_20px_-3px_#636363] flex flex-col sm:flex-row flex-nowrap rounded-3xl absolute  left-1/2 transform -translate-x-1/2 top-1/3 p-4 gap-3">
        <div className="">
          <button className=" cursor-pointer" onClick={() => setEdit(!isEdit)}>
            <EditIcon
              className="text-blue"
              sx={{ width: "30px", height: "30px" }}
            />
          </button>
        </div>
        {isEdit ? (
          <form
            onSubmit={handleSubmit}
            className="w-full scrollbar-visible p-3 flex-col bg-white rounded-lg"
          >
            <ul className="flex flex-col gap-10">
              <li>
                <label htmlFor="ava" className="overflow-hidden">
                  <input
                    id="ava"
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                </label>
              </li>

              {[
                { lang: "en", label: "English Name" },
                { lang: "ru", label: "Russian Name" },
                { lang: "kz", label: "Kazakh Name" },
                { lang: "kg", label: "Kyrgyz Name" },
              ].map(({ lang, label }) => (
                <li key={lang} className="flex flex-col">
                  <label
                    htmlFor={`name_${lang}`}
                    className="font-bold text-green md:text-xl text-lg md:mb-5"
                  >
                    {label}
                  </label>
                  <ProfileInput
                    type="text"
                    id={`name_${lang}`}
                    value={formData.name[lang as keyof typeof formData.name]}
                    placeholder={label}
                    onChange={(e) => handleNameChange(lang, e.target.value)}
                  />
                </li>
              ))}

              {[
                { id: "email", type: "email", label: t("email") },
                { id: "phone", type: "tel", label: t("phone_number") },
                { id: "payment", type: "text", label: t("payment_card") },
              ].map((field) => (
                <li key={field.id} className="flex flex-col">
                  <label
                    htmlFor={field.id}
                    className="font-bold text-green md:text-xl text-lg md:mb-5"
                  >
                    {field.label}
                  </label>
                  <ProfileInput
                    type={field.type}
                    id={field.id}
                    value={
                      formData[field.id as keyof Omit<ProfileFormData, "name">]
                    }
                    placeholder={
                      field.id === "payment"
                        ? "XXXX XXXX XXXX XXXX"
                        : field.label
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        field.id as keyof Omit<ProfileFormData, "name">,
                        e.target.value
                      )
                    }
                  />
                </li>
              ))}
            </ul>

            <div className="sm:text-18 font-semibold gap-5 justify-center bottom-9 flex mt-8">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-20 h-10 md:w-32 md:h-11 text-green cursor-pointer bg-white rounded-lg shadow-[0px_0px_13px_-3px_#636363] hover:bg-[#ee685f] hover:text-white active:bg-[#ee685f] active:text-white transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                type="submit"
                disabled={!formValid || !formChanged || loading}
                className={`w-28 h-10 sm:w-32 md:h-11 cursor-pointer rounded-lg shadow-[0px_0px_13px_-3px_#636363] transition-colors ${
                  !formValid || !formChanged || loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-bg hover:bg-[#2a90d9] hover:text-white active:bg-[#2a90d9] active:text-white"
                }`}
              >
                {loading ? t("saving") : t("save")}
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
        {isEdit
          ? ""
          : user && (
              <div className="w-full flex flex-col justify-center items-start">
                <div className="flex-row flex gap-2 items-center mb-3 justify-center w-full">
                  <h3>
                    {user.name![currentLanguage as keyof typeof user.name]}
                  </h3>
                </div>

                {userRented.rentedBef.length > 0 && (
                  <div className="w-[]">
                    <ul className="flex flex-row flex-wrap gap-4 overflow-y-scroll">
                      {(userRented.rented.length > 0 ||
                        userRented.rentedBef.length > 0) && (
                        <div className="flex flex-col gap-6">
                          {userRented.rented.length > 0 && (
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
                                  <SwiperSlide
                                    key={house.id}
                                    className="!w-auto"
                                  >
                                    <CardComponent
                                      house={house}
                                      currentLanguage={currentLanguage}
                                      t={t}
                                      user={user}
                                    />
                                  </SwiperSlide>
                                ))}

                                <div className="swiper-button-next max-w-10 !w-fit max-h-10  bg-white rounded-full custom-next-button before:content-none after:!content-none  right-1">
                                  <ArrowCircleRightOutlinedIcon
                                    color="primary"
                                    className="!w-full"
                                  />
                                </div>
                                <div className="swiper-button-prev  max-w-10 !w-fit max-h-10  bg-white rounded-full custom-prev-button before:content-none after:!content-none  left-1">
                                  <ArrowCircleRightOutlinedIcon
                                    color="primary"
                                    className="rotate-180 !w-12"
                                  />
                                </div>
                              </Swiper>
                            </div>
                          )}

                          {userRented.rentedBef.length > 0 && (
                            <div>
                              <h4 className="text-xl font-bold mb-4 capitalize">
                                {t("previous_rented")}
                              </h4>
                              <Swiper
                                slidesPerView="auto"
                                spaceBetween={14}
                                navigation={{
                                  nextEl: ".swiper-button-nextt",
                                  prevEl: ".swiper-button-previous",
                                }}
                                modules={[Navigation]}
                                className="mt-[26px]"
                              >
                                {userRented.rentedBef.map((house) => (
                                  <SwiperSlide
                                    key={house.id}
                                    className="!w-auto"
                                  >
                                    <CardComponent
                                      house={house}
                                      currentLanguage={currentLanguage}
                                      t={t}
                                      user={user}
                                    />
                                  </SwiperSlide>
                                ))}

                                <div className="swiper-button-nextt  max-w-15 !w-fit max-h-12  bg-white rounded-full custom-next-button before:content-none after:!content-none  right-1">
                                  <ArrowCircleRightOutlinedIcon
                                    className="!w-12"
                                    color="primary"
                                  />
                                </div>
                                <div className="swiper-button-previous  max-w-15 !w-fit max-h-12  bg-white rounded-full custom-prev-button before:content-none after:!content-none  left-1">
                                  <ArrowCircleRightOutlinedIcon
                                    className="rotate-180 !w-12"
                                    color="primary"
                                  />
                                </div>
                              </Swiper>
                            </div>
                          )}
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
      </div>
    </div>
  );
};

export default ProfilePage;
