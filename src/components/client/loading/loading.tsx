import React from "react";

const Loading = () => {
    return (
        <div className=" flex min-h-screen flex-1 flex-col bg-cover md:flex-row">
            <div className=" flex flex-1 items-center justify-center">
                <SPIN1 />
            </div>
        </div>
    );
};

const SPIN1 = () => {
    return (
        <div className=" flex w-full justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <path
                    className=" fill-current text-accent-1"
                    d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z"
                >
                    <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                    />
                </path>
            </svg>
        </div>
    );
};

export default Loading;
