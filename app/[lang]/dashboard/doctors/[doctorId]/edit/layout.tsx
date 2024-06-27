import { AcceptDoctorRequest, fetchSingleDoctor } from "@/actions/doctors"
import BreadCrumb from "@/components/breadcrumb"
import Approve from "@/components/details/role-details/Approve"
import { SidebarNav } from "@/components/sideBar/sidebar-nav"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ISingleDoctor } from "@/types/doctors"
import { Metadata } from "next"
import Image from "next/image"


export const metadata: Metadata = {
  title: "update Doctor",
  description: "Doctor information update",
}


interface updateLayoutProps {
  children: React.ReactNode,
  params: { lang: Locale, doctorId: string }
}

export default async function updateLayout({ children, params }: updateLayoutProps) {
  // const lang=params.lang;
  const res = await fetchSingleDoctor(params.doctorId);
  const doctor: ISingleDoctor = res?.data?.data;
  const breadcrumbItems = [
    { title: "Doctors", link: "/dashboard/doctors" },
    { title: `${doctor?.name}`, link: `/dashboard/doctors/${doctor?.name}` },
  ];
  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/dashboard/doctors/${params.doctorId}/edit`,
      clicked:"edit"
    },
    {
      title: "Additional Information",
      href: `/dashboard/doctors/${params.doctorId}/edit/additional-info`,
      clicked:"edit/additional-info"
    },
  ]
  return (
    <>
      <div className="space-y-6 p-5 pb-16 md:block">
        <div className="space-y-0.5">
          <BreadCrumb items={breadcrumbItems}  />
          <div className="flex flex-col md:flex-row gap-1 md:items-center md:justify-between  justify-start items-start">
            <Heading
              title={`Doctor Details`}
              description={doctor?.name}
            />
            {(!doctor?.is_verified) && <div className="px-0 md:px-4">
              <Approve successMessage="Request Approved Successfully" title="Approve Request" defualt method={AcceptDoctorRequest} id={doctor?.user_id} />
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
