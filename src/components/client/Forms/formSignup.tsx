"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

import { SignUpSchema } from "@/src/zod/schema";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export function FormSignUp() {
    const router = useRouter();

    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    });

    async function onSubmit(values: z.infer<typeof SignUpSchema>) {
        try {
            const response = await fetch("/api/accounts/create", {
                method: "POST",
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                    username: values.name,
                    provider: "credential"
                })
            });

            if (!response.ok) {
                const data = await response.json();
                //TODO [SNACKBAR]
                console.log(data);
                return;
            }

            router.push("/api/auth/signin");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    className=""
                                    placeholder="test@test.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder=""
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full" type="submit">
                    SignUp
                </Button>
            </form>
        </Form>
    );
}
