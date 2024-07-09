export interface IClientPackage {
  id: string;
  name: string;
  name_en: string;
  name_ar: string;
  price: string;
  expiration_days: number;
  description: string;
  description_en: string;
  description_ar: string;
  number_of_pharmacy_order: number;
  updated_at: string;
  created_at: string;
}
export interface IPharmacyPackage {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  price: number;
  advantage_mins: number;
  expiration_days: number;
}
