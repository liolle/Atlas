import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import { BaseError, RequestErrorType, UpdateUserType } from "@/src/types";
import { users } from "../../schema";

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
): Promise<UpdateUserType["output"] | BaseError | null> {
    const generatedQuery = generate(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);
        const { id } = result[0] as { id: number };

        if (!id) return null;

        return [result[0] as { id: number }];
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}
