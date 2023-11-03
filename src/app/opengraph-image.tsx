import { ImageResponse } from "next/server";
import React from "react";
import { LogoSVG } from "../components/server/logo";
// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Atlas";
export const size = {
    width: 48,
    height: 48
};

export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(<LogoSVG size={48} />, {
        ...size
    });
}
