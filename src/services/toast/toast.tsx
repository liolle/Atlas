import toast from "react-hot-toast";
import MessageToast from "./components/MessageToast";
import React from "react";

export const ToastMessage = (message: string) =>
    toast.custom((t) => <MessageToast t={t} message={message} />, {
        duration: 2000,
        position: "bottom-right"
    });
