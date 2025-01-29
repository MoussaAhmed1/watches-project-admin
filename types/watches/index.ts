import { School } from "../users";
import { Driver, Parent } from "./requests";

export interface IWatch {
  id: string;
  IMEI: string;
  watch_user: WatchUser;
}

export interface AddEditWatchBody {
  IMEI: string;
  id?: string;
}

export interface WatchUser {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  parent_id: string;
  phone: string;
  name: string;
  gender: string;
  birth_date: any;
  avatar: string;
  school_id: string;
  parent: Parent;
  school: School;
  drivers: Driver[];
  grade: {
    id: string,
    name_ar: string,
    name_en: string,
    order_by: number,
    academic_stage: string
  }
}
