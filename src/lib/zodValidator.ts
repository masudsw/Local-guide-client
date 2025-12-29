import { ZodObject } from "zod";
import { fi } from "zod/locales";

export const zodValidator = <T>(paylaod: T, shema: ZodObject) => {
    const validatedPayload = shema.safeParse(paylaod);
    if (!validatedPayload.success) {
        return {
            success: false,
            errors: validatedPayload.error.issues.map(issue => {
                return {
                    field: issue.path[0],
                    message: issue.message
                }
            }),
        }
    }
    return {
        success: true,
        data: validatedPayload.data,
    }
    // Zod validation logic here
}