import SWRProvider from "@/provider/swr-provider"
import { User } from "@/types"
import { redirect } from "next/navigation"
import { SWRConfiguration } from "swr"

export const dynamic = 'force-dynamic'

type InitialProps = {
    user: User
}

const initialProps = async (): Promise<InitialProps> => {
    return {
        user: {
            relationShipId: null,
            loveCode: 'LOVE1234',
            inviteStatus: false,
        }
    }
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const { user } = await initialProps();
   
    if(user.relationShipId !== null) {
        return redirect('/home')
    }

    const value: SWRConfiguration = {
        fallback: {
            '/user': user
        }
    }

    return <SWRProvider value={value} >{children}</SWRProvider>
}

export default Layout