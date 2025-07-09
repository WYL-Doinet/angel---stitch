import { config } from "@/config/configuration";
import { postFetcher } from "@/utils/server/fetcher";
import { type NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
    const body = await request.json();
    try {
        const url = config.api.baseApiUrl + '/users/me/relationship';
        const data = await postFetcher({ url, body, method: "PATCH" })
        return Response.json(data)
    } catch (error) {
        if (error instanceof Response) {
            const data = await error.json()
            return Response.json(data, { status: error.status })
        }
        return Response.json(undefined, { status: 500 })
    }
}