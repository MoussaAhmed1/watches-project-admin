export interface IDoctor {
  id: string;
  user_id: string;
  avatar: string;
  name: string;
  rating: number;
  specialization: Specialization;
}

export interface Specialization {
  id: string;
  name: string;
}
export interface ISingleDoctor {
  is_verified: boolean;
  id: string;
  user_id: string;
  avatar: string;
  name: string;
  first_name: string;
  last_name: string;
  experience: number;
  summery: string;
  rating: number;
  specialization: {
    id: string;
    name: string;
  };
  video_consultation_price: string;
  voice_consultation_price: string;
  home_consultation_price: string;
  clinic_consultation_price: string;
  clinic: {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    is_active: boolean;
  };
}
