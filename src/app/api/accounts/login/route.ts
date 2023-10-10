import { QueryLogin } from "@/src/db/portal";
import { RequestErrorType } from "@/src/error";
import { comparePassword } from "@/src/lib/utils";
import { LoginReturnType, LoginType, RawLoginReturnType } from "@/src/types";

const stripPassword = (content: RawLoginReturnType): LoginReturnType => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...strippedContent } = content;
    return strippedContent;
};

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body as LoginType;

    if (!email || !password) {
        return Response.json(
            { message: RequestErrorType.API_MISSING_ARG },
            {
                status: 400
            }
        );
    }

    try {
        const result = await QueryLogin({
            email: email,
            password: password
        });

        const { error, content } = result as {
            error: string;
            content: RawLoginReturnType;
        };

        if (error || !content) {
            return Response.json(result, {
                status: 400
            });
        }

        const passwordCompare = await comparePassword(
            password,
            content.password
        );

        if (!passwordCompare) {
            return Response.json(
                {
                    error: RequestErrorType.API_AUTH_ERROR,
                    content: null
                },
                {
                    status: 400
                }
            );
        }

        return Response.json(
            {
                error: result.error,
                content: stripPassword(content)
            },
            {
                status: 200
            }
        );
    } catch (error) {
        return Response.json(
            { message: RequestErrorType.API_REQUEST_FAILED },
            {
                status: 400
            }
        );
    }
}
