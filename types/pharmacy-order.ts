import { ClientInfo } from "./reservations";

export interface PharmacyOrder {
  id: string;
  status: string;
  created_at: string;
  number: string;
  categories: any[];
  user_id: string;
  user: ClientInfo;
  drugs: any[];
  notes: any;
  attachments: any[];
  voice_recording: VoiceRecording[];
  has_replied: boolean;
  address: Address;
}

export interface Address {
  address: string;
  name: string;
  latitude: number;
  longitude: number;
}
interface VoiceRecording {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  file: string;
  type: string;
  ph_order_id: string;
}

export interface PharmacyData {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  pharmacy_id: string;
  order_id: string;
  note: string | null;
  price: string;
  address: string;
  phone: string;
  availability: string;
  pharmacy: Pharmacy;
}
interface Pharmacy {
  id: string;
  name: string;
  logo: string[];
}