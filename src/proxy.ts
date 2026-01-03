import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { IUser } from "@/types/userTypes";



const roleBasedRoutes = {
  ADMIN: ["/admin/dashboard",],
  GUIDE: ["/guide/dashboard"],
  TOURIST: [
    "/dashboard",
    "/dashboard/booking",
  ],
};

const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const { pathname } = request.nextUrl;
  console.log(pathname)
  console.log(accessToken)

  if (!accessToken && !refreshToken && !authRoutes.includes(pathname)) {
    console.log("pathname",pathname)
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  let user: IUser | null = null;

  if (accessToken) {
    try {
      user = jwtDecode(accessToken); // {id: string, email: string, role: "ADMIN"| "DOCTOR" | "PATIENT", exp: number, iat: number}
    } catch (err) {
      console.log("Error decoding access token:", err);
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (!user && refreshToken) {
    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );
      if (refreshRes.ok) {
        const newAccessToken = request.cookies.get("accessToken")?.value;
        user = jwtDecode(newAccessToken!);
        return NextResponse.next();
      } else {
        const response = NextResponse.redirect(
          new URL(`/login?redirect=${pathname}`, request.url)
        );
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    } catch (err) {
      console.log("Error refreshing token:", err);
      const response = NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }


   if(user){
    const allowedRoutes = user ? roleBasedRoutes[user.role] : [];
    if(allowedRoutes && allowedRoutes.some((r)=>pathname.startsWith(r))){
        return NextResponse.next();
    }else{
        return NextResponse.redirect(new URL(`/unauthorized`, request.url));
    }
   }

   if(user && authRoutes.includes(pathname)){
    return NextResponse.redirect(new URL(`/`));
   }
   

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/admin/:path*", 
    "/guide/:path*", 
    "/tourist/:path*", 
    "/dashboard/:path*",
    "/login", 
    "/register"
  ],
};
