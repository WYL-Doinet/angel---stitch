'use server'
import { config } from "@/config/configuration";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const signOut = async () => {
    const cookieStore = await cookies();
    cookieStore.delete(config.cookie.sessionCookieName)
    return redirect('/sign-in');
}