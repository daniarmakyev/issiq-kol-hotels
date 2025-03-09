import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/joy";
import bed from "../../public/image/icons/card-bed.svg";
import human from "../../public/image/icons/card-human.svg";
import save from "../../public/image/icons/card-save.svg";
import size from "../../public/image/icons/card-size.svg";
import star from "../../public/image/icons/card-star.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { useEffect } from "react";
import { getSpecialHouses } from "@/store/house/house.action";
import { useTranslation } from "react-i18next";

const arr = [1, 2, 3];

function HotOfferCards() {
  const dispatch = useAppDispatch();
  const { special } = useAppSelector((state) => state.houses);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    dispatch(getSpecialHouses());
  }, [dispatch]);

  return (
    <div className="flex justify-center md:justify-between gap-2.5 w-full md:flex-nowrap flex-wrap mt-3.5">
      {special.length ? (
        special.map((house) => (
          <Card sx={{ maxWidth: 350, width: "100%", p: "10px" }} key={house.id}>
            <div style={{ position: "relative" }}>
              <AspectRatio minHeight="120px" maxHeight="200px">
                <img
                  src={house.images[0]}
                  srcSet={house.images[0]}
                  loading="lazy"
                  alt={house.name?.[currentLanguage as keyof typeof house.name]}
                />
              </AspectRatio>
              <Typography level="title-lg">
                {house.name?.[currentLanguage as keyof typeof house.name]}
              </Typography>
              <IconButton
                aria-label="bookmark"
                variant="plain"
                size="sm"
                sx={{
                  position: "absolute",
                  top: "0.9rem",
                  right: "1rem",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  opacity: "0.7",
                }}
              >
                <Image src={save} alt="save" />
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
                <Image src={star} alt="star" className="opacity-[0.8]" />
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
                {t("learn_more")}
              </Button>
            </CardContent>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Typography
                sx={{
                  fontSize: "sm",
                  fontWeight: "sm",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <Image src={bed} alt="bed" width={24} height={24} />
                {house.beds} {t("beds")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "sm",
                  fontWeight: "sm",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <Image src={human} alt="human" width={24} height={24} />
                {house.limit} {t("sleeping_places")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "sm",
                  fontWeight: "sm",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <Image src={size} alt="size" width={24} height={24} />
                {house.square} {t("sq_m")}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <div
          className="flex justify-center md:justify-between gap-2.5 w-full md:flex-nowrap flex-wrap mt-3.5"
        >
          {arr.map((_, index) => (
            <Card key={index} variant="outlined" sx={{ width: 350 }}>
              <AspectRatio ratio="21/9">
                <Skeleton animation="wave" variant="overlay">
                  <img
                    alt=""
                    src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  />
                </Skeleton>
              </AspectRatio>
              <Typography sx={{ fontSize: "20px" }}>
                <Skeleton>somename</Skeleton>
              </Typography>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>
                  <Skeleton>somename</Skeleton>
                </Typography>
                <Button
                  variant="solid"
                  size="sm"
                  aria-label="Explore offer"
                  sx={{ ml: "auto", alignSelf: "center" }}
                >
                  somethink
                  <Skeleton animation="wave" />
                </Button>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Typography>
                  <Skeleton
                    sx={{
                      fontSize: "sm",
                      fontWeight: "sm",
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Image src={bed} alt="bed" width={24} height={24} />
                    somes
                  </Skeleton>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "sm",
                    fontWeight: "sm",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Skeleton
                    sx={{
                      fontSize: "sm",
                      fontWeight: "sm",
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Image src={bed} alt="bed" width={24} height={24} />
                    somes
                  </Skeleton>
                </Typography>
                <Typography
                  sx={{
                    fontSize: "sm",
                    fontWeight: "sm",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Skeleton
                    sx={{
                      fontSize: "sm",
                      fontWeight: "sm",
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Image src={bed} alt="bed" width={24} height={24} />
                    somes
                  </Skeleton>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default HotOfferCards;
