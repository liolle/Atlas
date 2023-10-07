"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

import { SignInSchema } from "@/src/zod/schema";
import { useForm } from "react-hook-form";

export function FormSignIn() {
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    function onSubmit(values: z.infer<typeof SignInSchema>) {
        console.log(values);
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
                <Button className="w-full" type="submit">
                    SignIn
                </Button>
            </form>
        </Form>
    );
}
