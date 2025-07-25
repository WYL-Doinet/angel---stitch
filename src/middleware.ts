import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { config as appConifg } from '@/config/configuration'

const authRoutes = [
    "/sign-in",
    "/sign-up",
];

export default async function middleware(req: NextRequest, res: NextResponse) {
    const path = req.nextUrl.pathname;

    if (path === '/error') {
        return NextResponse.next();
    }

    const cookieStore = await cookies()

    const authenticated = cookieStore.has(appConifg.cookie.sessionCookieName);

    if (!authenticated && !authRoutes.includes(path)) {
        return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    }

    if (authenticated && authRoutes.includes(path)) {
        return NextResponse.redirect(new URL("/home", req.nextUrl));
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        "/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    ],
};