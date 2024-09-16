import { AcceptDoctorRequest, fetchSingleDoctor } from "@/actions/doctors"
import { getDictionary } from "@/app/[lang]/messages"
import BreadCrumb from "@/components/breadcrumb"
import Approve from "@/components/details/role-details/Approve"
import { SidebarNav } from "@/components/sideBar/sidebar-nav"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ISingleDoctor } from "@/types/doctors"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "update Doctor",
  description: "Doctor information update",
}


interface updateLayoutProps {
  children: React.ReactNode,
  params: { lang: "ar"|"en", doctorId: string, userid:string }
}

export default async function updateLayout({ children, params }: updateLayoutProps) {
  const lang=params.lang;
  const res = await fetchSingleDoctor(params.doctorId);
  const doctor: ISingleDoctor = res?.data?.data;
  const { navigation, shared, pages } = await getDictionary(params?.lang)

  const breadcrumbItems = [
    { title: navigation.doctors, link: "/dashboard/doctors" },
    { title: shared.update, link: `/dashboard/doctors/${doctor?.name}` },
  ];
  const sidebarNavItems = [
    {
      title: pages.users.profile,
      href: `/${lang}/dashboard/doctors/${params.doctorId}/${params.userid}/edit`,
      clicked:"edit"
    },
    {
      title: pages.users.additionalInfo,
      href: `/${lang}/dashboard/doctors/${params.doctorId}/${params.userid}/edit/additional-info`,
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
              title={pages.users.updateDoctor}
              description={doctor?.name}
            />
            {(!doctor?.is_verified) && <div className="px-0 md:px-4">
              <Approve successMessage={pages.users.requestApprovedSuccessfully} title={pages.users.approveRequest} defualt method={AcceptDoctorRequest} id={doctor?.user_id} />
            </div>}
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
