import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import { BaseError, RequestErrorType, UpdateFollowStrField } from "@/src/types";

const unfollow = (options: UpdateFollowStrField) => {
    const statement = sql`
    DELETE FROM followers 
        WHERE self = ${options.self} AND follow = ${options.follow};
    `;

    return {
        query: statement,
        statement: statement
    };
};

export async function UnFollowUsers(
    options: UpdateFollowStrField
): Promise<BaseError | null> {
    const generatedQuery = unfollow(options);
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
