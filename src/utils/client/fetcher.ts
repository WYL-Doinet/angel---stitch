
export const postFetcher = async <T>({ url, body = {}, method = 'POST' }: { url: string, body?: any, method?: 'PUT' | 'POST' | 'PATCH' | 'DELETE' }) => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })

        if (!response.ok) {
            throw response
        }
        return await response.json() as T & { success: true }
    } catch (error: unknown) {
        throw error
    }
}

export const getFetcher = async ({ url, body = {} }: { url: string, body?: any }) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        if (!response.ok) {
            throw response
        }
        return await response.json()
    } catch (error: unknown) {
        throw error
    }
}   