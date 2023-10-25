import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
    BaseError,
    FollowType,
    GetUserFollowType,
    LinkAction,
    RequestErrorType
} from "@/src/types";
import { followers, users } from "../../schema";

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
): Promise<GetUserFollowType["output"] | BaseError | null> {
    if (!options.value) return null;
    const generatedQuery = getByField(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);
        const follows = transformFollowUsers(result);

        const ret: {
            data: FollowType;
            actions: LinkAction[];
        }[] = follows.map((row) => {
            return {
                data: row,
                actions: [
                    !row.following
                        ? ({
                              type: "followUser",
                              link: `/api/users/${row.name}/follows?action=follow`
                          } as LinkAction)
                        : ({
                              type: "unfollowUser",
                              link: `/api/users/${row.name}/follows?action=unfollow`
                          } as LinkAction)
                ]
            };
        });

        return ret;
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
