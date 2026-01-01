"use server"
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTouristZodSchema } from "@/zod/tourist.validation";
import { loginUser } from "./loginUser";


export const registerTourist = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const paylaod = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: 'TOURIST'
        }
        const validationResult = zodValidator(paylaod, createTouristZodSchema);
       
        // if (zodValidator(paylaod, createTouristZodSchema).success === false) {
        //     return zodValidator(paylaod, createTouristZodSchema);
        // }
        if (validationResult.success === false) {
            // RETURN the errors AND the original inputs
            return {
                ...validationResult,
                inputs: paylaod
            };
        }
        
        const validatedPayload: any = zodValidator(paylaod, createTouristZodSchema).data;
        const newFormData = new FormData();
        newFormData.append("data", JSON.stringify(validatedPayload));
        

        if(formData.get("file")){
            newFormData.append("file",formData.get("file") as Blob)
        }
        const file = formData.get("file");
        if (file instanceof File && file.size > 0) {
            newFormData.append("file", file);
        }
        const res = await serverFetch.post("/auth/register-user", {
            body: newFormData
        })
        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType || !contentType.includes("application/json")) {
            const errorText = await res.text(); // Capture the HTML error page
            console.error("Backend Error Body:", errorText);

            return {
                success: false,
                message: "Server returned an invalid response. Please check backend logs."
            };
        }

        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData)
        }
        return result;

    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed"}`
        }
    }
}