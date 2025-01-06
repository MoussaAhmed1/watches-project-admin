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
  // {
  //   title: "Home",
  //   href: "/dashboard",
  //   icon: "home",
  //   label: "home",
  //   subItems: false,
  // },
  {
    title: "pendingRequests",
    href: "/dashboard/history-of-requests/pending-requests",
    icon: "trello",
    label: "pendingRequests",
    subItems: false,
  },
  {
    title: "historyOfRequests",
    href: "/dashboard/history-of-requests/compeleted-requests",
    icon: "trello",
    label: "historyOfRequests",
    subItems: false,
  },
  {
    title: "Admins",
    href: "/dashboard/users/admins",
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
        href: "/dashboard/users/parents",
        label: "parents",
      },
      {
        title: "Schools",
        href: "/dashboard/users/schools",
        label: "schools",
      },
      {
        title: "Security",
        href: "/dashboard/users/security",
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
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: "notification",
    label: "notifications",
    subItems: false,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: "messages",
    label: "messages",
    subItems: false,
  },
  {
    title: "General Settings",
    href: "/dashboard/settings",
    icon: "settings",
    label: "general_settings",
    subItems: true,
    children: [
      {
        title: "About Us",
        href: "/dashboard/settings/about-us",
        label:"about_us"
      },
      {
        title: "FAQ",
        href: "/dashboard/settings/faq",
        label:"faq"
      },
      {
        title: "Terms and Conditions",
        href: "/dashboard/settings/terms-conditions",
        label:"terms_and_conditions"
      },
      {
        title: "privacyPolicy",
        href: "/dashboard/settings/privacy-policy",
        label:"privacyPolicy"
      },
    ],
  },
];
