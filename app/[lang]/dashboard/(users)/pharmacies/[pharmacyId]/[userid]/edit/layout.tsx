import { AcceptPharmacyRequest, fetchSinglePharmacy } from "@/actions/pharmacies"
import { getDictionary } from "@/app/[lang]/messages"
import BreadCrumb from "@/components/breadcrumb"
import Approve from "@/components/details/role-details/Approve"
import { SidebarNav } from "@/components/sideBar/sidebar-nav"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { IPharmacy } from "@/types/pharmacy"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "update Pharmacy",
  description: "Pharmacy information update",
}


interface updateLayoutProps {
  children: React.ReactNode,
  params: { lang: "ar" | "en", pharmacyId: string, userid: string }
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Renders a layout for the pharmacy update page
 * @param {object} param0 - An object containing the lang and pharmacyId parameters
 * @param {string} param0.lang - The language of the page
 * @param {string} param0.pharmacyId - The id of the pharmacy to be updated
 * @param {ReactNode} children - The children components to be rendered inside the layout
 * @returns {ReactElement} - The rendered layout
 */
/******  970ae03f-4f4b-42c0-9d12-49e8a5e49f9f  *******/
export default async function updateLayout({ children, params }: updateLayoutProps) {
  const lang = params.lang;
  const res = await fetchSinglePharmacy(params.pharmacyId);
  const pharmacy: IPharmacy = res?.data?.data;
  const { navigation, shared, pages } = await getDictionary(lang)

  const breadcrumbItems = [
    { title: navigation.pharmacies, link: "/dashboard/pharmacies" },
    { title: shared.update, link: `/dashboard/pharmacies/${pharmacy?.ph_name}` },
  ];
  const sidebarNavItems = [
    {
      title: pages.users.profile,
      href: `/${lang}/dashboard/pharmacies/${params.pharmacyId}/${params.userid}/edit`,
      clicked:"edit"
    },
    {
      title: pages.users.additionalInfo,
      href: `/${lang}/dashboard/pharmacies/${params.pharmacyId}/${params.userid}/edit/additional-info`,
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
              title={pages.users.updatePharmacy}
              description={pharmacy?.ph_name}
            />
            {(!pharmacy?.is_verified) && <div className="px-0 md:px-4">
              <Approve successMessage={pages.users.requestApprovedSuccessfully} title={pages.users.approveRequest} defualt method={AcceptPharmacyRequest} id={pharmacy?.user_id} />
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
