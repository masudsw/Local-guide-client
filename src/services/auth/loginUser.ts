"use server"
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";
import { parse } from "cookie";

import { setCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/lib/auth-utils";


export const loginUser = async (_currentStatus: any, formData: any) => {
    try {
        const redirectTo = formData.get("redirectTo") || null;
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
        const paylaod = {
            email: formData.get("email"),
            password: formData.get("password"),
        }
        //Gatekeeper--validation
        if (zodValidator(paylaod, loginValidationZodSchema).success === false) {
            return zodValidator(paylaod, loginValidationZodSchema);
        }
        const validatedPayload = zodValidator(paylaod, loginValidationZodSchema).data;
        //API call to login user
        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await res.json();
        //Extract cookies from response
        const setCookieHeaders = res.headers.getSetCookie();
        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);
                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            })
        } else {
            throw new Error("No set-Cookie header found");
        }
        if (!accessTokenObject) {
            throw new Error("Access token not found in cookies");
        }
        if (!refreshTokenObject) {
            throw new Error("Refresh token not found in cookies");
        }
        //Set cookies in browser
        await setCookie("accessToken", accessTokenObject['accessToken'], {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age'] || "3600"),
            path: accessTokenObject['Path'] || "/",
            sameSite: accessTokenObject['SameSite'] || "none",
        });
        await setCookie("refreshToken", refreshTokenObject['refreshToken'], {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject['Max-Age'] || "3600"),
            path: refreshTokenObject['Path'] || "/",
            sameSite: refreshTokenObject['SameSite'] || "none",
        });
        //Verify access token
        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObject['accessToken'], process.env.JWT_SECRET_KEY as string);
        if (typeof verifiedToken === "string") {
            throw new Error("Invalid token");
        }

        const userRole = verifiedToken.role;
        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }
        if (redirectTo) {
            const requestedPath = redirectTo.toString();
            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`)
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : "Incorrect credintial"}`,
        }

    }
}