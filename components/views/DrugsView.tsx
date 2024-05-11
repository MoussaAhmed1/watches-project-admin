"use client"

import { Category, Drug } from "@/types/pharmacy"
import DrugColumns from "../tables/pharmacy/drugs/columns"
import { SharedTable } from "../tables/shared/Shared-table"

interface IProps{
    page:number
    totalProducts:number
    pageCount:number
    categories:Category[];
    Pharmacy_products:Drug[]

}

function DrugsView({page,categories,totalProducts,Pharmacy_products,pageCount}:IProps) {
  return (
    <SharedTable
    searchKey="Pharmacy Products"
    pageNo={page}
    columns={DrugColumns({categories})}
    totalitems={totalProducts}
    data={Pharmacy_products as unknown as Drug[]}
    pageCount={pageCount}
  />
  )
}

export default DrugsView