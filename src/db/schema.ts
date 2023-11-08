import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    serial
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { AdapterAccount } from "next-auth/adapters";

// AUTH
export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name").unique(),
    email: text("email").unique().notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image").default(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM4TfipskFLoycix3JSNW7DbUIkzdJoNsk6m4XpVtEunqZGil1nwWeZlhsBzbUqF_AdA0&usqp=CAU"
    ),
    created_at: timestamp("created_at").default(sql`now()`)
});

export const reservedName = pgTable("reservedName", {
    id: serial("id").primaryKey(),
    name: text("name").unique(),
    user_email: text("user_email")
        .notNull()
        .references(() => users.email, { onDelete: "cascade" }),
    created_at: timestamp("created_at").default(sql`now()`)
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state")
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId)
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull()
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull()
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token)
    })
);

// App
export const followers = pgTable(
    "followers",
    {
        self: text("self")
            .notNull()
            .references(() => users.name, {
                onDelete: "cascade",
                onUpdate: "cascade"
            }),
        follow: text("follow")
            .notNull()
            .references(() => users.name, {
                onDelete: "cascade",
                onUpdate: "cascade"
            }),
        created_at: timestamp("created_at").default(sql`now()`)
    },
    (followers) => ({
        compoundKey: primaryKey(followers.self, followers.follow)
    })
);

export const posts = pgTable("posts", {
    id: text("id").primaryKey(),
    reference: text("reference"),
    owner: text("owner")
        .notNull()
        .references(() => users.name, {
            onUpdate: "cascade"
        }),
    content: text("content").notNull(),
    likes: integer("likes").default(0),
    comments: integer("comments").default(0),
    created_at: timestamp("created_at").default(sql`now()`)
});

export const postsRelations = relations(posts, ({ one }) => ({
    reference: one(posts, {
        fields: [posts.reference],
        references: [posts.id]
    })
}));

export const media = pgTable("media", {
    id: text("id").primaryKey(),
    link: text("link").notNull(),
    created_at: timestamp("created_at").default(sql`now()`)
});

export const post_media = pgTable(
    "post_media",
    {
        post_id: text("post_id")
            .notNull()
            .references(() => posts.id),
        media_id: text("media_id")
            .notNull()
            .references(() => media.id)
    },
    (post_media) => ({
        compoundKey: primaryKey(post_media.post_id, post_media.media_id)
    })
);

export const post_likes = pgTable(
    "post_likes",
    {
        user_id: text("user_id")
            .notNull()
            .references(() => users.id),
        post_id: text("post_id")
            .notNull()
            .references(() => posts.id)
    },
    (post_likes) => ({
        compoundKey: primaryKey(post_likes.user_id, post_likes.post_id)
    })
);
