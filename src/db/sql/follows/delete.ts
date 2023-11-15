/* eslint-disable @typescript-eslint/no-unused-vars */
import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
    APIMessage,
    BaseError,
    RequestErrorType,
    SQLInterfaceOptions,
    UpdateFollowInput
} from "@/src/types";

const unfollow = (options: UpdateFollowInput) => {
    const statement = sql`
    DELETE FROM followers 
        WHERE self = ${options.self} AND follow = ${options.follow};
    `;

    return {
        query: statement,
        statement: statement
    };
};

interface FollowUsersProps {
    input: UpdateFollowInput;
    options?: {
        mock?: SQLInterfaceOptions;
    };
}

export async function UnFollowUsers({
    input,
    options
}: FollowUsersProps): Promise<BaseError | APIMessage> {
    if (input.self == "")
        return {
            error: "Empty string self",
            details: ""
        };

    if (input.follow == "")
        return {
            error: "Empty string follow",
            details: ""
        };

    if (options && options.mock) return options.mock.mockValue as APIMessage;

    const generatedQuery = unfollow(input);

    try {
        await dzClient.execute(generatedQuery.query);
        return {
            type: "UpdateFollow",
            message: "Update successful",
            content: ""
        };
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}
