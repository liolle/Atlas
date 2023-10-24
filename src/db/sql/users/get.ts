import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
    BaseError,
    GetUserType,
    LinkAction,
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

const getAll = () => {
    const statement = sql`
        SELECT 
            id,
            name,email
            ,image,
            created_at
        FROM "user"
        
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
                        link: `/api/users/${row.name}?action=follow`
                    } as LinkAction,
                    {
                        type: "unfollowUser",
                        link: `/api/users/${row.name}?action=unfollowUser`
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

export async function getAllUsers(): Promise<
    GetUserType["output"][] | BaseError | null
> {
    const generatedQuery = getAll();

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
                    {
                        type: "followUser",
                        link: `/api/users/${row.name}?action=follow`
                    } as LinkAction,
                    {
                        type: "unfollowUser",
                        link: `/api/users/${row.name}?action=unfollowUser`
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

function transformUsers(data: Record<string, unknown>[]): UserType[] {
    return data.map((record) => {
        const transformedRecord: UserType = {
            id: record.id as string,
            name: record.name as string,
            email: record.email as string,
            image: record.image as string,
            created_at: new Date(record.created_at as string)
        };
        return transformedRecord;
    });
}
