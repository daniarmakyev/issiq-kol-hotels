"use client";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/joy";
import bed from "../../public/image/icons/card-bed.svg";
import human from "../../public/image/icons/card-human.svg";
import save from "../../public/image/icons/card-save.svg";
import size from "../../public/image/icons/card-size.svg";
import star from "../../public/image/icons/card-star.svg";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { House } from "@/store/house/house.slice";

const arr = [1, 2, 3];

const HotOfferCards: React.FC<{ special: House[] }> = ({ special }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  return (
    <div className="flex justify-center lg:justify-between gap-2.5 w-full lg:flex-nowrap flex-wrap mt-3.5">
      {special.length ? (
        special.map((house) => (
          <Card sx={{ maxWidth: 350, width: "100%", p: "10px",minWidth:320 }} key={house.id}>
            <div style={{ position: "relative" }}>
              <AspectRatio minHeight="120px" maxHeight="200px">
                <Image
                  width={260}
                  height={260}
                  src={house.images[0]}
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
                justifyContent: "space-between",
                flexDirection: "row",
                flexWrap: "nowrap",
              }}
            >
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
              >
                <Image src={bed} alt="bed" width={24} height={24} />
                {house.beds} {t("beds")}
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
              >
                <Image
                  src={human}
                  alt="human"
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px]"
                />
                {house.limit} {t("sleeping_places")}
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
        ))
      ) : (
        <div className="flex justify-center md:justify-between gap-2.5 w-full md:flex-nowrap flex-wrap mt-3.5">
          {arr.map((_, index) => (
            <Card key={index} variant="outlined" sx={{ width: 350 }}>
              <AspectRatio ratio="21/9">
                <Skeleton animation="wave" variant="overlay">
                  <Image
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto"
                    alt="skeleton"
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
                    <Image
                      src={bed}
                      alt="bed"
                      width={24}
                      height={24}
                      style={{ width: "auto", height: "auto" }}
                    />
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
                    <Image
                      src={bed}
                      alt="bed"
                      width={24}
                      height={24}
                      style={{ width: "auto", height: "auto" }}
                    />
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
                    <Image
                      src={bed}
                      alt="bed"
                      width={24}
                      height={24}
                      style={{ width: "auto", height: "auto" }}
                    />
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
