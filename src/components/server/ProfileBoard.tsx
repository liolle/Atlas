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
    groups,
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
            <div className=" flex flex-1 items-center justify-center">
                {activeTab == "posts" && posts}
                {activeTab == "groups" && groups}
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
        <div className=" flex h-14 w-full gap-4  p-2">
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
                tab="groups"
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
            className={`flex w-fit items-center justify-center rounded-full border-2 border-accent-2 px-4 ${
                activeTab === tab && " border-accent-1 font-bold text-accent-1"
            }`}
        >
            {tab}
        </button>
    );
};

export default ProfileBoard;
