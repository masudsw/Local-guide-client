import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { headers } from "next/headers";


export const loginUser = async(_currentStatus:any, formData:any) => {
   try{
    const redirectTo=formData.get("redirectTo")|| null;
    let accessTokenObject:null |any= null;
    let refreshTokenObject:null |any= null;
    const paylaod={
        email:formData.get("email"),
        password:formData.get("password"),
    }
    if(zodValidator(paylaod,loginValidationZodSchema).success===false){
        return zodValidator(paylaod,loginValidationZodSchema);
   }
   const validatedPayload=zodValidator(paylaod,loginValidationZodSchema).data;
   
   const res=await serverFetch.post("/auth/login",{
    body:JSON.stringify(validatedPayload),
    headers:{
        "Content-Type":"application/json",
    }
   });


export default loginUser;