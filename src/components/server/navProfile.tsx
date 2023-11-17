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
        className={`flex w-fit items-center justify-center rounded-full border-2 border-accent-2 px-4 ${
          params.page == "posts" && " border-accent-1 font-bold text-accent-1"
        }`}
      >
        posts
      </Link>
      {isOWner && (
        <Link
          href={`/users/${params.name}/groups`}
          className={`flex w-fit items-center justify-center rounded-full border-2 border-accent-2 px-4 ${
            params.page == "groups" &&
            " border-accent-1 font-bold text-accent-1"
          }`}
        >
          groups
        </Link>
      )}
    </div>
  );
};

export default NavProfile;
