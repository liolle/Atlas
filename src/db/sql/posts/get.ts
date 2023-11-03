import { dzClient } from "@/src/db/index";
import {
    BaseError,
    GetPostInput,
    PostType,
    RequestErrorType
} from "@/src/types";
import { sql } from "drizzle-orm";
import { post_likes, posts, users } from "../../schema";

const getByField = (options: GetPostInput) => {
    const statement = sql`
        SELECT 
            p.id,
            p.reference,
            p.owner,
            u.image,
            p.content,
            p.comments,
            p.likes,
            p.created_at,
            CASE WHEN pl.post_id IS NOT NULL THEN true ELSE false END AS liked
        FROM ${posts} p 
        LEFT JOIN ${users} u ON u.name = p.owner
        LEFT JOIN ${users} uself ON uself.name = ${options.self}
        LEFT JOIN ${post_likes} pl ON pl.post_id = p.id AND pl.user_id = uself.id
        WHERE p.${sql.raw(options.field)} = ${options.value}
        ORDER BY p.created_at DESC 
    `;

    return {
        query: statement,
        statement: statement
    };
};

const getAll = (options: GetPostInput) => {
    const statement = sql`
        SELECT 
            p.id,
            p.reference,
            p.owner,
            u.image,
            p.content,
            p.comments,
            p.likes,
            p.created_at,
            CASE WHEN pl.post_id IS NOT NULL THEN true ELSE false END AS liked
        FROM ${posts} p 
        LEFT JOIN ${users} u ON u.name = p.owner 
        LEFT JOIN ${users} uself ON uself.name = ${options.self}
        LEFT JOIN ${post_likes} pl ON pl.post_id = p.id AND pl.user_id = uself.id
        WHERE p.reference = '' OR p.reference IS NULL
        ORDER BY p.created_at DESC 
        
    `;

    return {
        query: statement,
        statement: statement
    };
};

const getAllWithRef = (options: GetPostInput) => {
    const statement = sql`
        SELECT 
            p.id,
            p.reference,
            p.owner,
            u.image,
            p.content,
            p.comments,
            p.likes,
            p.created_at,
            CASE WHEN pl.post_id IS NOT NULL THEN true ELSE false END AS liked
        FROM ${posts} p 
        LEFT JOIN ${users} u ON u.name = p.owner 
        LEFT JOIN ${users} uself ON uself.name = ${options.self}
        LEFT JOIN ${post_likes} pl ON pl.post_id = p.id AND pl.user_id = uself.id
        WHERE p.reference = ${options.reference} OR p.id = ${options.reference}
        ORDER BY p.created_at DESC 
        
    `;

    return {
        query: statement,
        statement: statement
    };
};

export async function getPost(
    options: GetPostInput
): Promise<PostType[] | BaseError | null> {
    if (!options.value) return null;
    const generatedQuery = getByField(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);
        const user = transformUsers(result);
        return user;
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}

export async function getAllPosts(
    options: GetPostInput
): Promise<PostType[] | BaseError | null> {
    const generatedQuery = options.reference
        ? getAllWithRef(options)
        : getAll(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);
        const posts = transformUsers(result);

        return posts;
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}

function transformUsers(data: Record<string, unknown>[]): PostType[] {
    return data.map((record) => {
        const transformedRecord: PostType = {
            id: record.id as string,
            reference: (record.reference as string) || "",
            owner: record.owner as string,
            image: record.image as string,
            content: record.content as string,
            comments: record.comments as number,
            likes: record.likes as number,
            liked: record.liked as boolean,
            created_at: new Date(record.created_at as string)
        };
        return transformedRecord;
    });
}
