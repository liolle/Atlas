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
    SELECT ${sql.raw(
        options.field == "follow" ? "self" : "follow"
    )}, image  FROM ${followers} 
    LEFT JOIN ${users} ON ${users.name} = followers.${sql.raw(
        options.field == "follow" ? "self" : "follow"
    )}
    WHERE ${sql.raw(options.field)} = ${options.value}
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
                    {
                        type: "followUser",
                        link: `/api/users/${row.name}/follows?action=follow`
                    } as LinkAction,
                    {
                        type: "unfollowUser",
                        link: `/api/users/${row.name}/follows?action=unfollowUser`
                    } as LinkAction
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
            image: record.image as string
        };
        return transformedRecord;
    });
}
