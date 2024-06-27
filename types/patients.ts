export interface IPatient {
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
