'use server'
import { config } from "@/config/configuration"
import { cookies } from "next/headers"

export const postFetcher = async ({ url, body = {}, method = 'POST' }: { url: string, body?: any, method?: 'PUT' | 'POST' | 'PATCH' }) => {
    try {
        const cookieStore = await cookies()
        const response = await fetch(url, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieStore.get(config.cookie.sessionCookieName)
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })

        if (response.status === 401) {
            cookieStore.delete(config.cookie.sessionCookieName)
        }
        if (!response.ok) {
            throw response
        }
        
        return await response.json()
    } catch (error: unknown) {
        throw error
    }
}

export const getFetcher = async ({ url, body = {} }: { url: string, body?: any }) => {
    try {
        const cookieStore = await cookies()
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookieStore.get(config.cookie.sessionCookieName)
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        if (response.status === 401) {
            cookieStore.delete(config.cookie.sessionCookieName)
        }
        if (!response.ok) {
            throw response
        }
        return await response.json()
    } catch (error: unknown) {
        throw error
    }
}   