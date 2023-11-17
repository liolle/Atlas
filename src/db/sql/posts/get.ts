/* eslint-disable @typescript-eslint/no-unused-vars */
import { dzClient } from "@/src/db/index";
import {
  BaseError,
  GetPostInput,
  PostType,
  RequestErrorType,
  SQLInterfaceOptions
} from "@/src/types";
import { sql } from "drizzle-orm";
import { media, post_likes, post_media, posts, users } from "@/src/db/schema";

const getByField = (options: GetPostInput) => {
  const statement = sql`
    SELECT 
        posts.id,
        posts.reference,
        posts.owner,
        users.image,
        posts.content,
        posts.comments,
        posts.likes,
        posts.created_at,
        EXISTS (
            SELECT 1 
            FROM ${post_likes} post_likes
            WHERE post_likes.post_id = posts.id AND post_likes.user_id = (
                SELECT id FROM ${users} WHERE name = ${options.self}
            )
        ) AS liked,
        STRING_AGG(media.link, ',') AS medias
    FROM ${posts} posts 
    LEFT JOIN ${users} users ON users.name = posts.owner 
    LEFT JOIN ${post_media} post_media ON post_media.post_id = posts.id
    LEFT JOIN ${media} media ON media.id = post_media.media_id
    WHERE posts.${sql.raw(options.field)} = ${options.value}
    GROUP BY posts.id, posts.reference, posts.owner, users.image, posts.content, posts.comments, posts.likes, posts.created_at
    ORDER BY posts.created_at DESC;
    
`;

  return {
    query: statement,
    statement: statement
  };
};

const getAll = (options: GetPostInput) => {
  const statement = sql`
        SELECT 
            posts.id,
            posts.reference,
            posts.owner,
            users.image,
            posts.content,
            posts.comments,
            posts.likes,
            posts.created_at,
            EXISTS (
                SELECT 1 
                FROM ${post_likes} post_likes
                WHERE post_likes.post_id = posts.id AND post_likes.user_id = (
                    SELECT id FROM ${users} WHERE name = ${options.self}
                )
            ) AS liked,
            STRING_AGG(media.link, ',') AS medias
        FROM ${posts} posts 
        LEFT JOIN ${users} users ON users.name = posts.owner 
        LEFT JOIN ${post_media} post_media ON post_media.post_id = posts.id
        LEFT JOIN ${media} media ON media.id = post_media.media_id
        WHERE posts.reference = '' OR posts.reference IS NULL
        GROUP BY posts.id, posts.reference, posts.owner, users.image, posts.content, posts.comments, posts.likes, posts.created_at
        ORDER BY posts.created_at DESC;
        
    `;

  return {
    query: statement,
    statement: statement
  };
};

const getAllWithRef = (options: GetPostInput) => {
  const statement = sql`
    SELECT 
        posts.id,
        posts.reference,
        posts.owner,
        users.image,
        posts.content,
        posts.comments,
        posts.likes,
        posts.created_at,
        EXISTS (
            SELECT 1 
            FROM ${post_likes} post_likes
            WHERE post_likes.post_id = posts.id AND post_likes.user_id = (
                SELECT id FROM ${users} WHERE name = ${options.self}
            )
        ) AS liked,
        STRING_AGG(media.link, ',') AS medias
    FROM ${posts} posts 
    LEFT JOIN ${users} users ON users.name = posts.owner 
    LEFT JOIN ${post_media} post_media ON post_media.post_id = posts.id
    LEFT JOIN ${media} media ON media.id = post_media.media_id
    WHERE posts.reference = ${options.reference} OR posts.id = ${options.reference}
    GROUP BY posts.id, posts.reference, posts.owner, users.image, posts.content, posts.comments, posts.likes, posts.created_at
    ORDER BY posts.created_at DESC;
    
`;

  return {
    query: statement,
    statement: statement
  };
};

interface GetPostProps {
  input: GetPostInput;
  options?: {
    mock?: SQLInterfaceOptions;
  };
}

export async function getPost({
  input,
  options
}: GetPostProps): Promise<PostType[] | BaseError> {
  if (input.self == "")
    return {
      error: "Empty string self",
      details: ""
    };

  if (input.value == "")
    return {
      error: "Empty string value",
      details: ""
    };

  if (input.reference == "")
    return {
      error: "Empty string reference",
      details: ""
    };

  if (options && options.mock) return options.mock.mockValue as PostType[];
  const generatedQuery = getByField(input);

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

export async function getAllPosts({
  input,
  options
}: GetPostProps): Promise<PostType[] | BaseError> {
  if (input.self == "")
    return {
      error: "Empty string self",
      details: ""
    };

  if (input.value == "")
    return {
      error: "Empty string value",
      details: ""
    };

  if (input.reference == "")
    return {
      error: "Empty string reference",
      details: ""
    };

  if (options && options.mock) return options.mock.mockValue as PostType[];

  const generatedQuery = input.reference ? getAllWithRef(input) : getAll(input);

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
    const medias = record.medias as string;
    const files = medias != null ? medias.split(",") : [];
    const transformedRecord: PostType = {
      id: record.id as string,
      reference: (record.reference as string) || "",
      owner: record.owner as string,
      image: record.image as string,
      content: record.content as string,
      comments: record.comments as number,
      likes: record.likes as number,
      liked: record.liked as boolean,
      created_at: new Date(record.created_at as string),
      files: files
    };

    return transformedRecord;
  });
}
