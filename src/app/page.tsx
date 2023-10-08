import React from "react";
import NavButton from "../components/client/Buttons/NavigationButton";

export default function Main() {
    return (
        <main className="flex min-h-screen items-center justify-center ">
            Landing page
            <NavButton route="/home" text="Home">
                Home
            </NavButton>
        </main>
    );
}
