"use server"
import jwt from "jsonwebtoken";

export const verifyAccessToken=async(token:string)=>{
    try{
        const verifyedAccessToken=jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as jwt.JwtPayload;

        return {
            success:true,
            message:"Token is valid",
            payload:verifyedAccessToken,
        }
    }catch(error:any){
            return {
            success:false,
            message:error?.message||"Invalid token",
        }
    }
}

export const verifyResetPasswordToken=async(token:string)=>{
    try{
        const verifyedResetToken=jwt.verify(
            token,
            process.env.RESET_PASS_TOKEN_SECRET as string
        ) as jwt.JwtPayload;

        return {
            success:true,
            message:"Token is valid",
            payload:verifyedResetToken,
        };
    }catch(error:any){
            return {
            success:false,
            message:error?.message||"Invalid token",
        };
    }
};