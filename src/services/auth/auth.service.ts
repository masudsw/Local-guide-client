
import { deleteCookie, getCookie, setCookie } from "./tokenHandlers";
import { verifyAccessToken } from "@/lib/jwtHandlers";
import { serverFetch } from "@/lib/server-fetch";
import {parse} from "cookie"


export async function getNewAccessToken() {
    try {
        const accessToken = await getCookie("accessToken");
        const refreshToken = await getCookie("refreshToken");
        //case-1: both tokens are missing
        if (!accessToken && refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }

        //case-2: Access token exist
        if (accessToken) {
            const verifiedToken = await verifyAccessToken(accessToken);
            if (verifiedToken.success) {
                return {
                    tokenRefreshed: false,
                }
            }
        }
        //case-3: Access token is missing 
        if (!refreshToken) {
            return {
                tokenRefreshed: false,
            }
        }
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const response = await serverFetch.post("/auth/refresh-token", {
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
            },
        });
        const result = await response.json();

        const setCookieHeaders = response.headers.getSetCookie();
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);
                if (parsedCookie["accessToken"]) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie["refreshToken"]) {
                    refreshTokenObject = parsedCookie;
                }
            });
        } else {
            throw new Error("No set-Cookie header found");
        }
        if (!accessTokenObject) {
            throw new Error("Access token not found in cookies");
        }
        if (!refreshTokenObject) {
            throw new Error("Refresh token not found in cookies");
        }

        await deleteCookie("accessToken");
        await setCookie("accessToken", accessTokenObject.value, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject.maxAge) || 1000 * 60 * 60,
            path: accessTokenObject.path || "/",
            sameSite: accessTokenObject["samesite"] || "none",
        });
        await deleteCookie("refreshToken");
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject.maxAge) || 1000 * 60 * 60 * 24 * 7,
            path: refreshTokenObject.path || "/",
            sameSite: refreshTokenObject['sameSite'] || "none",
        });
        if (!result.success) {
            throw new Error(result.message || "Token refresh failed");
        }
        return {
            tokenRefreshed: true,
            success: true,
            message: result.message || "Token refreshed successfully",
        }
    } catch (error: any) {
        return {
            tokenRefreshed: false,
            success: false,
            message: error?.message || "Failed to refresh token",
        }
    }
}