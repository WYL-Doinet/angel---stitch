import { config } from "@/config/configuration";
import { postFetcher } from "@/utils/server/fetcher";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const pathName = request.nextUrl.pathname
    try {
        // const data = await postFetcher({ url: config.api.baseApiUrl + pathName, body })
        const data = {
            user: {
                relationShipId: null,
                inviteStatus: false,
                loveCode: 'love123'
            },
            accessToken: 'token'
        }
     
        const response = NextResponse.json({ success: true, user: data.user })
        response.cookies.set(config.cookie.sessionCookieName, data.accessToken, config.cookie.options)
        return response;
    } catch (error) {
        if (error instanceof Response) {
            const data = await error.json()
            return NextResponse.json({ success: false, data }, { status: error.status })
        }
    }
}