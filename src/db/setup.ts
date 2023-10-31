import { sql } from "drizzle-orm";
// more module info:   https://www.typescriptlang.org/docs/handbook/2/modules.html
import { dzClient } from "./indexc.js";

const PostLikeInsertTrigger = sql`
    CREATE OR REPLACE FUNCTION after_like_insert_function()
    RETURNS TRIGGER AS $$
    BEGIN
        UPDATE posts
        SET likes = likes + 1
        WHERE id = NEW.post_id;
        RETURN NEW; 
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS after_like_insert 
    ON post_likes;

    CREATE TRIGGER after_like_insert
    AFTER INSERT ON post_likes
    FOR EACH ROW
    EXECUTE FUNCTION after_like_insert_function();
`;

const PostReplyInsertTrigger = sql`
    CREATE OR REPLACE FUNCTION after_reply_insert_function()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.reference IS NOT NULL THEN
            UPDATE posts
            SET comments = comments + 1 
            WHERE id = NEW.reference;
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS after_reply_insert 
    ON posts;

    CREATE TRIGGER after_reply_insert
    AFTER INSERT ON posts
    FOR EACH ROW
    EXECUTE FUNCTION after_reply_insert_function();
`;

const PostLikeDeleteTrigger = sql`
    CREATE OR REPLACE FUNCTION after_like_delete_function()
    RETURNS TRIGGER AS $$
    BEGIN
        IF EXISTS (SELECT id FROM posts WHERE id = OLD.post_id) THEN
            UPDATE posts
            SET likes = likes - 1 
            WHERE id = OLD.post_id;
        END IF;
        RETURN OLD; 
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS after_like_delete 
    ON post_likes;

    CREATE TRIGGER after_like_delete
    AFTER DELETE ON post_likes
    FOR EACH ROW
    EXECUTE FUNCTION after_like_delete_function();
`;

export const SETUP_QUERIES = [
    PostLikeInsertTrigger,
    PostLikeDeleteTrigger,
    PostReplyInsertTrigger
];

async function main() {
    console.log("SetUp started");

    for (const query of SETUP_QUERIES) {
        await dzClient.execute(query);
    }

    console.log("SetUp ended");
    process.exit(0);
}

main().catch((err) => {
    console.log(err);
    process.exit(0);
});
