"use client";
import { Button } from "@/src/components/ui/button";
import React, { useState } from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { EmailValidation } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { ToastMessage } from "@/src/services/toast/toast";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FormUpdateUser({
    field,
    session
}: {
    field: string;
    session: Session | null;
}) {
    const router = useRouter();
    const [isFetching, setIsFetching] = useState(false);
    const { update } = useSession();
    const form = useForm<z.infer<typeof EmailValidation>>({
        resolver: zodResolver(EmailValidation),
        defaultValues: {
            code:
                session?.user?.name && field == "name" ? session.user.name : ""
        }
    });

    async function onSubmit(values: z.infer<typeof EmailValidation>) {
        setIsFetching(true);
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                field: field,
                value: values.code,
                email: session?.user?.email
            })
        });

        await update();

        setIsFetching(false);
        if (!response.ok) {
            const { error, details } = await response.json();
            details ? ToastMessage(details) : ToastMessage(error);
            return;
        }

        ToastMessage("Update Successful", { variant: "success" });

        router.refresh();
    }

    const fld = field;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" flex  gap-4 rounded-md"
            >
                <div className=" flex w-96 flex-col gap-2">
                    <FormLabel className=" text-content">
                        {field == "name" ? "Username" : "Profile Picture"}
                    </FormLabel>
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem className=" flex w-full flex-col  ">
                                <div className=" flex gap-4 ">
                                    <FormControl>
                                        <Input
                                            type="text"
                                            className=" text-accent-2"
                                            placeholder={
                                                fld == "name" ? "Name" : "URL"
                                            }
                                            {...field}
                                        />
                                    </FormControl>
                                    <Button
                                        className=" w-fit self-end"
                                        disabled={isFetching}
                                        type="submit"
                                    >
                                        Update
                                    </Button>
                                </div>
                                <FormMessage className=" text-message-error" />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
}

FormUpdateUser.propTypes = {
    type: PropTypes.oneOf(["email"])
};
