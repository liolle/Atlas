import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import { BaseError, RequestErrorType, UpdateFollowInput } from "@/src/types";

const follow = (options: UpdateFollowInput) => {
    const statement = sql`
    INSERT INTO followers (self, follow) 
    VALUES (${options.self}, ${options.follow});
    `;

    return {
        query: statement,
        statement: statement
    };
};

export async function FollowUsers(
    options: UpdateFollowInput
): Promise<BaseError | null> {
    const generatedQuery = follow(options);

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
