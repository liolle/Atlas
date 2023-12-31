import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const NotProtectedPages = {
  "/": true,
  "/opengraph-image": true,
  "/policy": true
};

export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function middleware(req) {
    const requestHeaders = new Headers(req.headers);
    const page = req.nextUrl.pathname?.split(/[/?]/)[1];
    requestHeaders.set("x-page", page);
    requestHeaders.set("x-path", req.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  },
  {
    callbacks: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      authorized: async ({ req, token }) => {
        if (req.nextUrl.pathname in NotProtectedPages) return true;
        return !!token;
      }
    }
  }
);
