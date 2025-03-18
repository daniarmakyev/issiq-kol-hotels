"use client";
import React from "react";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/joy";
import bed from "../../public/image/icons/card-bed.svg";
import human from "../../public/image/icons/card-human.svg";
import size from "../../public/image/icons/card-size.svg";
import star from "../../public/image/icons/card-star.svg";
import Image from "next/image";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { House } from "@/store/house/house.slice";
import i18next from "@/i18n";
import { User } from "@/store/user/user.slice";
import { useAppDispatch } from "@/helpers/hooks";
import { addFavorite } from "@/store/user/user.action";

const CardComponent = ({
  house: house,
  t: t,
  user: user,
  currentLanguage,
}: {
  house: House;
  t: typeof i18next.t;
  user: User | null;
  currentLanguage: string;
}) => {
  const dispatch = useAppDispatch();

  const handleFavoriteClick = (houseId: number) => {
    if (user?.favorites) {
      const updatedFavorites = user?.favorites.includes(houseId)
        ? user?.favorites.filter((id) => id !== houseId)
        : [...user?.favorites, Number(houseId)];

      dispatch(
        addFavorite({ id: user?.id, data: { favorites: updatedFavorites } })
      );
    }
  };
  return (
    <Card
      sx={{ maxWidth: 350, width: "100%", p: "10px", minWidth: 250 }}
      key={house.id}
    >
      <div style={{ position: "relative" }}>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Image
            width={260}
            height={260}
            src={house.images[0]}
            priority
            alt={`${house.name?.[currentLanguage as keyof typeof house.name]} ${house.id}`}
          />
        </AspectRatio>
        <Typography level="title-lg">
          {house.name?.[currentLanguage as keyof typeof house.name]}
        </Typography>
        <IconButton
          aria-label="bookmark"
          variant="plain"
          size="sm"
          onClick={() => handleFavoriteClick(Number(house.id))}
          className={`${user?.favorites ? "" : "pointer-events-none"}`}
          sx={{
            position: "absolute",
            top: "0.9rem",
            right: "1rem",
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: "0.7",
          }}
        >
          {user && user?.favorites?.includes(Number(house.id)) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <IconButton
          aria-label="ratings"
          variant="plain"
          size="sm"
          sx={{
            position: "absolute",
            top: "0.9rem",
            left: "1rem",
            borderRadius: "8px",
            background: "rgba(255,255,255, .7)",
            paddingX: "8px",
            paddingY: "0px",
          }}
        >
          <Image
            src={star}
            width={24}
            height={24}
            alt="star"
            className="opacity-[0.8] w-auto h-auto"
          />
          <Typography sx={{ fontWeight: "400", marginLeft: "5px" }}>
            {String(house.rating)}
          </Typography>
        </IconButton>
      </div>
      <CardContent orientation="horizontal">
        <div>
          <Typography sx={{ fontSize: "lg", fontWeight: "md" }}>
            <span className="text-blue">
              {house.price}/{house.currency}
            </span>
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          aria-label="Explore offer"
          sx={{ ml: "auto", alignSelf: "center" }}
        >
          <Link href={`/hotel/${house.id}`}> {t("learn_more")}</Link>
        </Button>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "nowrap",

          mx: "auto",
        }}
      >
        <CardContent
          sx={{
            fontSize: "sm",
            fontWeight: "sm",
            display: "flex",
            gap: "3px",
            alignItems: "center",
            flexWrap: "nowrap",
            flexDirection: "row",
          }}
          className="max-[350px]:max-w-[40px]"
        >
          <Image src={bed} alt="bed" width={24} height={24} />
          {house.beds}
          <span className="max-[350px]:hidden "> {t("beds")}</span>
        </CardContent>
        <CardContent
          sx={{
            fontSize: "sm",
            fontWeight: "sm",
            display: "flex",
            gap: "0px",
            alignItems: "center",
            flexWrap: "nowrap",
            flexDirection: "row",
            textWrap: "nowrap",
          }}
          className="max-[350px]:max-w-[40px] gap-1"
        >
          <Image
            src={human}
            alt="human"
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          />
          {house.limit}
          <span className="max-[350px]:hidden">{t("sleeping_places")}</span>
        </CardContent>
        <CardContent
          sx={{
            fontSize: "sm",
            fontWeight: "sm",
            display: "flex",
            gap: "1px",
            alignItems: "center",
            flexWrap: "nowrap",
            flexDirection: "row",
            textWrap: "nowrap",
          }}
          className=""
        >
          <Image
            src={size}
            alt="size"
            width={24}
            height={24}
            style={{ width: "auto", height: "auto" }}
          />
          {house.square} {t("sq_m")}
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
