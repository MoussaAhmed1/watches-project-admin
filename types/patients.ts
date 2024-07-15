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
}

export interface AccountProfile {
  permissions: string[];
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
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  user_id: string
  height: string
  weight: string
  allergic_reactions: string
  notes: string
}
