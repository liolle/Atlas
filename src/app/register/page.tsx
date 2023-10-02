"use client";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
import React from "react";
import NavButton from "@/src/components/client/Buttons/NavigationButton";
import BaseInput from "@/src/components/client/inputs/baseinput";

export default function Register() {
    // const [Email, setEmail] = useState("");
    // const [Password, setPassword] = useState("");
    // const [ConfPassword, setConfPassword] = useState("");

    // const [PasswordError, setPasswordError] = useState(" ");
    // const [confPasswordError, setConfPasswordError] = useState(" ");
    // const [EmailError, setEmailError] = useState(" ");

    return (
        <div className="bg-main-background flex h-screen items-center justify-center bg-cover p-10">
            <div className="container mx-auto max-w-[600px]">
                <div
                    className="bg-primary-white mx-auto flex flex-col overflow-hidden rounded-xl md:flex-row"
                    style={{ boxShadow: "10px 10px 20px #888888" }}
                >
                    <div className="flex w-full flex-col gap-6 px-12 py-10">
                        <div className=" flex items-center justify-between ">
                            <img
                                className=" max-h-[50px] self-start justify-self-start"
                                src="/GlobeImage.png"
                                alt=""
                            />
                            <NavButton route={"/login"}>
                                <div className=" flex items-center justify-between gap-2">
                                    <span>Login</span>
                                </div>
                            </NavButton>
                        </div>

                        <span className="text-3xl font-bold text-green-800">
                            Register
                        </span>

                        <div className="">
                            <BaseInput
                                type="email"
                                placeholder="Email"
                                name="Email"
                                // onChange={(e) => setEmail(e)}
                            />
                            <div className=" text-red-600">{""}</div>
                        </div>
                        <div className="">
                            <BaseInput
                                type="password"
                                placeholder="Password"
                                name="Password"
                                // onChange={(e) => setPassword(e)}
                            />
                            <div className=" text-red-600">{""}</div>
                        </div>
                        <div className="">
                            <BaseInput
                                type="password"
                                placeholder="Confirm Password"
                                name="ConfPassword"
                                // onChange={(e) => setConfPassword(e)}
                            />
                            <div className=" text-red-600">{""}</div>
                        </div>

                        <NavButton>
                            <div className=" ">
                                <span>Register</span>
                            </div>
                        </NavButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
