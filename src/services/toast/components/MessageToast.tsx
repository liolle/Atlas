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
      className={` flex w-fit cursor-pointer select-none rounded-lg border-[1px] border-accent-2  bg-bgc  text-content shadow-toast  `}
    >
      <div className=" flex-1 p-4">{message}</div>
    </div>
  );
};

export default MessageToast;
