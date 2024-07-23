import { fetchProfileInfo } from "@/actions/patients"
import BreadCrumb from "@/components/breadcrumb"
import { SidebarNav } from "@/components/sideBar/sidebar-nav"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { IUser } from "@/types/patients"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "update Patient",
  description: "Patient information update",
}


interface updateLayoutProps {
  children: React.ReactNode,
  params: { lang: Locale, id:string }
}

export default async function updateLayout({ children, params }: updateLayoutProps) {
  const lang=params.lang;
  const res = await fetchProfileInfo({userId:params.id});
  const Patient: IUser = res?.data?.data;
  const breadcrumbItems = [
    { title: "Patients", link: "/dashboard/patients" },
    { title: `update`, link: `/dashboard/patients/${Patient?.first_name + " " + Patient?.last_name}` },
  ];
  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/${lang}/dashboard/patients/${params.id}/edit`,
      clicked:"edit"
    },
    {
      title: "Additional Information",
      href: `/${lang}/dashboard/patients/${params.id}/edit/additional-info`,
      clicked:"edit/additional-info"
    },
    {
      title: "Family members",
      href: `/${lang}/dashboard/patients/${params.id}/edit/family-members`,
      clicked:"edit/additional-info"
    },
  ]
  return (
    <>
      <div className="space-y-4 p-5 pt-8 pb-16 md:block">
        <div className="space-y-0">
          <BreadCrumb items={breadcrumbItems}  />
          <div className="flex flex-col md:flex-row gap-1 md:items-center md:justify-between  justify-start items-start">
            <Heading
              title={`Update Patient`}
              description={Patient?.first_name + " " + Patient?.last_name}
            />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
    </>
  )
}
