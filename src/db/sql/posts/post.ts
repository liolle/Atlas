/* eslint-disable @typescript-eslint/no-unused-vars */
import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
  APIMessage,
  AddPostInput,
  BaseError,
  RequestErrorType,
  SQLInterfaceOptions
} from "@/src/types";
import { posts } from "@/src/db/schema";

const generatePost = (options: AddPostInput) => {
  const statement = sql`
        INSERT INTO ${posts} (id,content,owner)
        VALUES (${options.id},${options.content},${options.owner})
        RETURNING id
    `;

  const StatementWithRef = sql`
        INSERT INTO ${posts} (id,content,owner ,reference)
        VALUES (${options.id},${options.content},${options.owner},${options.reference})
        RETURNING id
    `;

  return {
    query: options.reference ? StatementWithRef : statement,
    statement: options.reference ? StatementWithRef : statement
  };
};

interface AddPostProps {
  input: AddPostInput;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export async function addPost({
  input,
  options
}: AddPostProps): Promise<BaseError | APIMessage> {
  if (input.reference == "")
    return {
      error: "Empty string reference",
      details: ""
    };

  if (options && options.mock) return options.mock.mockValue as APIMessage;

  const generatedQuery = generatePost(input);

  try {
    const id = await dzClient.execute(generatedQuery.query);
    return {
      type: "AddPost",
      message: "Post added successfully",
      content: transformUsers(id) as string
    };
  } catch (error) {
    return {
      error: RequestErrorType.DB_QUERY_FAILED,
      details: String(error)
    };
  }
}

function transformUsers(data: Record<string, unknown>[]): string | null {
  return data.map((record) => {
    return record.medias as string;
  })[0];
}
