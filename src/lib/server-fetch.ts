import { getNewAccessToken } from "@/app/services/auth/auth.service";
import { getCookie } from "@/app/services/auth/tokenHandlers";

const BACEND_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

const serverFetchHelper = async (endpont: string, options: RequestInit): Promise<Response> => {
    const { headers, ...restOptions } = options;
    const accessToken = await getCookie("accessToken");

    if (endpont !== "/auth/refresh-token") {
        await getNewAccessToken()
    }
    const response = await fetch(`${BACEND_API_URL}${endpont}`, {
        headers: {
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
            ...headers,
        },
        ...restOptions,
    })
    return response;
}

export const serverFetch = {
    get: (endpont: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpont, {  ...options, method: "GET" }),
    post: (endpont: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpont, { ...options, method: "POST" }),
    put: (endpont: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpont, { ...options, method: "PUT" }),
    delete: (endpont: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpont, { ...options, method: "DELETE" }),
};