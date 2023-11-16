import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
  BaseError,
  GetUserInput,
  RequestErrorType,
  SQLInterfaceOptions,
  UserType
} from "@/src/types";
import { followers, users } from "@/src/db/schema";

const getByField = (input: GetUserInput) => {
  const statement = sql`
        SELECT 
            u.name,
            u.email,
            u.image,
            u.created_at,
            CASE WHEN f2.self IS NOT NULL THEN true ELSE false END as following 
        FROM ${users} u
        LEFT JOIN ${followers} f2 ON f2.self = ${input.self}
            AND u.name = f2.follow
        WHERE ${sql.raw(input.field)} = ${input.value}
    `;

  return {
    query: statement,
    statement: statement
  };
};

const getAll = (input: GetUserInput) => {
  const statement = sql`
    SELECT 
        u.name,
        u.email,
        u.image,
        u.created_at,
        CASE WHEN f2.self IS NOT NULL THEN true ELSE false END as following
    FROM "user" u
    LEFT JOIN ${followers} f2 ON f2.self = ${input.self}
        AND u.name = f2.follow
        
    `;

  return {
    query: statement,
    statement: statement
  };
};

interface GetUsersProps {
  input: GetUserInput;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}
export async function getUsers({
  input,
  options
}: GetUsersProps): Promise<UserType[] | BaseError | null> {
  if (!input.value || input.value == "")
    return {
      error: "Empty string value",
      details: ""
    };

  if (options && options.mock) return options.mock.mockValue as UserType[];
  const generatedQuery = getByField(input);

  try {
    const result = await dzClient.execute(generatedQuery.query);
    const user = transformUsers(result);
    return user;
  } catch (error) {
    return {
      error: RequestErrorType.DB_QUERY_FAILED,
      details: String(error)
    };
  }
}

export async function getAllUsers({
  input,
  options
}: GetUsersProps): Promise<UserType[] | BaseError> {
  if (!input.value && input.field != "all")
    return {
      error: "Incorrect input combination",
      details: "Missing value when field in not 'all'"
    };

  if (options && options.mock) return options.mock.mockValue as UserType[];
  const generatedQuery = getAll(input);

  try {
    const result = await dzClient.execute(generatedQuery.query);
    const users = transformUsers(result);

    return users;
  } catch (error) {
    return {
      error: RequestErrorType.DB_QUERY_FAILED,
      details: String(error)
    };
  }
}

function transformUsers(data: Record<string, unknown>[]): UserType[] {
  return data.map((record) => {
    const transformedRecord: UserType = {
      id: record.id as string,
      name: record.name as string,
      email: record.email as string,
      image: record.image as string,
      created_at: new Date(record.created_at as string),
      following: record.following as boolean
    };
    return transformedRecord;
  });
}
