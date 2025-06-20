import { config } from "@/config/configuration";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const pathName = request.nextUrl.pathname;
    const body = await request.json();
    const url = config.api.baseApiUrl + pathName

    return NextResponse.json({ success: true }, { status: 201 })
}