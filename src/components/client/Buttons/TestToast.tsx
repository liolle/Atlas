"use client";
import { ToastMessage } from "@/src/services/toast";
import React from "react";

const TestToast = () => {
    return (
        <button
            onClick={() => ToastMessage("clicked")}
            type="button"
            className=" w-fit self-center rounded-full bg-content p-2 text-bgc"
        >
            <span className=" flex  h-full flex-1">Test Toast</span>
        </button>
    );
};

export default TestToast;
