import { Role } from "./patients"

export interface Notification {
    id: string
    title_ar: string
    title_en: string
    text_ar: string
    text_en: string
    url: string
    type: string
    is_read: boolean
    seen_at: any
    created_at: string
    role: string
  }
  
  export interface SingleNotification {
    id: string
    title_ar: string
    title_en: string
    text_ar: string
    text_en: string
    url: string
    type: string
    is_read: boolean
    seen_at: any
    created_at: string
    role: Role
    users?: User[]
  }
  
  export interface User {
    id: string
    avatar: string
    name: string
  }
  