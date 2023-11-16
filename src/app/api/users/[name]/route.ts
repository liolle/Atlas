import { GetUsers } from "@/src/db/portal";
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
  const session = await getServerSession();
  try {
    const name = context.params.name;

    if (!name) {
      baseResponse.error = {
        error: RequestErrorType.API_MISSING_ARG,
        details: "Missing name"
      };

      return NextResponse.json(baseResponse, { status: 409 });
    }

    const result = await GetUsers({
      input: {
        self: session?.user?.name || " ",
        field: "name",
        value: name
      },
      APIResponse: baseResponse
    });

    if (result.error) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: RequestErrorType.API_REQUEST_FAILED,
        details: String(error)
      },
      { status: 500 }
    );
  }
}
