import React from "react";
import { SPIN1 } from "../../server/logo";

const Loading = () => {
    return (
        <div className=" flex min-h-screen flex-1 flex-col bg-cover md:flex-row">
            <div className=" flex flex-1 items-center justify-center">
                <SPIN1 />
            </div>
        </div>
    );
};

export default Loading;
