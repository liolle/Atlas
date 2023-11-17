import toast from "react-hot-toast";
import MessageToast from "./components/MessageToast";
import React from "react";

export const ToastMessage = (
  message: string,
  options?: {
    variant?: "error" | "success" | "default";
  }
) =>
  toast.custom((t) => <MessageToast t={t} message={message} />, {
    duration: 2000,
    position: "bottom-right",
    className: `${
      options &&
      (options.variant == "success"
        ? " text-message-success"
        : options.variant == "error"
        ? "text-message-error"
        : "")
    }`
  });
