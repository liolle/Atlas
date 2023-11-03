import { ImageResponse } from "next/server";
import React from "react";
import { LogoSVG } from "../components/server/logo";
export const runtime = "edge";

export const size = {
    width: 32,
    height: 32
};
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(<LogoSVG size={32} />, {
        ...size
    });
}
