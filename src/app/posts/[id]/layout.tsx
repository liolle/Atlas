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
            <section className="  flex h-full w-full gap-4  @container">
                <div className="flex h-full w-full overflow-y-auto">
                    <div className="  flex h-full min-h-screen  flex-[3_1_0] flex-col border-r-2 border-accent-2  ">
                        <div className=" sticky left-0 top-0 z-10 flex w-[100%]  flex-[0_0_70px]  items-center  justify-between border-b-2 border-accent-2 px-4 backdrop-blur-sm ">
                            <PreviousPage>
                                <ArrowLeft />
                            </PreviousPage>
                            <PostDialog reference={params.id}>Reply</PostDialog>
                        </div>

                        <div className=" w-full ">{children}</div>
                    </div>
                    <div className=" hidden h-full max-w-[500px] flex-[1_1_0] flex-col  @[950px]:flex">
                        <div className=" sticky left-0 top-0 z-10 flex h-[70px] w-[100%] items-center justify-center border-b-2 border-accent-2 bg-bgc  ">
                            <span>WIP</span>
                        </div>
                        <div className=" flex h-full w-full flex-1 items-center justify-center ">
                            <span>WIP</span>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
}
