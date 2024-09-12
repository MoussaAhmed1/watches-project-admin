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
    href: "/dashboard/nurses",
    icon: "patients",
    label: "users",
    subItems: true,

    children: [
      {
        title: "Patients",
        href: "/dashboard/patients",
        label: "patients",
      },
      {
        title: "Doctors",
        href: "/dashboard/doctors",
        label: "doctors",
      },
      {
        title: "Pharmacies",
        href: "/dashboard/pharmacies",
        label: "pharmacies",
      },
      {
        title: "Nurses",
        href: "/dashboard/nurses",
        label: "nurses",
      },
    ],
  },
  {
    title: "Verification Requests",
    icon: "patients",
    label: "verification_requests",
    subItems: true,

    children: [
      {
        title: "Doctors",
        href: "/dashboard/verification-requests/doctors",
        label: "doctors",

      },
      {
        title: "Pharmacies",
        href: "/dashboard/verification-requests/pharmacies",
        label: "pharmacies",
      },
      {
        title: "Nurses",
        href: "/dashboard/verification-requests/nurses",
        label: "nurses",
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
        label: "reservations",
      },
      {
        title: "Pharmacy Orders",
        href: "/dashboard/pharmacy-orders",
        label: "pharmacy_orders",
      },
      {
        title: "Nurse Orders",
        href: "/dashboard/nurse-orders",
        label: "nurse_orders",
      },
    ],
  },
  {
    title: "Cancel Requests",
    icon: "reservations",
    label: "cancel_requests",
    subItems: true,
    
    children: [
      {
        title: "Reservations",
        href: "/dashboard/cancel-requests/reservations",
        label: "reservations",
      },
      {
        title: "Nurse Orders",
        href: "/dashboard/cancel-requests/nurse-orders",
        label: "nurse_orders",
      },
    ],
  },
  {
    title: "Banners",
    href: "/dashboard/banars",
    icon: "media",
    label: "banners",
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
        label: "client_packages",
      },
      {
        title: "Pharmacy Packages",
        href: "/dashboard/packages/pharmacy-packages",
        label: "pharmacy_packages",
      },
    ],
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
        title: "Contact us",
        href: "/dashboard/settings/contact-us",
        label:"contact_us"
      },
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
        label: "commission",
      },
      {
        title: "Pharmacy Orders Limits",
        href: "/dashboard/data-management/pharmacy-order-number",
        label: "pharmacy_orders_limits",
      },
      {
        title: "Doctor Specialiations",
        href: "/dashboard/data-management/specializations",
        label: "doctor_specialiations",
      },
      {
        title: "Pharmacy Categories",
        href: "/dashboard/data-management/pharmacy-categories",
        label: "pharmacy_categories",
      },
      {
        title: "Pharmacy Products",
        href: "/dashboard/data-management/drugs",
        label: "pharmacy_products",
      },
    ],
  },
];
