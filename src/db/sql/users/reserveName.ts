import { sql } from "drizzle-orm";

import { dzClient } from "@/src/db/index";
import { BaseError, RequestErrorType, ReserveNameType } from "@/src/types";

const generate = (options: ReserveNameType["input"]) => {
    const statement = `
        INSERT into reservedName (name,user_email)
        VALUES ('${options.name}','${options.email}')
        RETURNING id;
    `;

    return {
        query: sql.raw(statement),
        statement: statement
    };
};

export default async function ReserveName(
    options: ReserveNameType["input"]
): Promise<ReserveNameType["output"] | BaseError | null> {
    const generatedQuery = generate(options);

    try {
        const result = await dzClient.execute(generatedQuery.query);
        const { id } = result[0] as { id: number };

        if (!id) return null;

        return [result[0] as { id: number }];
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            details: String(error)
        };
    }
}
