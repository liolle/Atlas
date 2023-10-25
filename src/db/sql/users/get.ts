import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
    BaseError,
    GetUserType,
    LinkAction,
    RequestErrorType,
    UserType
} from "@/src/types";
import { followers, users } from "../../schema";

const getByField = (options: GetUserType["input"]) => {
    const statement = sql`
        SELECT 
            u.name,
            u.email,
            u.image,
            u.created_at,
            CASE WHEN f2.self IS NOT NULL THEN true ELSE false END as following 
        FROM ${users} u
        LEFT JOIN ${followers} f2 ON f2.self = ${options.self}
            AND u.name = f2.follow
        WHERE ${sql.raw(options.field)} = ${options.value}
    `;

    return {
        query: statement,
        statement: statement
    };
};

const getAll = (options: GetUserType["input"]) => {
    const statement = sql`
    SELECT 
        u.name,
        u.email,
        u.image,
        u.created_at,
        CASE WHEN f2.self IS NOT NULL THEN true ELSE false END as following
    FROM "user" u
    LEFT JOIN ${followers} f2 ON f2.self = '${options.self}' 
        AND u.name = f2.follow
        
    `;

    return {
        query: statement,
        statement: statement
    };
};

export async function getUsers(
    options: GetUserType["input"]
): Promise<GetUserType["output"][] | BaseError | null> {
    if (!options.value) return null;
    const generatedQuery = getByField(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);
        const user = transformUsers(result);
        const ret: {
            data: UserType;
            actions: LinkAction[];
        }[] = user.map((row) => {
            return {
                data: row,
                actions: [
                    {
                        type: "followUser",
                        link: `/api/users/${row.name}/follows?action=follow`
                    } as LinkAction,
                    {
                        type: "unfollowUser",
                        link: `/api/users/${row.name}/follows?action=unfollow`
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

export async function getAllUsers(
    options: GetUserType["input"]
): Promise<GetUserType["output"][] | BaseError | null> {
    const generatedQuery = getAll(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);
        const users = transformUsers(result);
        const ret: {
            data: UserType;
            actions: LinkAction[];
        }[] = users.map((row) => {
            return {
                data: row,
                actions: [
                    row.following
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
