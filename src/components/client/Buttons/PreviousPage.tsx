"use client";
import React, { MouseEvent } from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

interface PreviousPageProps {
  children: React.ReactNode;
}

const PreviousPage = ({ children }: PreviousPageProps) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className=" flex select-none items-center gap-2"
    >
      {children}
    </Button>
  );
};

export default PreviousPage;
