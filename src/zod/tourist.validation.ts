import z from "zod";

export const createTouristZodSchema=z.object({
    name:z.string().min(1,"Name is required.").min(3,"Name must be at least 3 charecters long"),
    email:z.email("Invalid email address").min(1,"Email is required"),
    password:z.string().min(6,"Password must be at least 6 charecters long"),
    role:z.enum(['TOURIST']),
    // profilePhoto:z
    // .instanceof(File)
    // .refine((file)=>file.size>0,"Profile photo is required"),
})

export const updatePatientZodSchema=z.object({
    name:z.string().min(3,"Name must be at least 3 characters long").optional(),  
})