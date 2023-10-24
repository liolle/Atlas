import React from "react";
import NavProfile from "./navProfile";
import { Session } from "next-auth";

const ProfileBoard = ({
    children,
    params,
    session
}: {
    children: React.ReactNode;
    params: { name: string; page: string };
    session: Session | null;
}) => {
    const isOWner = (session && params.name == session.user?.name) ?? false;

    return (
        <>
            <NavProfile params={params} isOWner={isOWner} />
            <div className=" flex flex-1 items-center justify-center">
                {children}
            </div>
        </>
    );
};

export default ProfileBoard;
