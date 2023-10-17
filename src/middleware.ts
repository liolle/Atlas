import { withAuth } from "next-auth/middleware";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function middleware(req) {},
    {
        callbacks: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            authorized: async ({ req, token }) => {
                return !!token;
            }
        }
    }
);

export const config = { matcher: ["/home"] };
