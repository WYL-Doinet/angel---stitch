import { config } from "@/config/configuration";
import { getFetcher } from "@/utils/server/fetcher";

export async function GET() {
    try {
        const url = config.api.baseApiUrl + '/users/me/relationship/events'
        const data = await getFetcher({ url })
        return Response.json(data)
    } catch (error: unknown) {
        if (error instanceof Response) {
            const data = await error.json()
            return Response.json(data, { status: error.status })
        }
        return Response.json(undefined, { status: 500 })
    }
}