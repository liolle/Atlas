"use client";
import React, { useState } from "react";
import { Session } from "next-auth";
import { ActiveProfileTab } from "@/src/types";

interface ProfileBoardProps {
    params: { name: string; page: string };
    session: Session | null;
    follows: React.ReactNode;
    followers: React.ReactNode;
    groups: React.ReactNode;
    posts: React.ReactNode;
}

const ProfileBoard = ({
    params,
    session,
    posts,
    // groups,
    follows,
    followers
}: ProfileBoardProps) => {
    const isOWner = (session && params.name == session.user?.name) ?? false;

    const [activeTab, setActiveTab] = useState<ActiveProfileTab>("posts");

    return (
        <>
            <NavProfile
                isOWner={isOWner}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />

            <div className="  h-full w-full  items-center justify-center  ">
                {activeTab == "posts" && posts}
                {activeTab == "follows" && follows}
                {activeTab == "followers" && followers}
            </div>
        </>
    );
};

interface NavProfileProps {
    isOWner: boolean;
    setActiveTab: React.Dispatch<React.SetStateAction<ActiveProfileTab>>;
    activeTab: ActiveProfileTab;
}

const NavProfile = ({ isOWner, setActiveTab, activeTab }: NavProfileProps) => {
    return (
        <div className=" sticky left-0 top-0 z-10 flex h-14 w-full gap-4 bg-bgc p-2  backdrop-blur-sm">
            <NavButton
                isOWner={isOWner}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                tab="posts"
            />
            <NavButton
                isOWner={isOWner}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                tab="follows"
            />
            <NavButton
                isOWner={isOWner}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                tab="followers"
            />
        </div>
    );
};

interface NavProfileButtonProps {
    isOWner: boolean;
    setActiveTab: React.Dispatch<React.SetStateAction<ActiveProfileTab>>;
    activeTab: ActiveProfileTab;
    tab: ActiveProfileTab;
}

const NavButton = ({
    isOWner,
    setActiveTab,
    activeTab,
    tab
}: NavProfileButtonProps) => {
    if (tab == "groups" && !isOWner) return <></>;
    return (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex w-fit items-center justify-center rounded-full border-[1px] border-accent-2 px-3 py-2 ${
                activeTab === tab && " border-content bg-content  text-bgc"
            }`}
        >
            {tab}
        </button>
    );
};

export default ProfileBoard;
