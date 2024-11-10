export interface HistoryOfRequests {
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    user_id: string
    watch_user_id: string
    status: string
    code: number
    user: User
    watch_user: WatchUser
    is_parent: boolean
    driver: any
    parent: Parent
  }
  
  export interface ISingleRequest {
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    user_id: string
    watch_user_id: string
    status: string
    code: number
    user: User
    watch_user: WatchUser
    is_parent: boolean
    driver: Driver
    parent: Parent
  }

  export interface Driver {
    id: string
    name: string
    phone: string
    gender: string
    email: string
    avatar: string
    created_at: string
    school: any
  }
  
  export interface User {
    id: string
    name: string
    phone: string
    gender: string
    email: string
    avatar: string
    created_at: string
    school: any
  }
  
  export interface WatchUser {
    email: string
    phone: string
    id: string
    name: string
    avatar: string
    created_at: string
    school: School
  }
  
  export interface School {
    id: string
    name: string
    avatar: string
  }
  
  export interface Parent {
    phone: string
    id: string
    name: string
    email: string
    avatar: any
    created_at: string
    school: any
  }
  