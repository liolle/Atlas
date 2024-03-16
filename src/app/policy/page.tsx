import NavButton from "@/src/components/client/Buttons/NavigationButton";
import React from "react";

export default async function Policy() {
  return (
    <div className=" flex h-screen flex-col overflow-y-auto text-content ">
      <div className=" sticky left-0 top-0 z-10 flex flex-[0_0_100px]   items-center justify-center border-b-2 border-accent-2 bg-bgc p-4">
        <div className="  ">
          <NavButton route="/home">Home</NavButton>
        </div>
        <span className=" p-2">Privacy Policy for Atlas </span>
      </div>
    </div>
  );
}
