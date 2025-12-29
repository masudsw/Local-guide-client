"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { use, useEffect } from "react";
import { toast } from "sonner";

const LoginSuccessToast = () => {
    const searchParams=useSearchParams();
    const router=useRouter();;

    useEffect(() => {
        if(searchParams.get("loggedIn")==="true"){
            toast.success("You have been logged in successfully!");
            const newURL = new URL(window.location.href);
            newURL.searchParams.delete("loggedIn");
            router.replace(newURL.toString());
        }
    }, [searchParams, router ]);

    return null;
};

export default LoginSuccessToast;