import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import { BaseError, LikeXInput, RequestErrorType } from "@/src/types";
import { post_likes, users } from "../../schema";

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

export async function likeX(options: LikeXInput): Promise<BaseError | null> {
    const generatedQuery = generateLikePost(options);

    try {
        await dzClient.execute(generatedQuery.query);
        console.log(options);
        return null;
    } catch (error) {
        console.log(error);

        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}
