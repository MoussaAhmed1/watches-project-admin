export interface  PharmacyCategories {
  id: string;
  name: string;
  name_ar?: string;
  name_en?: string;
}

export interface AddEditPharmacyCategoriesBody {
  name_ar: string;
  name_en: string;
}
