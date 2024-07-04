import { AcceptNurseRequest, fetchSingleNurse } from "@/actions/nurses"
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
  params: { lang: Locale, nurseId: string, userid:string }
}

export default async function updateLayout({ children, params }: updateLayoutProps) {
  const lang=params.lang;
  const res = await fetchSingleNurse(params.nurseId);
  const nurse: ISingleNurse = res?.data?.data;
  const breadcrumbItems = [
    { title: "Nurses", link: "/dashboard/nurses" },
    { title: `update`, link: `/dashboard/nurses/${nurse?.name}` },
  ];
  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/${lang}/dashboard/nurses/${params.nurseId}/${params.userid}/edit`,
      clicked:"edit"
    },
    {
      title: "Additional Information",
      href: `/${lang}/dashboard/nurses/${params.nurseId}/${params.userid}/edit/additional-info`,
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
              title={`Update Nurse`}
              description={nurse?.name}
            />
            {(!nurse?.is_verified) && <div className="px-0 md:px-4">
              <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptNurseRequest} id={nurse?.user_id} />
            </div>}
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
