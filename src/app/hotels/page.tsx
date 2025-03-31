"use client";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { getHouses } from "@/store/house/house.action";
import { useState, useEffect } from "react";
import CardComponent from "@/components/card";
import CardSekelet from "@/components/cardSekelet";
import { Button, Select, Option } from "@mui/joy";
import { getUserById } from "@/store/user/user.action";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
const arr = [1, 2, 3, 4, 5, 6];

const Page = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const houses = useAppSelector((state) => state.houses.houses);
  const { user } = useAppSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setCheked] = useState(false);
  const [lowhigh, setLowhigh] = useState("");
  const [sortItem, setSortItem] = useState<string | null | undefined>(null);
  const [id, setId] = useState<string | number>();
  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setSortItem(newValue);
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      setId(id);
    }
  }, []);

  useEffect(() => {
    dispatch(getHouses({ page: currentPage, item: sortItem!, low: lowhigh }));

    setMounted(true);
  }, [dispatch, currentPage, sortItem, checked, lowhigh]);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

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
    <div className="bg-white  min-h-[96vh]">
      <div className="container pt-5">
        <div className=" flex justify-between text-sm">
          <Link
            className="border border-red-400 rounded-lg text-red-400 py-2 px-3"
            replace={false}
            href={`/map/${76.63146082137607}/${42.47699365097252}`}
          >
            Show on map
          </Link>

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
                <CardComponent
                  currentLanguage={currentLanguage}
                  house={house}
                  t={t}
                  user={user}
                  key={house.id}
                />
              ))}
            </div>
            <div className="flex justify-center pt-4 pb-4">
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
          <div className="flex justify-center md:justify-between gap-2.5 w-full  flex-wrap mt-3.5">
            {arr.map((_, index) => (
              <CardSekelet key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
