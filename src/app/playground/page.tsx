import BaseLayout from "@/src/components/server/BaseLayout";

import React from "react";

export default async function Playground() {
  return (
    <BaseLayout>
      <div className=" flex h-full flex-col ">
        <div className=" flex flex-[0_1_100px] items-center justify-center border-b-2 border-accent-2">
          <span className=" p-2">Area to develop new components </span>
        </div>
        <div className=" flex h-full flex-1  p-1"></div>
      </div>
    </BaseLayout>
  );
}
