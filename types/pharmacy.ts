export interface IPharmacy {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user_id: string;
  ph_name: string;
  is_verified: boolean;
  open_time: string;
  close_time: string;
  expierence: number;
  summery: string;
  address: string;
  latitude: number;
  longitude: number;
  categories: Category[];
  attachments: Attachment[];
  logo: Logo[];
  license: License[];
}

export interface Category {
  id: string;
  name: string;
  name_en: string;
  name_ar: string;
}
export interface Drug {
  id: string;
  category_id: string;
  name: string;
  name_ar: string;
  name_en: string;
}

export interface Attachment {
  id: string;
  file: string;
  type: string;
  pharmacy_id: string;
}

export interface Logo {
  image: string;
  id: string;
}

export interface License {
  mage: string;
  id: string;
}


export interface PharmacyAddtionalInfo {
  id: string
  ph_name: string
  open_time: string
  close_time: string
  expierence: number
  user: User
  address: string
  summery: string
  latitude: number
  longitude: number
  created_at: string
  logo: Logo[]
  license: License[]
  categories: Category[]
  is_verified: boolean
}

export interface User {
  name: string
  id: string
  avatar: any
}


