import { config } from "@/config/configuration";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const response = NextResponse.json({ success: true })

    response.cookies.set(config.cookie.sessionCookieName, '', {
        httpOnly: true,
        secure: process.env.APP_ENV === 'production',
        maxAge: 60 * 60 * 24 * 356,
        path: "/",
        sameSite: 'strict',
    })

    return response;
}