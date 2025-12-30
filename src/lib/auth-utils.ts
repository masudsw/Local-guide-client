export type UserRole="GUIDE"|"TOURIST"|"ADMIN";


export type RouteConfig={
    exact:string[];
    patterns:RegExp[];
};

export const authRoutes=["/login","/register"];
export const commonProtectedRoutes:RouteConfig={
    exact:["/my-profile","/settings"],
    patterns:[],
};

export const guideProtectedRoutes:RouteConfig={
    exact:[],
    patterns:[/^\/guide/],
};
export const touristProtectedRoutes:RouteConfig={
    exact:[],
    patterns:[/^\/dashboard/],
};
export const adminProtectedRoutes:RouteConfig={
    exact:[],
    patterns:[/^\/admin/],
};

export const isAuthRoute=(pathname:string):boolean=>{
    return authRoutes.some((route:string)=>route===pathname);
}

export const isRouteMatches=(pathname:string,routes:RouteConfig):boolean=>{
    if(routes.exact.includes(pathname)){
        return true;
    }
    return routes.patterns.some((pattern:RegExp)=>pattern.test(pathname));
} 

export const getRouteOwner=(pathname:string): "ADMIN"|"GUIDE"|"TOURIST"|"COMMON"|null=>{
    if(isRouteMatches(pathname,adminProtectedRoutes)){
        return "ADMIN";
    }
    if(isRouteMatches(pathname,guideProtectedRoutes)){
        return "GUIDE";
    }
    if(isRouteMatches(pathname,touristProtectedRoutes)){
        return "TOURIST";
    }   
    if(isRouteMatches(pathname,commonProtectedRoutes)){
        return "COMMON";
    }
    return null;
}

export const isValidRedirectForRole=(redirectPath:string, role:UserRole):boolean=>{
    const routeOwner=getRouteOwner(redirectPath);
    if(!routeOwner===null || routeOwner==="COMMON"){
        return true;
    }
    if(routeOwner===role){
        return true;
    }
    return false;
};