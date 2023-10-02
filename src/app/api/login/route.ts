// import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log(request.body);

    return NextResponse.json({
        token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC50diIsImlkIjoyMjYsInVzZXJfdGFnIjoiQGFkbWluVHYiLCJzZXNzaW9uX2lkIjozNDMsImlhdCI6MTY5NjEzMDk4NywiZXhwIjoxNjk2MTMyMTg3fQ.GgWYS4yYJ4Iah1rBDi6Ubn9uRAJvhmf65ED5pZHhwMonBy3d-U-iPLAycnhxOsaLtiAVULX-5RNW8KicekJzbGgAvY9ePOBeilm_3JaLwodiJI-q3TEYnFAjr5fRu0f6h9m8x6s73zTzDeckmChkKHq_xNPAI9T9g54yQ83R1L3c_9l17CVkoXE3PBajO8pNttHuDnRCjjMIz24yiB2PIgij_kgXFTahONenVJBQNTBICXBRfiIkP6VkyXCny_th_GKKMyWVaV6rmQxmBnhzq55LinuNUhfCQNIBqfgTv_2rGahuWe9HOKIFEyzk5lFO4Ar6IFCk_BS_vQ4TYVOnpQ"
    });
}
