export const config = {
    app: {
        env: process.env.APP_ENV || 'development',
    },
    cookie: {
        sessionCookieName: process.env.SESSION_COOKIE_NAME || 'stitch-love-angel',
        options: {
            httpOnly: true,
            secure: process.env.APP_ENV === 'production',
            maxAge: 60 * 60 * 24 * 356,
            path: "/",
            sameSite: 'strict',
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    api :{
        baseApiUrl : process.env.BASE_API_URL as string || 'http://localhost/4000',
        baseGraphQlUrl : process.env.BASE_GRAPH_QL_URL as string || 'http://localhost/4000/graphql'
    }
} as const