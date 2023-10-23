import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
    BaseError,
    GetUserType,
    RequestErrorType,
    UserType
} from "@/src/types";

const getByField = (options: GetUserType["input"]) => {
    const statement = sql`
        SELECT 
            name,email
            ,image,
            created_at
        FROM "user"
        WHERE ${sql.raw(options.field)} = ${options.value}
    `;

    return {
        query: statement,
        statement: statement
    };
};

export async function getUsers(
    options: GetUserType["input"]
): Promise<GetUserType["output"] | BaseError | null> {
    if (!options.value) return null;
    const generatedQuery = getByField(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);

        return [result[0] as UserType];
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}
