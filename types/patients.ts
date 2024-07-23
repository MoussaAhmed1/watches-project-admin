export interface IUser {
  id: string;
  account: string;
  first_name: string;
  last_name: string;
  avatar: string;
  username: string;
  email: any;
  email_verified_at: any;
  phone: string;
  phone_verified_at: string;
  birth_date: string;
  gender: string;
  language: string;
  fcm_token: string;
  premessions: string[];
}

export interface AccountProfile {
  premessions: string[];
  id: string;
  account: string;
  first_name: string;
  last_name: string;
  avatar: string;
  username: string;
  email: any;
  email_verified_at: any;
  phone: string;
  phone_verified_at: any;
  birth_date: string;
  gender: "male" | "female";
  language: string;
}

export interface ClientAddtionalInfo {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user_id: string;
  height: string;
  weight: string;
  allergic_reactions: string;
  notes: string;
}

export enum Role {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  DOCTOR = "DOCTOR",
  PHARMACY = "PHARMACY",
  NURSE = "NURSE",
}

export interface FamilyMember {
  id: string;
  client_id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  kinship: string;
  birth_date: string;
  gender: string;
  height: string;
  weight: string;
  allergic_reactions: string;
  notes: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
