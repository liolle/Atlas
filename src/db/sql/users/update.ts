import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import { BaseError, RequestErrorType, UpdateUserType } from "@/src/types";
import { users } from "@/src/db/schema";

const generate = (options: UpdateUserType["input"]) => {
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

export default async function updateUser(
    options: UpdateUserType["input"]
): Promise<BaseError | null> {
    const generatedQuery = generate(options);

    try {
        await dzClient.execute(generatedQuery.query);
        return null;
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}
