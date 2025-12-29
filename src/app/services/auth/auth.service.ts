import { get } from "http";
import { getCookie } from "./tokenHandlers";


export async function getNewAccessToken() {
    try {
        const accessToken = await getCookie("accessToken");
        const refreshToken = await getCookie("refreshToken");
        //case-1: both tokens are missing
        if (!accessToken && refreshToken) {
            {
                return tokenRefreshed: false,
            }
        }
        //case-2: Access token exist
        if (accessToken) {
            const verifiedToken=await verifyAccessToken(accessToken);
            if(verifiedToken.success){
                return {
                    tokenRefreshed: false,
                }
            }
        }