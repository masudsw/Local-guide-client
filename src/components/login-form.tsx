// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// import { loginUser } from "@/services/auth/loginUser";
// import { useActionState } from "react";
// import { Button } from "./ui/button";
// import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
// import { Input } from "./ui/input";

// const LoginForm = () => {
//   // state will contain: { success, errors, inputs, message }
//   const [state, formAction, isPending] = useActionState(loginUser, null);

//  const getFieldError = (fieldName: string) => {
//   // We cast to 'any' here specifically to bypass the Union type restriction
//   const currentState = state as any;
  
//   if (currentState?.errors && Array.isArray(currentState.errors)) {
//     const error = currentState.errors.find((err: any) => err.field === fieldName);
//     return error ? error.message : null;
//   }
//   return null;
// };

//   return (
//     <form action={formAction}>
//       <FieldGroup>
//         <div className="grid grid-cols-1 gap-4">
//           {/* Email */}
//           <Field>
//             <FieldLabel htmlFor="email">Email</FieldLabel>
//             <Input
//               id="email"
//               name="email"
//               type="email"
//               placeholder="m@example.com"
//               // Preserves data after validation error
//               defaultValue={state?.inputs?.email || ""} 
//             />

//             {getFieldError("email") && (
//               <FieldDescription className="text-red-600">
//                 {getFieldError("email")}
//               </FieldDescription>
//             )}
//           </Field>

//           {/* Password */}
//           <Field>
//             <FieldLabel htmlFor="password">Password</FieldLabel>
//             <Input
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter your password"
//             />
//             {getFieldError("password") && (
//               <FieldDescription className="text-red-600">
//                 {getFieldError("password")}
//               </FieldDescription>
//             )}
//           </Field>
          
//           {/* Global Message (e.g. "Invalid credentials") */}
//           {state?.message && !state?.errors && (
//              <p className="text-red-600 text-center text-sm">{state.message}</p>
//           )}
//         </div>

//         <FieldGroup className="mt-4">
//           <Field>
//             <Button type="submit" disabled={isPending} className="w-full">
//               {isPending ? "Logging in..." : "Login"}
//             </Button>

//             <FieldDescription className="px-6 text-center">
//               Don&apos;t have an account?{" "}
//               <a href="/register" className="text-blue-600 hover:underline">
//                 Sign up
//               </a>
//             </FieldDescription>
//             <FieldDescription className="px-6 text-center">
//               <a href="/forget-password" title="reset" className="text-blue-600 hover:underline">
//                 Forgot password?
//               </a>
//             </FieldDescription>
//           </Field>
//         </FieldGroup>
//       </FieldGroup>
//     </form>
//   );
// };

// export default LoginForm;
import { loginUser } from "@/services/auth/loginUser";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error.message;
    } else {
      return null;
    }
  };
  console.log(state);
  return (
    <form action={formAction}>
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              //   required
            />

            {getFieldError("email") && (
              <FieldDescription className="text-red-600">
                {getFieldError("email")}
              </FieldDescription>
            )}
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              //   required
            />
            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <a
                href="/forget-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;