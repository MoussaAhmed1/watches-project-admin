export interface INurse {
  user_id: string
  id: string
  name: string
  avatar: string
  rating: number
  phone: string
}
export interface ISingleNurse {
  id: string
  name: string
  avatar: string
  rating: number
  phone: string
  license_images: LicenseImage[]
  experience: number
  summery: string
  user_id: string
  is_verified: boolean
}

export interface NurseAdditionalInfo {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  user_id: string
  is_verified: boolean
  experience: number
  summary: string
  rating: any
  license_images: LicenseImage[]
}



export interface LicenseImage {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  image: string
  nurse_id: string
}