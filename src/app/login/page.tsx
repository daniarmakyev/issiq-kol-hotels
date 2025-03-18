"use client";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { login } from "@/store/user/user.action";
import { User } from "@/store/user/user.slice";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  type State = {
    data: User | string | null;
    error: string | string | null;
  };

  const [state, submitAction] = useActionState(authFn, {
    data: null,
    error: null,
  });



  function authFn(prevState: State, formData: FormData): State {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (password && email) {
        dispatch(login({ email, password }));
        if (user != null) {
          localStorage.setItem("id", user.id + "");
          return { data: user, error: null };
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { ...prevState, error: error.message };
      } else {
        return { ...prevState, error: "An unknown error occurred" };
      }
    }

    return { ...prevState, error: "Надо заполнить все поля!" };
  }
  const router = useRouter();
  useEffect(() => {
    console.log(router);

    const id = localStorage.getItem("id");
    if (id) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <div className="container mt-[10%]">
      <div className="border-zinc-300 border-1 max-w-96 mx-auto rounded-lg p-5">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Sign in
        </h2>
        <form action={submitAction} className="flex flex-col gap-y-3 mt-3">
          <input
            type="email"
            name="email"
            placeholder="email"
            className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="border-1 p-1 border-gray-400 rounded-lg focus:outline-0"
          />
          {state.error && <p className="text-red-500">{state.error}</p>}
          {!state.error && state.data && (
            <p className="text-green-500">Successfully logged in</p>
          )}{" "}
          <button className="border-1 p-1 border-gray-400 rounded-lg max-w-28 self-center px-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
