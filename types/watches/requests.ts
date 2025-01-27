export interface HistoryOfRequests {
  number: string | number;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user_id: string;
  watch_user_id: string;
  status: string;
  code: number;
  user: User;
  watch_user: WatchUser;
  is_parent: boolean;
  driver: any;
  parent: Parent;
  grade: { id: string, name: string }
}

export interface ISingleRequest {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  user_id: string;
  watch_user_id: string;
  status: string;
  code: number;
  number: string;
  user: User;
  watch_user: WatchUser;
  is_parent: boolean;
  drivers: Driver[];
  parent: Parent;
  grade: { id: string, name: string }
}

export interface User {
  id: string;
  name: string;
  phone: string;
  gender: any;
  email: string;
  avatar: string;
  created_at: string;
  school: any;
}

export interface WatchUser {
  id: string;
  name: string;
  phone: string;
  gender: string;
  avatar: string;
  created_at: string;
  school: School;
}

export interface School {
  id: string;
  name: string;
  avatar: string;
  city_code: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  gender: string;
  email: string;
  avatar?: string;
  created_at: string;
  school: any;
}

export interface Parent {
  id: string;
  name: string;
  phone: string;
  gender: any;
  email: string;
  avatar: string;
  created_at: string;
  school: any;
}

export interface WatchUser {
  email: string;
  phone: string;
  id: string;
  name: string;
  avatar: string;
  created_at: string;
  school: School;
}

export interface School {
  id: string;
  name: string;
  avatar: string;
}
