import { config } from "@/config/configuration";
import { postFetcher } from "@/utils/server/fetcher";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    try {
        const url = config.api.baseApiUrl + '/auth/sign-in';
        const data = await postFetcher({ url, body })
        const response = NextResponse.json(data)
        response.cookies.set(config.cookie.sessionCookieName, data.accessToken, config.cookie.options)
        return response;
    } catch (error) {
        if (error instanceof Response) {
            const data = await error.json()
            return NextResponse.json(data, { status: error.status })
        }
        return NextResponse.json(undefined, { status: 500 })
    }
}