import PostDialog from "@/src/components/client/Buttons/PostDialog";
import PreviousPage from "@/src/components/client/Buttons/PreviousPage";
import BaseLayout from "@/src/components/server/BaseLayout";
import { ArrowLeft } from "lucide-react";
import React from "react";
export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <BaseLayout>
      <section className="  flex h-full w-full gap-4   @container">
        <div className="flex h-full w-full overflow-y-auto ">
          <div className="  flex h-fit min-h-screen  flex-[3_1_0] flex-col   ">
            <div className=" sticky left-0 top-0 z-10 flex w-[100%] flex-[0_0_70px]  items-center  justify-between  border-b-2  border-accent-2  backdrop-blur-sm ">
              <div className=" flex flex-1 justify-between px-2">
                <PreviousPage>
                  <ArrowLeft />
                </PreviousPage>
                <PostDialog reference={params.id}>Reply</PostDialog>
              </div>
              <div className=" hidden h-full max-w-[400px] flex-1 flex-col border-l-2 border-accent-2  @[950px]:flex">
                <div className="flex h-[70px] w-[100%] items-center justify-center  bg-bgc  ">
                  <span>WIP</span>
                </div>
              </div>
            </div>

            <main className=" flex w-full flex-1">
              <div className=" flex-1">{children}</div>
              <div className=" hidden max-w-[400px]  flex-1 flex-col border-l-2 border-accent-2   @[950px]:flex"></div>
            </main>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
