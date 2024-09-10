import { fetchProfileInfo } from "@/actions/patients"
import { getDictionary } from "@/app/[lang]/dictionaries"
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
  params: { lang: "ar"|"en", id:string }
}

export default async function updateLayout({ children, params }: updateLayoutProps) {
  const lang=params.lang;
  const res = await fetchProfileInfo({userId:params.id});
  const Patient: IUser = res?.data?.data;
  const { navigation, shared, pages } = await getDictionary(params?.lang)
  const breadcrumbItems = [
    { title: navigation.patients, link: "/dashboard/patients" },
    { title: shared.update, link: `/dashboard/patients/${Patient?.first_name + " " + Patient?.last_name}` },
  ];
  const sidebarNavItems = [
    {
      title: pages.users.profile,
      href: `/${lang}/dashboard/patients/${params.id}/edit`,
      clicked:"edit"
    },
    {
      title: pages.users.additionalInfo,
      href: `/${lang}/dashboard/patients/${params.id}/edit/additional-info`,
      clicked:"edit/additional-info"
    },
    {
      title: pages.users.familyMembers,
      href: `/${lang}/dashboard/patients/${params.id}/edit/family-members`,
      clicked:"edit/additional-info"
    },
  ]
  return (
    <>
      <div className="space-y-4 p-5 pt-8 pb-16 md:block">
        <div className="space-y-0">
          <BreadCrumb items={breadcrumbItems}  />
          <div className="flex flex-row gap-1 justify-start items-start">
            <Heading
              title={pages.users.updatePatient}
              description={Patient?.first_name + " " + Patient?.last_name}
            />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex sm:flex-col space-y-8 space-x-0  lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5  w-full">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 w-full">{children}</div>
        </div>
      </div>
    </>
  )
}
