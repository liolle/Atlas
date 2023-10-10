import { QuerySignUP } from "@/src/db/portal";
import { SignUpType } from "@/src/types";
import { RequestErrorType } from "@/src/error";
import { hashPassword } from "@/src/lib/utils";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, provider, password, username } = body as SignUpType;

    if (
        !email ||
        !provider ||
        !username ||
        (!password && provider == "credential")
    ) {
        return Response.json(
            { message: RequestErrorType.API_MISSING_ARG },
            {
                status: 400
            }
        );
    }

    const hashedPassword = await hashPassword(password);

    try {
        const result = await QuerySignUP({
            email: email,
            provider: provider,
            password: hashedPassword,
            username: username
        });

        const { error } = result;

        if (error) {
            return Response.json(result, {
                status: 400
            });
        }

        return Response.json(result, {
            status: 200
        });
    } catch (error) {
        return Response.json(
            { message: RequestErrorType.API_REQUEST_FAILED },
            {
                status: 400
            }
        );
    }
}
