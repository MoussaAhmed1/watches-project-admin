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
    ],
  },

  {
    title: "Verification Requests",
    icon: "patients",
    label: "user",
    subItems: true,

    children: [
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
    ],
  },
  {
    title: "Orders",
    href: "/dashboard/nurses",
    icon: "reservations",
    label: "user",
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
    label: "user",
    subItems: true,

    children: [
      {
        title: "Reservations",
        href: "/dashboard/reservations",
      },
      {
        title: "Nurse Orders",
        href: "/dashboard/nurse-orders",
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
    subItems: false,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: "notification",
    label: "kanban",
    subItems: false,
  },
  // {
  //   title: "Additional info ",
  //   href: "/dashboard/user",
  //   icon: "doctors",
  //   label: "user",
  //   subItems: true,

  //   children: [
  //     {
  //       title: "Specializations",
  //       href: "/dashboard/data-management/specializations",
  //     },
  //     {
  //       title: "Doctor",
  //       href: "/dashboard/additional-info/consulting",
  //     },
  //     {
  //       title: "Client",
  //       href: "/dashboard/additional-info/statistics",
  //     },
  //     {
  //       title: "Profile",
  //       href: "/dashboard/additional-info/profile",
  //     },
  //     {
  //       title: "Nurse",
  //       href: "/dashboard/additional-info/statistics",
  //     },
  //     {
  //       title: "Pharmacy",
  //       href: "/dashboard/additional-info/statistics",
  //     },
  //     {
  //       title: "Doctor availability",
  //       href: "/dashboard/additional-info/statistics",
  //     },
  //   ],
  // },
  {
    title: "Messages",
    href: "/dashboard/settings/messages",
    icon: "messages",
    label: "kanban",
    subItems: false,
  },
  {
    title: "General Settings",
    href: "/dashboard/settings",
    icon: "settings",
    label: "kanban",
    subItems: true,
    children: [
      {
        title: "Contact us",
        href: "/dashboard/settings/Contacts",
      },
      {
        title: "About App",
        href: "/dashboard/settings/about-app",
      },
      {
        title: "Contact Us",
        href: "/dashboard/about-app",
      },
      {
        title: "FAQ",
        href: "/dashboard/faq",
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
    label: "kanban",
    subItems: true,
    children: [
      {
        title: "Commission",
        href: "/dashboard/settings",
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
        href: "/dashboard/terms-conditions",
      },
    ],
  },
  
];
