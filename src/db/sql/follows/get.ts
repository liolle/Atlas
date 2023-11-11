import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
    BaseError,
    FollowType,
    GetUserFollowType,
    RequestErrorType
} from "@/src/types";
import { followers, users } from "@/src/db/schema";

const getByField = (options: GetUserFollowType["input"]) => {
    const statement = sql`
        SELECT 
        f1.${sql.raw(options.field == "follow" ? "self" : "follow")}, 
        u.image, 
        CASE WHEN f2.self IS NOT NULL THEN true ELSE false END as following
    FROM ${followers} f1
    LEFT JOIN ${users} u ON u.name = f1.${sql.raw(
        options.field == "follow" ? "self" : "follow"
    )}
    LEFT JOIN ${followers} f2 ON f2.self = ${
        options.self
    } AND u.name = f2.follow
    WHERE f1.${sql.raw(options.field)} = ${options.value}
    `;

    return {
        query: statement,
        statement: statement
    };
};

export async function getFollow(
    options: GetUserFollowType["input"]
): Promise<FollowType[] | BaseError | null> {
    if (!options.value) return null;
    const generatedQuery = getByField(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);
        const follows = transformFollowUsers(result);
        return follows;
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}

function transformFollowUsers(data: Record<string, unknown>[]): FollowType[] {
    return data.map((record) => {
        const transformedRecord: FollowType = {
            name: (record.follow || record.self) as string,
            image: record.image as string,
            following: record.following as boolean
        };
        return transformedRecord;
    });
}
