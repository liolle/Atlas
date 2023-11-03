import React from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RePostSVG = () => {
    return (
        <svg
            className=" h-4 w-4 text-accent-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
        </svg>
    );
};

interface LikeSVGProps {
    isLiked?: boolean;
    size?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LikeSVG = ({ isLiked = false, size = 24 }: LikeSVGProps) => {
    return (
        <svg
            className={` ${isLiked && " fill-current"}  stroke-current `}
            fill="none"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DownloadSVG = () => {
    return (
        <svg
            className=" h-4 w-4 text-accent-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MoreSVG = () => {
    return (
        <svg
            className=" h-4 w-4 text-accent-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BokmarkSVG = () => {
    return (
        <svg
            className=" h-4 w-4 text-accent-2"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
    );
};

export const SPIN1 = () => {
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

interface SVGIcon {
    isActive?: boolean;
    size?: number;
}

export const HomeSVG = ({ isActive = false, size = 30 }: SVGIcon) => {
    return (
        <div className=" relative left-[-1px] top-[-3px] flex-1">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className={`fill-current ${
                    isActive ? "text-accent-1" : "text-content"
                }`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H9V12H15V22H19C19 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z"
                    className={`stroke-current ${
                        isActive ? "text-accent-1" : "text-content"
                    }`}
                    transform={`scale(${size / 23})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export const ProfileSVG = ({ isActive = false, size = 30 }: SVGIcon) => {
    return (
        <div className=" relative left-[-1px] top-[-3px] flex-1">
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g
                    clipPath="url(#a)"
                    className={`stroke-current ${
                        isActive ? "text-accent-1" : "text-content"
                    }`}
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path
                        d="M15 16c3.866 0 7-3.358 7-7.5C22 4.358 18.866 1 15 1S8 4.358 8 8.5c0 4.142 3.134 7.5 7 7.5Z"
                        className={`fill-current ${
                            isActive ? "text-accent-1" : "text-content"
                        }`}
                        transform={`scale(${size / 30})`}
                    />
                    <path
                        d="M22.847 16c4.09 2.338 6.868 6.466 7.152 11.216.016.429-.347.784-.805.784H.806c-.458 0-.821-.355-.806-.784.285-4.72 3.048-8.834 7.09-11.172L12.368 16l2.632.76 2.63-.76h5.216Z"
                        className={` left-[50%] top-[50%]  ${
                            isActive
                                ? "fill-current text-accent-1"
                                : "fill-current text-content"
                        }`}
                        transform={`scale(${size / 30})`}
                    />
                </g>
            </svg>
        </div>
    );
};

interface LogoSVGProps {
    size?: number;
}

export const LogoSVG = ({ size = 30 }: LogoSVGProps) => {
    return (
        <svg
            className={`bg-transparent fill-current stroke-current  `}
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M146.271 37.1694L220.271 192.669H240.771C247.553 199.765 247.04 203.201 240.771 208.669H227.771L242.771 241.669C248.452 235.075 251.506 230.867 256.771 222.669C266.06 207.847 269.757 198.387 273.271 179.169C276.715 158.46 276.069 145.986 271.771 122.669C267.337 106.423 263.382 97.3422 253.271 81.1694C252.978 70.732 258.895 67.9393 267.271 72.1694C282.047 96.7282 287.179 110.764 291.271 136.169C293.399 167.791 291.292 183.605 281.771 208.669C272.171 231.944 265.003 242.679 249.271 258.169C232.911 273.111 222.481 280.506 200.771 289.669C174.254 300.178 158.149 302.017 127.771 299.669C99.2977 294.524 84.9188 288.561 61.7709 273.169C37.2505 255.488 26.1982 242.379 12.2709 212.169C1.35567 182.412 -0.790858 164.333 2.27091 129.669C10.4952 97.4132 17.5335 81.2124 35.7709 56.6694C58.1878 30.6099 73.4065 20.0378 104.771 8.16942C132.157 -0.0376902 146.409 -0.70407 170.271 3.66942L189.771 8.16942C198.605 15.6391 195.443 24.008 184.271 23.1694L164.771 18.6694C149.269 16.5322 140.364 16.7362 124.771 19.1694C105.095 23.5675 94.7117 27.8177 77.7715 39.6694C57.9146 54.0034 48.9349 63.6352 36.7715 83.6694C25.9473 102.815 21.6918 114.506 17.7715 137.669C15.9653 158.251 16.4931 170.025 21.7715 191.669H183.271L145.771 110.669L115.271 178.169H79.2715L146.271 37.1694ZM64.2715 208.669H28.7715C34.8898 223.107 39.8315 230.076 49.7715 241.669L64.2715 208.669ZM191.271 208.669H101.771L76.7715 263.169C93.5124 274.286 104.195 278.665 126.271 282.169C144.178 284.77 155.347 284.59 175.771 281.169C194.63 275.554 203.707 271.749 215.771 263.169L191.271 208.669Z"
                transform={`scale(${size / 305})`}
            />
        </svg>
    );
};
