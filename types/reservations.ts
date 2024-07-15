export interface IReservation {
  rate: string;
  end_date: string;
  id: string;
  number: string;
  is_urgent: boolean;
  created_at: string;
  note: any;
  start_date: string;
  phone: any;
  doctor_agora_token: string;
  client_agora_token: string;
  status: string;
  reservationType: string;
  specialization: Specialization;
  attachments: Attachment[];
  doctor: Doctor;
  family_member: any;
  client_info: ClientInfo;
}

export interface Specialization {
  id: string;
  name: string;
}

export interface Doctor {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  clinic: Clinic;
  rating: number;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  is_active: boolean;
}

export interface ClientInfo {
  phone: string;
  kinship: string;
  id: string;
  name: string;
  avatar: string;
  height: any;
  weight: any;
  allergic_reactions: any;
  notes: any;
  address: any;
}
export interface FamilyMember {
  id: string
  name: string
  height: string
  weight: string
  kinship: string
  allergic_reactions: string
  notes: string
}
export interface Nurse {
  phone: string;
  name: string;
  avatar: string;
  rating: number;

}

export interface Attachment {
  file: string;
  provider: string;
}

export interface ISingleReservation {
  rate: string;
  end_date: string;
  id: string;
  number: string;
  is_urgent: boolean;
  created_at: string;
  note: string;
  cancel_reason: any;
  cancel_request: boolean;
  start_date: string;
  phone: string;
  doctor_agora_token: string;
  client_agora_token: string;
  status: string;
  reservationType: string;
  specialization: Specialization;
  attachments: Attachment[];
  doctor: Doctor;
  family_member: any;
  client_info: ClientInfo;
}
