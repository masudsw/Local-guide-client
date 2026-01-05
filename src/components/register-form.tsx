"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { registerTourist } from "@/services/auth/registerTourist";
import { toast } from "sonner";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerTourist, null);
  console.log(state)

  // Helper to safely extract error messages
  const errorMap = state?.errors?.reduce((acc: Record<string, string>, err: any) => {
    acc[err.field] = err.message;
    return acc;
  }, {}) || {};

  useEffect(() => {
    if (state && !state.success && state.message) {
      console.log("inside register form")
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
    
      <div className="mb-8 text-center">
        
      </div>

      <form action={formAction}>
        <FieldGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input 
              name="name" 
              type="text" 
              placeholder="John Doe" 
              defaultValue={state?.inputs?.name || ""}
              className={errorMap.name ? "border-red-500" : ""} />
              {errorMap.name && <p className="text-xs text-red-600 mt-1">{errorMap.name}</p>}
            </Field>

           

            {/* Email */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input 
              name="email" 
              type="email" 
              placeholder="m@example.com"
              defaultValue={state?.inputs?.email|| ""}
              className={errorMap.email ? "border-red-500" : ""} />
              {errorMap.email && <p className="text-xs text-red-600 mt-1">{errorMap.email}</p>}
            </Field>

            {/* Password */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input  
              name="password" 
              type="password" 
              placeholder="••••••••" 
              defaultValue={state?.inputs?.password || ""}
              className={errorMap.password ? "border-red-500" : ""} />
              {errorMap.password && <p className="text-xs text-red-600 mt-1">{errorMap.password}</p>}
            </Field>

            {/* Confirm Password */}
            <Field className="md:col-span-2">
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" className={errorMap.confirmPassword ? "border-red-500" : ""} />
              {errorMap.confirmPassword && <p className="text-xs text-red-600 mt-1">{errorMap.confirmPassword}</p>}
            </Field>
          </div>

          <div className="mt-8 space-y-4">
            <Button type="submit" disabled={isPending} className="w-full py-6 text-lg rounded-xl bg-blue-600 hover:bg-blue-700 transition-all">
              {isPending ? "Creating Account..." : "Sign Up as a Tourist"}
            </Button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </FieldGroup>
      </form>
    
    </>
  );
};

export default RegisterForm;