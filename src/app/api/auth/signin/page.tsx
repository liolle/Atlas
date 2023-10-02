"use client";
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
import React from "react";
import NavButton from "@/src/components/client/Buttons/NavigationButton";
import BaseInput from "@/src/components/client/inputs/baseinput";

export default function Login() {
    // const router = useRouter()

    // const [Email, setEmail] = useState('')
    // const [Password, setPassword] = useState('')
    // const [formError, setFormError] = useState('')

    const handleSubmit = async () => {};

    return (
        <div className="bg-main-background flex h-screen items-center justify-center bg-cover p-10">
            <div className="container mx-auto max-w-[600px]">
                <div
                    className="bg-primary-white mx-auto flex  flex-col overflow-hidden rounded-xl md:flex-row"
                    style={{ boxShadow: "10px 10px 20px #888888" }}
                >
                    <div className="flex w-full flex-col gap-6 px-12 py-10 ">
                        <div className=" flex justify-between">
                            <NavButton route={"/register"}>
                                <span>Register</span>
                            </NavButton>
                            <img
                                className=" max-h-[50px] self-start justify-self-start"
                                src="/GlobeImage.png"
                                alt=""
                            />
                        </div>

                        <h2 className="mb-4 text-3xl font-bold text-green-800">
                            Log In
                        </h2>

                        <div className="">
                            <BaseInput
                                type="email"
                                placeholder="Email"
                                name="Email"
                            />
                        </div>

                        <div className="">
                            <BaseInput
                                type="password"
                                placeholder="Password"
                                name="Password"
                            />
                            <div className=" text-red-600">{""}</div>
                        </div>

                        <NavButton
                            route={"/login"}
                            action={() => handleSubmit()}
                        >
                            <div className=" ">
                                <span>Log In</span>
                            </div>
                        </NavButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
