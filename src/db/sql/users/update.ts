/* eslint-disable @typescript-eslint/no-unused-vars */
import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
  APIMessage,
  BaseError,
  RequestErrorType,
  SQLInterfaceOptions,
  UpdateUserInput
} from "@/src/types";
import { users } from "@/src/db/schema";
import { z } from "zod";

const EmailSchema = z.string().email();

const generate = (options: UpdateUserInput) => {
  const statement = sql`
        UPDATE ${users} SET ${sql.raw(options.field)} = ${
          options.value
        } WHERE email = ${options.email}
        RETURNING id;
    `;

  return {
    query: statement,
    statement: statement
  };
};

interface UpdateUserProps {
  input: UpdateUserInput;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export default async function updateUser({
  input,
  options
}: UpdateUserProps): Promise<BaseError | APIMessage> {
  try {
    EmailSchema.parse(input.email);
  } catch (error) {
    return {
      error: "Invalid email format",
      details: String(error)
    };
  }

  if (input.value == "")
    return {
      error: "Empty string value",
      details: ""
    };

  if (options && options.mock)
    return options.mock.mockValue as unknown as APIMessage;

  const generatedQuery = generate(input);

  try {
    await dzClient.execute(generatedQuery.query);
    return {
      type: "UpdateUser",
      message: "Update successful",
      content: ""
    };
  } catch (error) {
    return {
      error: RequestErrorType.DB_QUERY_FAILED,
      details: String(error)
    };
  }
}
