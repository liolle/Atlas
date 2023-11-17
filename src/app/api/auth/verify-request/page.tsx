import React from "react";
import { FormEmailValidation } from "@/src/components/client/Forms/formValidateEmail";
import { AccountProviders, ValidationType } from "@/src/types";

const VerifyRequest = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { type, provider } = searchParams;

  if (!type || !provider) return <></>;
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 bg-bgc ">
      <section className=" flex min-w-[350px] flex-col gap-4 rounded-lg bg-fgc px-8 py-8 shadow-xl">
        <FormEmailValidation
          provider={provider as AccountProviders}
          type={type as ValidationType}
        />
      </section>
    </main>
  );
};

export default VerifyRequest;
