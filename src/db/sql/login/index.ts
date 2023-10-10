import { dzClient } from "@/src/db/index";
import { APIContent, LoginType, RawLoginReturnType } from "@/src/types";
import generate from "./sql";
import { RequestErrorType } from "@/src/error";

export default async function LOGIN(options: LoginType): Promise<APIContent> {
    const generatedQuery = generate(options.email);

    try {
        const result = await dzClient.execute(generatedQuery.query);

        const data = result[1][0] as RawLoginReturnType;

        return {
            error: "",
            content: data as RawLoginReturnType
        };
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            content: null
        };
    }
}
