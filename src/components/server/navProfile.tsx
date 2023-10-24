import Link from "next/link";
import React from "react";

interface NavProfileProps {
    params: { name: string; page: string };
    isOWner: boolean;
}

const NavProfile = ({ params, isOWner }: NavProfileProps) => {
    return (
        <div className=" flex h-14 w-full gap-4  p-2">
            <Link
                href={`/users/${params.name}/posts`}
                className={`flex w-32 items-center justify-center rounded-full ${
                    params.page == "posts" && " font-bold text-accent-1"
                }`}
            >
                posts
            </Link>
            {isOWner && (
                <Link
                    href={`/users/${params.name}/groups`}
                    className={`flex w-32 items-center justify-center rounded-full ${
                        params.page == "groups" && " font-bold text-accent-1"
                    }`}
                >
                    groups
                </Link>
            )}
        </div>
    );
};

export default NavProfile;
