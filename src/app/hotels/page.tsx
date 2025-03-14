"use client";
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  IconButton,
  Select,
  Option,
  Skeleton,
  Typography,
} from "@mui/joy";
import bed from "../../../public/image/icons/card-bed.svg";
import human from "../../../public/image/icons/card-human.svg";
import save from "../../../public/image/icons/card-save.svg";
import size from "../../../public/image/icons/card-size.svg";
import star from "../../../public/image/icons/card-star.svg";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getHouses } from "@/store/house/house.action";
import { useState, useEffect } from "react";
import { House } from "@/store/house/house.slice";
const arr = [1, 2, 3];
export interface IPag {
  first: number;
  prev: boolean | number;
  next: boolean | number;
  last: number;
  pages: number;
  items: number;
  data?: House[];
}
const Page = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const houses = useAppSelector((state) => state.houses.houses);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setCheked] = useState(false);
  const [lowhigh, setLowhigh] = useState("");
  const [sortItem, setSortItem] = useState<string | null | undefined>(null);

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setSortItem(newValue);
  };

  useEffect(() => {
    dispatch(getHouses({ page: currentPage, item: sortItem!, low: lowhigh }));
    setMounted(true);
  }, [dispatch, currentPage, sortItem, checked, lowhigh]);

  if (!mounted) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  function handelCheck(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    setLowhigh(e.currentTarget.id);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= houses!.pages; i++) {
      if (
        i === 1 ||
        i === houses!.pages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === i
                ? "bg-gray-100 text-gray-700"
                : "bg-green-2 text-dark shadow-md"
            }`}
          >
            {i}
          </button>
        );
      } else if (
        !pageNumbers[pageNumbers.length - 1]?.key?.toString().includes("dots")
      ) {
        pageNumbers.push(
          <span key={`dots-${i}`} className="mx-1">
            ...
          </span>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="bg-white">
      <div className="container pt-5">
        <div className=" flex justify-between text-sm">
          <Button
            variant="outlined"
            color="danger"
            sx={{ fontSize: "14px", fontWeight: "400" }}
          >
            Show on map
          </Button>

          <div className="flex items-center gap-5">
            <div className="max-w-3xs flex items-center gap-2">
              <span className=" text-nowrap font-light">Sort by</span>
              <Select
                multiple={false}
                defaultValue={"rating"}
                onChange={handleChange}
                sx={{
                  border: "none",
                  color: "#ee685f",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  fontWeight: "200",
                  p: "0",
                  paddingLeft: "5px",
                }}
                slotProps={{
                  listbox: {
                    sx: {
                      width: "80px",
                      fontWeight: "200",
                    },
                  },
                }}
              >
                <Option value="rating" id="rating">
                  Rating
                </Option>
                <Option value="price" id="price">
                  Price
                </Option>
              </Select>
            </div>
            {checked ? (
              <Button
                onClick={(e) => (handelCheck(e), setCheked(!checked))}
                sx={{ p: "0", paddingLeft: "5px", border: "none" }}
                color="danger"
                variant="outlined"
                id="asc"
              >
                Lowest <KeyboardArrowUpIcon />
              </Button>
            ) : (
              <Button
                onClick={(e) => (handelCheck(e), setCheked(!checked))}
                sx={{ p: "0", paddingLeft: "5px", border: "none" }}
                color="danger"
                variant="outlined"
                id="desc"
              >
                Hignest <KeyboardArrowDownIcon />
              </Button>
            )}
          </div>
        </div>

        {houses ? (
          <div>
            <div className="flex flex-wrap gap-4 items-center justify-center  lg:justify-evenly md:mt-6 mt-5">
              {houses.data!.map((house) => (
                <Card
                  sx={{
                    maxWidth: 390,
                    width: "100%",
                    p: "10px",
                    alignSelf: "center",
                  }}
                  key={house.id}
                >
                  <div style={{ position: "relative" }}>
                    <AspectRatio minHeight="120px" maxHeight="200px">
                      <Image
                        width={260}
                        height={260}
                        src={house.images[0]}
                        loading="lazy"
                        alt={
                          house.name?.[
                            currentLanguage as keyof typeof house.name
                          ]
                        }
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
                      <Link href={`/hotel/${house.id}`}>
                        {" "}
                        {t("learn_more")}
                      </Link>
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
                    <Typography
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
                    </Typography>
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
              ))}
            </div>
            <div className="flex justify-center mt-4 mb-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!houses!.prev}
                className="mx-2 px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              {renderPageNumbers()}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!houses!.next}
                className="mx-2 px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
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
    </div>
  );
};

export default Page;
