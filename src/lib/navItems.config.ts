""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["GUIDE", "TOURIST", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["GUIDE", "TOURIST", "ADMIN"],
                },

            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "/change-password",
                    icon: "Settings",
                    roles: ["TOURIST"],
                },
            ],
        },
    ]
}

export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "Create Tour",
                href: "/guide/dashboard/create-tour",
                icon: "Calendar", // ✅ String
                badge: "3",
                roles: ["GUIDE"],
            },
            {
                title: "My Listed Tours",
                href: "/guide/dashboard/my-listed-tours",
                icon: "Clock", // ✅ String
                roles: ["GUIDE"],
            },
            {
                title: "My Bookings",
                href: "/guide/dashboard/my-bookings",
                icon: "FileText", // ✅ String
                roles: ["GUIDE"],
            },
        ],
    }
]

export const TouristNavItems: NavSection[] = [
    {
        title: "Booking",
        items: [
            {
                title: "My Bookings",
                href: "/dashboard/my-booking",
                icon: "Calendar", // ✅ String
                roles: ["TOURIST"],
            },
            {
                title: "Book a Tour",
                href: "/dashboard/book-a-tour",
                icon: "ClipboardList", // ✅ String
                roles: ["TOURIST"],
            },
        ],
    },
    

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Guides",
                href: "/admin/dashboard/guides-management",
                icon: "Stethoscope", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Tourists",
                href: "/admin/dashboard/tourists-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    },
    
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...guideNavItems];
        case "TOURIST":
            return [...commonNavItems, ...TouristNavItems];
        default:
            return [];
    }
}