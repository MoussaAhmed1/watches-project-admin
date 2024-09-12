export interface IDoctor {
  id: string;
  user_id: string;
  avatar: string;
  name: string;
  rating: number;
  phone: number|string;
  specialization: Specialization;
}

export interface Specialization {
  id: string;
  name: string;
}
export interface ISingleDoctor {
  id: string
  user_id: string
  is_verified: boolean
  avatar: string
  cover_image: string
  first_name: string
  last_name: string
  phone: string
  name: string
  experience: number
  summery: string
  rating: number
  specialization: Specialization
  video_consultation_price: string
  voice_consultation_price: string
  home_consultation_price: string
  clinic_consultation_price: string
  clinic: Clinic
  licenses: License[]
  availibilty:Avaliablity[]
}


export interface DoctorAdditionalInfo {
  is_urgent: boolean;
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  user_id: string
  is_busy: boolean
  year_of_experience: number
  specialization_id: string
  clinic_id: string
  summery: string
  cover_image: string
  latitude: number
  rating: string
  number_of_reviews: number
  longitude: number
  is_verified: boolean
  video_consultation_price: string
  voice_consultation_price: string
  home_consultation_price: string
  clinic_consultation_price: string
  is_urgent_doctor: boolean
  specialization: Specialization
  licenses: License[]
  avaliablity: Avaliablity[]
  clinic: Clinic
}

export interface Specialization {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  name: string
}

export interface License {
  id: string
  image: string
}

export interface Avaliablity {
  id: string
  day: number
  start_at: string
  end_at: string
  is_active: boolean
}

export interface Clinic {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  is_active: boolean
}
