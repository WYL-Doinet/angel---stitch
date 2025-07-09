import { config } from "@/config/configuration"
import SWRProvider from "@/provider/swr-provider"
import { User } from "@/types"
import { getFetcher } from "@/utils/server/fetcher"
import { redirect } from "next/navigation"
import { SWRConfiguration } from "swr"

export const dynamic = 'force-dynamic'

type InitialProps = {
    user: User
}

const initialProps = async (): Promise<InitialProps> => {
    const url = config.api.baseApiUrl + '/users'
    const data = await getFetcher({ url })
    return {
        user: data.user
    }
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
    try {
        const { user } = await initialProps();

        if (user.relationshipId !== null) {
            return redirect('/home')
        }

        const value: SWRConfiguration = {
            fallback: {
                '/user': user
            }
        }

        return <SWRProvider value={value} >{children}</SWRProvider>
    } catch (error: unknown) {
        if (error instanceof Response) {
            return redirect(`/error?status=${error.status}`)
        }
        return redirect(`/error?status=${500}`)
    }
}

export default Layout