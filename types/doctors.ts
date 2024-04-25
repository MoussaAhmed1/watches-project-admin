export interface IDoctor {
    id: string
    avatar: string
    name: string
    rating: number
    specialization: Specialization
  }
  
  export interface Specialization {
    id: string
    name: string
  }
  export interface ISingleDoctor{
    id: string;
    avatar: string;
    name: string;
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