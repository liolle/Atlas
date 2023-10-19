import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function middleware(req) {
        // req.nextUrl.searchParams.currentPage = "test";
        const requestHeaders = new Headers(req.headers);
        const page = req.nextUrl.pathname?.split(/[/?]/)[1];
        requestHeaders.set("x-page", page);

        return NextResponse.next({
            request: {
                // Apply new request headers
                headers: requestHeaders
            }
        });
    },
    {
        callbacks: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            authorized: async ({ req, token }) => {
                return !!token;
            }
        }
    }
);

export const config = { matcher: ["/home", "/profile"] };
