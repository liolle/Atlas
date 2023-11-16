"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { EmailValidation, FormValidationType } from "@/src/types";
import { UseFormReturn, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToastMessage } from "@/src/services/toast/toast";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FormEmailValidation({ type, provider }: FormValidationType) {
  const router = useRouter();

  const [email, setEmail] = useState("");

  let DisplayForm = (
    <div>
      <span className=" flex items-center justify-center text-lg font-bold text-content">
        Unsupported Validation type
      </span>
    </div>
  );

  useEffect(() => {
    const email = localStorage.getItem("atlas-email");
    if (!email) return;

    setEmail(email);
  }, []);

  const form = useForm<z.infer<typeof EmailValidation>>({
    resolver: zodResolver(EmailValidation),
    defaultValues: {
      code: ""
    }
  });

  const sendEmail = async () => {
    await signIn("email", {
      email,
      redirect: true,
      callbackUrl: `${window.location.origin}/home`
    });
  };

  async function onSubmit(values: z.infer<typeof EmailValidation>) {
    const code = values.code;
    localStorage.removeItem("atlas-email");
    const formatted_email = (email as string).replace("@", "%40");
    try {
      const callbackUrl = `/api/auth/callback/email?callback=http%3A%2F%2Flocalhost%3A3000%2Fhome&token=${code}&email=${formatted_email}`;
      router.replace(callbackUrl);
    } catch (error) {
      //TODO toast
      ToastMessage(error as string);
    }
  }
  switch (type) {
    case "email":
      DisplayForm = (
        <EmailVerification
          form={form}
          onSubmit={onSubmit}
          sendEmail={sendEmail}
        />
      );
      break;

    default:
      return DisplayForm;
  }

  return DisplayForm;
}

const EmailVerification = ({
  form,
  onSubmit // sendEmail
}: {
  form: UseFormReturn<
    {
      code: string;
    },
    unknown,
    undefined
  >;
  onSubmit: (value: z.infer<typeof EmailValidation>) => Promise<void>;
  sendEmail: () => void;
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 rounded-md "
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className=" flex flex-col items-center space-y-4 ">
              <FormControl>
                <Input type="text" className="" placeholder="" {...field} />
              </FormControl>
              <FormMessage className=" text-message-error" />
            </FormItem>
          )}
        />

        <Button className=" w-full" type="submit">
          Validate email
        </Button>
      </form>
    </Form>
  );
};
