"use client";

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getUserById } from "@/store/user/user.action";
import { useEffect } from "react";
import CardSekelet from "./cardSekelet";
import CardComponent from "./card";
import { House } from "@/helpers/types";

const arr = [1, 2, 3];

const HotOfferCards: React.FC<{
  special: House[];
}> = ({ special }) => {
  const { t, i18n } = useTranslation();
  const { user } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const currentLanguage = i18n.language;
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="flex justify-center lg:justify-between gap-2.5 w-full lg:flex-nowrap flex-wrap mt-3.5">
      {special.length ? (
        special.map((house) => (
          <CardComponent
            currentLanguage={currentLanguage}
            house={house}
            t={t}
            user={user}
            key={house.id}
          />
        ))
      ) : (
        <div className="flex justify-center md:justify-between gap-2.5 w-full md:flex-nowrap flex-wrap mt-3.5">
          {arr.map((_, index) => (
            <CardSekelet key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotOfferCards;
