"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { EmailRegistration } from "@/src/types";
import { useForm } from "react-hook-form";
import { ToastMessage } from "@/src/services/toast/toast";
import { useSearchParams } from "next/navigation";

export function FormSignIn() {
  const form = useForm<z.infer<typeof EmailRegistration>>({
    resolver: zodResolver(EmailRegistration),
    defaultValues: {
      email: ""
    }
  });

  const param = useSearchParams();
  useEffect(() => {
    if (!param) return;
    const error = param.get("error");
    if (error) {
      ToastMessage(error);
    }
  }, []);

  async function onSubmit(values: z.infer<typeof EmailRegistration>) {
    const email = values.email;
    localStorage.setItem("atlas-email", email);
    try {
      await signIn("email", {
        email,
        redirect: true,
        callbackUrl: `${window.location.origin}/home`
      });
    } catch (error) {
      //TODO toast
      ToastMessage("form error");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 rounded-md "
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" flex flex-col items-center space-y-4 ">
              <FormLabel className=" text-xl font-bold text-content">
                Hello !
              </FormLabel>
              <FormLabel
                className=" mt-[1rem !important] text-md 
                            mb-4 max-w-[90%] text-center text-accent-2"
              >
                Use you email or an other service to continue
              </FormLabel>

              <FormControl>
                <Input
                  type="email"
                  className=" text-accent-2"
                  placeholder="test@test.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className=" text-message-error" />
            </FormItem>
          )}
        />

        <Button className=" w-full">
          <Mail className="mr-2 h-4 w-4" /> Login with Email
        </Button>
      </form>
    </Form>
  );
}
