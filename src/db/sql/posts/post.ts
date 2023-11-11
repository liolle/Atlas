import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import { AddPostInput, BaseError, RequestErrorType } from "@/src/types";
import { posts } from "@/src/db/schema";

const generatePost = (options: AddPostInput) => {
    const statement = sql`
        INSERT INTO ${posts} (id,content,owner)
        VALUES (${options.id},${options.content},${options.owner})
    `;

    const StatementWithRef = sql`
    INSERT INTO ${posts} (id,content,owner ,reference)
    VALUES (${options.id},${options.content},${options.owner},${options.reference})
    `;

    return {
        query: options.reference ? StatementWithRef : statement,
        statement: options.reference ? StatementWithRef : statement
    };
};

export async function addPost(
    options: AddPostInput
): Promise<BaseError | null> {
    const generatedQuery = generatePost(options);

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
