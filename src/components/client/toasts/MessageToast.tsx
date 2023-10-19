import React from "react";
import toast, { Toast } from "react-hot-toast";

interface MessageToastProps {
    message: string;
    t: Toast;
}

const MessageToast = ({ message, t }: MessageToastProps) => {
    const handleClose = () => {
        toast.dismiss(t.id);
        toast.remove(t.id);
    };

    return (
        <div
            onClick={handleClose}
            className={` shadow-toast border-[1px] border-accent-2 flex w-fit cursor-pointer select-none  rounded-lg  bg-bgc text-content  `}
        >
            <div className=" flex-1 p-4">
                {message}
            </div>
        </div>
    );
};

export default MessageToast;
