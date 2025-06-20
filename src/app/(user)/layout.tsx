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
        user: {},
        events: [],
        notes: [],
    }
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const props = await initialProps()

    if (props.user.relationShipId === null) {
        return redirect('/invite')
    }

    const value: SWRConfiguration = {
        fallback: {
            '/user': props.user,
            '/events': props.events,
            '/notes': props.notes,
        }
    }
    return <SWRProvider value={value}>{children}</SWRProvider>
}

export default Layout