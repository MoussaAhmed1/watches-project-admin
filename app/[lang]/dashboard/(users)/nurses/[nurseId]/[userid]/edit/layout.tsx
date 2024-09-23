import { AcceptNurseRequest, fetchSingleNurse } from "@/actions/nurses"
import { getDictionary } from "@/app/[lang]/messages"
import BreadCrumb from "@/components/breadcrumb"
import Approve from "@/components/details/role-details/Approve"
import { SidebarNav } from "@/components/sideBar/sidebar-nav"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ISingleNurse } from "@/types/nurses"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "update Nurse",
  description: "Nurse information update",
}


interface updateLayoutProps {
  children: React.ReactNode,
  params: { lang: "ar" | "en", nurseId: string, userid: string }
}

export default async function updateLayout({ children, params }: updateLayoutProps) {
  const lang = params.lang;
  const res = await fetchSingleNurse(params.nurseId);
  const nurse: ISingleNurse = res?.data?.data;
  const { navigation, shared, pages } = await getDictionary(lang)
  const breadcrumbItems = [
    { title: navigation.nurses, link: "/dashboard/nurses" },
    { title: shared.update, link: `/dashboard/nurses/${nurse?.name}` },
  ];

  const sidebarNavItems = [
    {
      title: pages.users.profile,
      href: `/${lang}/dashboard/nurses/${params.nurseId}/${params.userid}/edit`,
      clicked: "edit"
    },
    {
      title: pages.users.additionalInfo,
      href: `/${lang}/dashboard/nurses/${params.nurseId}/${params.userid}/edit/additional-info`,
      clicked: "edit/additional-info"
    },
  ]
  return (
    <>
      <div className="space-y-4 p-5 pt-8 pb-16 md:block">
        <div className="space-y-0">
          <BreadCrumb items={breadcrumbItems} />
          <div className="flex flex-row gap-1 justify-start items-start">
            <Heading
              title={pages.users.updateNurse}
              description={nurse?.name}
            />
            {(!nurse?.is_verified) && <div className="px-0 md:px-4">
              <Approve successMessage={pages.users.requestApprovedSuccessfully} title={pages.users.approveRequest} defualt method={AcceptNurseRequest} id={nurse?.user_id} />
            </div>}
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-wrap sm:flex-col space-y-8 space-x-0  lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5  w-full">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 w-full px-3 ">{children}</div>
        </div>
      </div>
    </>
  )
}
