import { sql } from "drizzle-orm";
import { dzClient } from "@/src/db/index";
import { AddMediaInput, BaseError, RequestErrorType } from "@/src/types";
import { media, post_media } from "@/src/db/schema";

const generateMedia = (input: AddMediaInput[]) => {
    let buffer = "";
    for (const media of input) {
        buffer += buffer == "" ? "" : " , ";
        buffer += `('${media.id}','${media.link}')`;
    }

    const statement = sql`
        INSERT INTO ${media} (id,link)
        VALUES ${sql.raw(buffer)}
    `;

    return {
        query: statement,
        statement: statement
    };
};

export interface MediaPostLinkInput {
    post_id: string;
    media_id: string;
}

const generateMediaPostLink = (input: MediaPostLinkInput[]) => {
    let buffer = "";
    for (const media of input) {
        buffer += buffer == "" ? "" : ",";
        buffer += `('${media.post_id}','${media.media_id}')`;
    }

    const statement = sql`
        INSERT INTO ${post_media} (post_id,media_id)
        VALUES ${sql.raw(buffer)}
    `;

    return {
        query: statement,
        statement: statement
    };
};

export async function linkPostMedia(
    input: MediaPostLinkInput[]
): Promise<BaseError | null> {
    if (input.length <= 0) return null;

    const generatedQuery = generateMediaPostLink(input);

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

export async function addMedia(
    input: AddMediaInput[]
): Promise<BaseError | null> {
    if (input.length <= 0) return null;

    const generatedQuery = generateMedia(input);

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
