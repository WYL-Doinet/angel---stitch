import { config } from "@/config/configuration";
import SWRProvider from "@/provider/swr-provider"
import { getFetcher } from "@/utils/server/fetcher";
import { redirect } from "next/navigation";
import { SWRConfiguration } from "swr";


const initialProps = async (): Promise<any> => {
    const url = config.api.baseApiUrl + '/users/me'
    const data = await getFetcher({ url })
    return {
        user: data.user
    }
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
    try {
        const { user } = await initialProps()

        if (user.relationshipId === null) {
            return redirect('/invite')
        }

        const value: SWRConfiguration = {
            fallback: {
                '/api/users/me': user,
            }
        }

        return <SWRProvider value={value}>{children}</SWRProvider>
    } catch (error: unknown) {
        if (error instanceof Response) {
            return redirect(`/error?status=${error.status}`)
        }
        return redirect(`/error?status=${500}`)
    }
}

export default Layout