"use cilent";

import { SWRConfig, SWRConfiguration } from "swr";

type Props = {
    children: React.ReactNode;
    value?: SWRConfiguration;
}

const SWRProvider = ({
    children,
    value,
}: Props) => {
    return <SWRConfig value={value}>{children}</SWRConfig>;
};

export default SWRProvider;
