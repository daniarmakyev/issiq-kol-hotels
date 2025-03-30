"use client";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { User } from "@/helpers/types";
import { login } from "@/store/user/user.action";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const id = localStorage.getItem("id");
  type State = {
    data: User | string | null;
    error: string | string | null;
  };

  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      router.push("/");
    }
  }, [user, router]);
  const [state, submitAction] = useActionState(authFn, {
    data: null,
    error: null,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function authFn(prevState: State, formData: FormData): State {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (password && email) {
      try {
        dispatch(login({ email, password }));
        if (user != null) {
          localStorage.setItem("id", user.id + "");
          return { data: user, error: null };
          router.push("/");
        } else {
          return { ...prevState, error: t("emailOrPasswordIncorect") };
        }
      } catch (error: any) {
        console.log(error);

        if (error) {
          return { ...prevState, error: error.message };
        } else {
          return { ...prevState, error: "An unknown error occurred" };
        }
      }
    }
    return { ...prevState, error: t("error_fill_fields") };
  }

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
      <div className="border-zinc-300 border-1 max-w-96 mx-auto rounded-lg p-5">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {t("sign_in")}
        </h2>
        <form action={submitAction} className="flex flex-col gap-y-3 mt-3">
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            required={true}
          />
          <input
            type="password"
            name="password"
            placeholder={t("password")}
            className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
            required={true}
          />
          {state.error && <p className="text-red-500">{state.error}</p>}
          {!state.error && state.data && (
            <p className="text-green-500">{t("success_login")}</p>
          )}
          <button className="border-1 p-1 border-gray-400 rounded-lg max-w-28 self-center px-3 cursor-pointer">
            {t("submit")}
          </button>
          <span className="mx-auto">
            {t("dont_have_account")}{" "}
            <Link href="/register" replace={false} className="underline">
              {t("sign_up")}
            </Link>
            !
          </span>
        </form>
      </div>
    </div>
  );
};

export default Page;
