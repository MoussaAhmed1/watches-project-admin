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
];
