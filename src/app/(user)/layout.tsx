import { config } from "@/config/configuration";
import SWRProvider from "@/provider/swr-provider"
import { getFetcher } from "@/utils/server/fetcher";

import { redirect } from "next/navigation";
import { SWRConfiguration } from "swr";

type InitialProps = {
    user: any,
    events: any,
    notes: any,
}

export const dynamic = 'force-dynamic';

const initialProps = async (): Promise<InitialProps> => {
    return {
        user: {
            relationShipId : null,
        },
        events: [],
        notes: [],
    }
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const {user , events, notes} = await initialProps()

    if (user.relationShipId === null) {
        return redirect('/invite')
    }

    const value: SWRConfiguration = {
        fallback: {
            '/user': user,
            '/events':events,
            '/notes': notes,
        }
    }
    return <SWRProvider value={value}>{children}</SWRProvider>
}

export default Layout