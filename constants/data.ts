import { NavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: "home",
    label: "Dashboard",
    subItems: false,
  },

  {
    title: "Users",
    href: "/dashboard/nurses",
    icon: "patients",
    label: "user",
    subItems: true,

    children: [
      {
        title: "Patients",
        href: "/dashboard/patients",
      },
      {
        title: "Doctors",
        href: "/dashboard/doctors",
      },
      {
        title: "Pharmacies",
        href: "/dashboard/pharmacies",
      },
      {
        title: "Nurses",
        href: "/dashboard/nurses",
      },
      {
        title: "Admins",
        href: "/dashboard/admins",
      },
    ],
  },

  {
    title: "Verification Requests",
    icon: "patients",
    label: "verification",
    subItems: true,

    children: [
      {
        title: "Doctors",
        href: "/dashboard/verification-requests/doctors",
      },
      {
        title: "Pharmacies",
        href: "/dashboard/verification-requests/pharmacies",
      },
      {
        title: "Nurses",
        href: "/dashboard/verification-requests/nurses",
      },
    ],
  },
  {
    title: "Orders",
    href: "/dashboard/nurses",
    icon: "reservations",
    label: "orders",
    subItems: true,

    children: [
      {
        title: "Reservations",
        href: "/dashboard/reservations",
      },
      {
        title: "Pharmacy Orders",
        href: "/dashboard/pharmacy-orders",
      },
      {
        title: "Nurse Orders",
        href: "/dashboard/nurse-orders",
      },
    ],
  },
  {
    title: "Cancel Requests",
    icon: "reservations",
    label: "cancel",
    subItems: true,

    children: [
      {
        title: "Reservations",
        href: "/dashboard/cancel-requests/reservations",
      },
      {
        title: "Nurse Orders",
        href: "/dashboard/cancel-requests/nurse-orders",
      },
    ],
  },
  {
    title: "Banners",
    href: "/dashboard/banars",
    icon: "media",
    subItems: false,
  },
  {
    title: "Packages",
    href: "/dashboard/packages",
    icon: "inbox",
    label: "packages",
    subItems: true,
    children: [
      {
        title: "Client Packages",
        href: "/dashboard/packages/client-packages",
      },
      {
        title: "Pharmacy Packages",
        href: "/dashboard/packages/pharmacy-packages",
      }
    ]
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: "notification",
    label: "settings",
    subItems: false,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: "messages",
    label: "kanban",
    subItems: false,
  },
  {
    title: "General Settings",
    href: "/dashboard/settings",
    icon: "settings",
    label: "settings",
    subItems: true,
    children: [
      {
        title: "Contact us",
        href: "/dashboard/settings/contact-us",
      },
      {
        title: "About Us",
        href: "/dashboard/settings/about-us",
      },
      {
        title: "FAQ",
        href: "/dashboard/settings/faq",
      },
      {
        title: "Terms and Conditions",
        href: "/dashboard/settings/terms-conditions",
      },
    ],
  },
  {
    title: "Data Management", 
    href: "/dashboard/settings",
    icon: "settings",
    label: "data_management",
    subItems: true,
    children: [
      {
        title: "Commission",
        href: "/dashboard/data-management/commission",
      },
      {
        title: "Pharmacy Orders Limits",
        href: "/dashboard/data-management/pharmacy-order-number",
      },
      {
        title: "Doctor Specialiations",
        href: "/dashboard/data-management/specializations",
      },
      {
        title: "Pharmacy Categories",
        href: "/dashboard/data-management/pharmacy-categories",
      },
      {
        title: "Pharmacy Products",
        href: "/dashboard/data-management/drugs",
      },
    ],
  },
  
];
