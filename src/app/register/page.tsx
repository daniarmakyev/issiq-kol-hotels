"use client";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { register } from "@/store/user/user.action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import { CircularProgress } from "@mui/material";
import { User } from "@/helpers/types";
const Page = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const [isType, setType] = useState(false);
  type State = {
    data: User | null;
    error: string | null;
  };

  const [state, submitAction] = useActionState(authFn, {
    data: null,
    error: null,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function authFn(prevState: State, formData: FormData): Promise<State> {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const passwordConfirm = formData.get("password-confirm")?.toString();
    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();

    if (!email || !password || !passwordConfirm || !name || !phone) {
      return { ...prevState, error: t("error_fill_fields") };
    }

    if (password.length < 6) {
      return { ...prevState, error: t("error_password_length") };
    }

    if (password !== passwordConfirm) {
      return { ...prevState, error: t("error_password_mismatch") };
    }

    const baseUser = {
      name: {
        en: name,
        ru: name,
        kz: name,
        kg: name,
      },
      phone,
      email,
      password,
      payment: 0,
    };

    const userData: User = isType
      ? {
          ...baseUser,
          type: "owner",
          favorites: [],
          avaible_hotels: [],
          disable_hotels: [],
        }
      : {
          ...baseUser,
          type: "user",
          favorites: [],
          rented: [],
          rented_before: [],
        };

    try {
      const resultAction = await dispatch(register(userData));

      if (register.fulfilled.match(resultAction)) {
        return { ...prevState, data: resultAction.payload, error: null };
      } else {
        const error = t("error_user_exists");
        return { ...prevState, error };
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);
      return {
        ...prevState,
        error: error instanceof Error ? error.message : t("error_unknown"),
      };
    }
  }

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

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
    <div className="container mt-[10%]">
      <div className="border-zinc-300 border-1 max-w-96 mx-auto rounded-lg p-5 relative">
        <div className="absolute right-3">
          {isType ? (
            <button
              className="w-10 cursor-pointer rotate-180"
              onClick={() => setType(!isType)}
            >
              {/* <Image
              src={edit}
              alt="edit profile button"
              className="absolute left-2 top-2 "
            /> */}
              <ToggleOffOutlinedIcon
                className="text-blue"
                sx={{ width: "30px", height: "30px" }}
              />
            </button>
          ) : (
            <button
              className="w-10 cursor-pointer "
              onClick={() => setType(!isType)}
            >
              {/* <Image
              src={edit}
              alt="edit profile button"
              className="absolute left-2 top-2 "
            /> */}
              <ToggleOffOutlinedIcon
                className="text-blue"
                sx={{ width: "30px", height: "30px" }}
              />
            </button>
          )}
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {t("register")}
        </h2>
        {isType ? (
          <form action={submitAction} className="flex flex-col gap-y-3 mt-3">
            <label htmlFor="">Арендодатель</label>
            <input
              type="text"
              name="name"
              placeholder={t("name")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />
            <input
              type="email"
              name="email"
              placeholder={t("email")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />
            <input
              type="text"
              name="phone"
              placeholder={t("phone")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />

            <input
              type="password"
              name="password"
              placeholder={t("password")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />
            <input
              type="password"
              name="password-confirm"
              placeholder={t("password_confirm")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />
            {state.error && <p className="text-red-500">{state.error}</p>}
            {!state.error && state.data && (
              <p className="text-green-500">{t("success_registration")}</p>
            )}
            <button className="border-1 p-1 border-gray-400 rounded-lg max-w-28 self-center px-3 cursor-pointer">
              {t("submit")}
            </button>
            <span className="mx-auto">
              {t("already_have_account")}{" "}
              <Link href="/login" replace={false} className="underline">
                {t("sign_in")}
              </Link>
              !
            </span>
          </form>
        ) : (
          <form action={submitAction} className="flex flex-col gap-y-3 mt-3">
            <label htmlFor="">Клиент</label>
            <input
              type="text"
              name="name"
              placeholder={t("name")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />
            <input
              type="email"
              name="email"
              placeholder={t("email")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />
            <input
              type="text"
              name="phone"
              placeholder={t("phone")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />

            <input
              type="password"
              name="password"
              placeholder={t("password")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />
            <input
              type="password"
              name="password-confirm"
              placeholder={t("password_confirm")}
              required
              className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            />
            {state.error && <p className="text-red-500">{state.error}</p>}
            {!state.error && state.data && (
              <p className="text-green-500">{t("success_registration")}</p>
            )}
            <button className="border-1 p-1 border-gray-400 rounded-lg max-w-28 self-center px-3 cursor-pointer">
              {t("submit")}
            </button>
            <span className="mx-auto">
              {t("already_have_account")}{" "}
              <Link href="/login" replace={false} className="underline">
                {t("sign_in")}
              </Link>
              !
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default Page;
