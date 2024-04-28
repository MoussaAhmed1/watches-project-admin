import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

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
    title: "Introduction",
    href: "/dashboard/introduction",
    icon: "ads",
    label: "user",
    subItems: false,
  },
  {
    title: "Ads",
    href: "/dashboard/ads",
    icon: "introduction",
    label: "user",
    subItems: false,
  },
  {
    title: "Admins",
    href: "/dashboard/admins",
    icon: "admins",
    label: "user",
    subItems: false,
  },
  {
    title: "Countires",
    href: "/dashboard/countires",
    icon: "countries",
    label: "user",
    subItems: false,
  },
  {
    title: "Cities",
    href: "/dashboard/cities",
    icon: "countries",
    label: "user",
    subItems: false,
  },
  {
    title: "Account Types",
    href: "/dashboard/account-types",
    icon: "user",
    label: "user",
    subItems: false,
  },
  {
    title: "Healthcare Specialties",
    href: "/dashboard/healthcare-specialties",
    icon: "healthcare",
    label: "user",
    subItems: false,
  },
  {
    title: "Payment Methods",
    href: "/dashboard/payment-method",
    icon: "payment",
    label: "user",
    subItems: false,
  },
  {
    title: "Patients",
    href: "/dashboard/patients",
    icon: "patients",
    label: "user",
    subItems: false,
  },
  {
    title: "Doctors",
    href: "/dashboard/user",
    icon: "doctors",
    label: "user",
    subItems: true,

    children: [
      {
        title: "Doctors",
        href: "/dashboard/doctors",
      },
      {
        title: "Consulting",
        href: "/dashboard/consulting",
      },
      {
        title: "Statistics",
        href: "/dashboard/statistics",
      },
    ],
  },
  {
    title: "Pharmacy",
    href: "/dashboard/pharmacy",
    icon: "pharmacies",
    label: "user",
    subItems: true,

    children: [
      {
        title: "Pharmacy",
        href: "/dashboard/pharmacy",
      },
      {
        title: "Order",
        href: "/dashboard/pharmacy/order",
      },
      {
        title: "Drugs",
        href: "/dashboard/pharmacy/drugs",
      },
      {
        title: "Categories",
        href: "/dashboard/pharmacy/categories",
      },
    ],
  },
  {
    title: "Radiographer and X-ray",
    href: "/dashboard/radiographer",
    icon: "radiographer",
    label: "user",
    subItems: false,
  },
  {
    title: "Sonar doctor",
    href: "/dashboard/sonar-doctor",
    icon: "doctors",
    label: "user",
    subItems: false,
  },
  {
    title: "Labs",
    href: "/dashboard/labs",
    icon: "labs",
    label: "user",
    subItems: false,
  },
  {
    title: "Hospitals",
    href: "/dashboard/hospitals",
    icon: "hospitals",
    label: "employee",
    subItems: false,
  },
  {
    title: "Health care providers",
    href: "/dashboard/health-care-providers",
    icon: "healthcare",
    label: "profile",
    subItems: false,
  },
  {
    title: "Reservations",
    href: "/dashboard/reservations",
    icon: "reservations",
    label: "kanban",
    subItems: false,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: "contacts",
    label: "kanban",
    subItems: false,
  },
  {
    title: "Notificatins",
    href: "/dashboard/notificatins",
    icon: "notification",
    label: "kanban",
    subItems: false,
  },
  {
    title: "Additional info ",
    href: "/dashboard/user",
    icon: "doctors",
    label: "user",
    subItems: true,

    children: [
      {
        title: "Specializations",
        href: "/dashboard/additional-info/specializations",
      },
      {
        title: "Doctor",
        href: "/dashboard/additional-info/consulting",
      },
      {
        title: "Client",
        href: "/dashboard/additional-info/statistics",
      },
      {
        title: "Profile",
        href: "/dashboard/additional-info/profile",
      },
      {
        title: "Nurse",
        href: "/dashboard/additional-info/statistics",
      },
      {
        title: "Pharmacy",
        href: "/dashboard/additional-info/statistics",
      },
      {
        title: "Doctor availability",
        href: "/dashboard/additional-info/statistics",
      },
    ],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "settings",
    label: "kanban",
    subItems: true,
    children: [
      {
        title: "Settings",
        href: "/dashboard/settings",
      },
      {
        title: "Suggestions complaints",
        href: "/dashboard/settings/suggestions-complaints",
      },
      {
        title: "About App",
        href: "/dashboard/settings/about-app",
      },
      {
        title: "Privacy Policy",
        href: "/dashboard/settings/privacy-policy",
      },
      {
        title: "Terms and Conditions",
        href: "/dashboard/settings/terms-conditions",
      },
    ],
  },
];
