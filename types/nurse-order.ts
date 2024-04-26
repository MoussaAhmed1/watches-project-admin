export interface INurseOrder {
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    user_id: string
    status: string
    rate: any
    comment: any
    cancel_reason: string
    cancel_request: boolean
    address_id: string
    notes: any
    date_from: string
    date_to: string
    nurse_id: string
    number: string
    user: User
    address: Address
    nurse: Nurse
    sent_offer: boolean
  }
  
  export interface User {
    name: string
    id: string
    avatar: string
  }
  
  export interface Address {
    id: string
    address: string
    latitude: number
    longitude: number
  }
  
  export interface Nurse {
    name: string
    avatar: string
    phone: string
    rating: number
  }
  