"use client";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";

interface CardPostFileDisplayProps {
  files: string[];
}

const CardPostFileDisplay = ({ files }: CardPostFileDisplayProps) => {
  if (!files.length) return <></>;
  const [ratio, setRatio] = useState(16 / 9);

  useLayoutEffect(() => {});

  return (
    <div className=" relative flex h-fit w-full justify-center ">
      {files.length > 0 && (
        <Image
          src={files[0]}
          alt="Post_Image"
          placeholder="empty"
          width={700}
          height={700 / ratio}
          onLoadingComplete={({ naturalWidth, naturalHeight }) =>
            setRatio(naturalWidth / naturalHeight)
          }
          className="  rounded-lg border-2 border-accent-2 object-cover"
        />
      )}
    </div>
  );
};

export default CardPostFileDisplay;
