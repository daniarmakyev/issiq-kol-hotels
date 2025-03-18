"use client";
import React from 'react'
import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/joy";
import bed from "../../public/image/icons/card-bed.svg";
import Image from "next/image";

const CardSekelet = () => {
  return (
    <Card variant="outlined" sx={{ width: 350 }}>
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
  )
}

export default CardSekelet