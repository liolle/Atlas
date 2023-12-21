import { ImageResponse } from "next/server";
import React from "react";
import { LogoSVG } from "../components/server/logo";
export const runtime = "edge";

export const alt = "Atlas";
export const size = {
  width: 305,
  height: 305
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<LogoSVG size={305} />, {
    ...size
  });
}
