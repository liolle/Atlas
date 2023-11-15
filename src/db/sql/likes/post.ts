import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import {
    APIMessage,
    BaseError,
    LikeXInput,
    RequestErrorType,
    SQLInterfaceOptions
} from "@/src/types";
import { post_likes, users } from "@/src/db/schema";

const generateLikePost = (options: LikeXInput) => {
    const statement = sql`
        DO $$
        DECLARE
            row_exists NUMERIC;
            u_self TEXT;
        BEGIN
        
            SELECT id INTO u_self FROM ${users} WHERE ${
                users.name
            }  = '${sql.raw(options.name)}' ;
        
            SELECT 1 
            INTO row_exists 
            FROM ${post_likes}  
            WHERE user_id = u_self AND post_id = '${sql.raw(options.id)}';
        
            IF (row_exists IS NULL) THEN
                INSERT INTO  ${post_likes} (user_id, post_id) VALUES( u_self , '${sql.raw(
                    options.id
                )}' ); 
            ELSE
                DELETE FROM ${post_likes}  WHERE user_id = u_self AND post_id = '${sql.raw(
                    options.id
                )}';
            END IF;
        END;     
        $$
    `;

    return {
        query: statement,
        statement: statement
    };
};

interface LikeX {
    input: LikeXInput;
    options?: {
        mock?: SQLInterfaceOptions;
    };
}

export async function likeX({
    input,
    options
}: LikeX): Promise<BaseError | APIMessage> {
    if (input.id == "")
        return {
            error: "Empty string id",
            details: ""
        };

    if (input.name == "")
        return {
            error: "Empty string name",
            details: ""
        };

    if (options && options.mock) return options.mock.mockValue as APIMessage;

    const generatedQuery = generateLikePost(input);

    try {
        await dzClient.execute(generatedQuery.query);
        return {
            type: "Like",
            message: ""
        };
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}
