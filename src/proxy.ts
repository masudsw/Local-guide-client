// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";
// import { IUser } from "@/types/userTypes";



// const roleBasedRoutes = {
//   ADMIN: ["/admin/dashboard",],
//   GUIDE: ["/guide/dashboard"],
//   TOURIST: [
//     "/dashboard",
//     "/dashboard/booking",
//   ],
// };

// const authRoutes = ["/login", "/register"];

// export async function proxy(request: NextRequest) {
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   const { pathname } = request.nextUrl;
//   console.log(pathname)
//   console.log(accessToken)

//   if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
//     console.log("pathname",pathname)
//     return NextResponse.redirect(
//       new URL(`/login?redirect=${pathname}`, request.url)
//     );
//   }

//   let user: IUser | null = null;

//   if (accessToken) {
//     try {
//       user = jwtDecode(accessToken); // {id: string, email: string, role: "ADMIN"| "DOCTOR" | "PATIENT", exp: number, iat: number}
//     } catch (err) {
//       console.log("Error decoding access token:", err);
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url)
//       );
//     }
//   }

//   if (!user && refreshToken) {
//     try {
//       const refreshRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ refreshToken }),
//         }
//       );
//       if (refreshRes.ok) {
//         const newAccessToken = request.cookies.get("accessToken")?.value;
//         user = jwtDecode(newAccessToken!);
//         return NextResponse.next();
//       } else {
//         const response = NextResponse.redirect(
//           new URL(`/login?redirect=${pathname}`, request.url)
//         );
//         response.cookies.delete("accessToken");
//         response.cookies.delete("refreshToken");
//         return response;
//       }
//     } catch (err) {
//       console.log("Error refreshing token:", err);
//       const response = NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url)
//       );
//       response.cookies.delete("accessToken");
//       response.cookies.delete("refreshToken");
//       return response;
//     }
//   }


//    if(user){
//     const allowedRoutes = user ? roleBasedRoutes[user.role] : [];
//     if(allowedRoutes && allowedRoutes.some((r)=>pathname.startsWith(r))){
//         return NextResponse.next();
//     }else{
//         return NextResponse.redirect(new URL(`/unauthorized`, request.url));
//     }
//    }

//    if(user && authRoutes.includes(pathname)){
//     return NextResponse.redirect(new URL(`/`));
//    }
   

//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     "/admin/:path*", 
//     "/guide/:path*", 
//     "/tourist/:path*", 
//     "/dashboard/:path*",
//     "/login", 
//     "/register"
//   ],
// };
// -------------------------
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils';



// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const cookieStore = await cookies()
    const pathname = request.nextUrl.pathname;

    const accessToken = request.cookies.get("accessToken")?.value || null;

    let userRole: UserRole | null = null;
    if (accessToken) {
        const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

        if (typeof verifiedToken === "string") {
            cookieStore.delete("accessToken");
            cookieStore.delete("refreshToken");
            return NextResponse.redirect(new URL('/login', request.url));
        }

        userRole = verifiedToken.role;
    }

    const routerOwner = getRouteOwner(pathname);
    

    const isAuth = isAuthRoute(pathname)

    // Rule 1 : User is logged in and trying to access auth route. Redirect to default dashboard
    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }


    // Rule 2 : User is trying to access open public route
    if (routerOwner === null) {
        return NextResponse.next();
    }

    // Rule 1 & 2 for open public routes and auth routes

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Rule 3 : User is trying to access common protected route
    if (routerOwner === "COMMON") {
        return NextResponse.next();
    }

    // Rule 4 : User is trying to access role based protected route
    if (routerOwner === "ADMIN" || routerOwner === "TOURIST" || routerOwner === "GUIDE") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }
    console.log(userRole);

    return NextResponse.next();
}



export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}
