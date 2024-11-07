export interface ISpecializations {
  id: string;
  name: string;
  name_ar?: string;
  name_en?: string;
}
export interface AddEditSpecializationBody {
  id?: string;
  name_ar: string;
  name_en: string;
}
