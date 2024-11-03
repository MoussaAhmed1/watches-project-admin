import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};



export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "home",
    label: "home",
    subItems: false,
  },
  {
    title: "Admins",
    href: "/dashboard/admins",
    icon: "admin",
    label: "admins",
    subItems: false,
  },
  {
    title: "Users",
    icon: "patients",
    label: "users",
    subItems: true,

    children: [
      {
        title: "Parents",
        href: "/dashboard/parents",
        label: "parents",
      },
      {
        title: "Drivers",
        href: "/dashboard/drivers",
        label: "drivers",
      },
      {
        title: "Schools",
        href: "/dashboard/schools",
        label: "schools",
      },
      {
        title: "Security",
        href: "/dashboard/security",
        label: "security",
      },
    ],
  },
  {
    title: "Watches",
    href: "/dashboard/watches",
    icon: "watches",
    label: "watches",
    subItems: false,
  },
];
