import { dzClient } from "@/src/db/index";
import {
    APIMessage,
    SignUpType,
    UserTypes,
    RequestErrorType
} from "@/src/types";
import generate from "./sql";
import { generateAccountID, generateUserID } from "@/src/lib/utils";

export default async function SIGNUP(options: SignUpType): Promise<APIMessage> {
    const user_id = await generateUserID();
    const account_id = await generateAccountID();
    const type: UserTypes = "user";
    const generatedQuery = generate(
        options.email,
        options.provider,
        options.password,
        user_id,
        account_id,
        options.username,
        type
    );

    try {
        await dzClient.execute(generatedQuery.query);

        return {
            error: "",
            message: ""
        };
    } catch (error) {
        return {
            error: RequestErrorType.DB_QUERY_FAILED,
            message: ""
        };
    }
}
