import { GetFollows, UpdateFollows } from "@/src/db/portal";
import { APIResponse, APIVersion, RequestErrorType } from "@/src/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
interface RouteContext {
  params: { name: string };
}
export async function GET(request: NextRequest, context: RouteContext) {
  const baseResponse: APIResponse = {
    self: request.nextUrl.href,
    version: APIVersion
  };
  try {
    const name = context.params.name;

    const field = request.nextUrl.searchParams.get("field") as
      | "self"
      | "follow";

    const session = await getServerSession();

    if (!name || !field) {
      baseResponse.error = {
        error: RequestErrorType.API_MISSING_ARG,
        details: "Require name and field"
      };

      return NextResponse.json(baseResponse, { status: 409 });
    }

    if (field != "follow" && field != "self") {
      baseResponse.error = {
        error: RequestErrorType.API_UNSUPPORTED_ACTION,
        details: "field should be set to self or follow"
      };

      return NextResponse.json(baseResponse, { status: 401 });
    }

    const result = await GetFollows({
      input: {
        field: field,
        value: name,
        self: session?.user?.name || " "
      },
      APIResponse: baseResponse
    });

    if (result.error) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    baseResponse.error = {
      error: RequestErrorType.API_REQUEST_FAILED,
      details: String(error)
    };

    return NextResponse.json(baseResponse, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  const baseResponse: APIResponse = {
    self: request.nextUrl.href,
    version: APIVersion
  };

  try {
    const name = context.params.name;
    const action = request.nextUrl.searchParams.get("action") as
      | "follow"
      | "unfollow";
    const session = await getServerSession();

    if (!session || !session.user || !session.user.name) {
      baseResponse.error = {
        error: RequestErrorType.API_AUTH_ERROR,
        details: "Need connection"
      };

      return NextResponse.json(baseResponse, { status: 401 });
    }

    if (!name || !action) {
      return NextResponse.json(
        {
          error: RequestErrorType.API_MISSING_ARG,
          details: "Require name and action"
        },
        { status: 409 }
      );
    }

    if (action != "follow" && action != "unfollow") {
      baseResponse.error = {
        error: RequestErrorType.API_UNSUPPORTED_ACTION,
        details: "action should be set to follow or unfollow"
      };

      return NextResponse.json(baseResponse, { status: 401 });
    }

    const result = await UpdateFollows({
      input: {
        type: action,
        self: session.user.name,
        follow: name
      },
      APIResponse: baseResponse
    });

    if (result.error) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    baseResponse.error = {
      error: RequestErrorType.API_REQUEST_FAILED,
      details: String(error)
    };

    return NextResponse.json(baseResponse, { status: 500 });
  }
}
