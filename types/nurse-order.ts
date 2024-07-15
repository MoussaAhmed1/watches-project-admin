import { INurse } from "./nurses"

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
    nurse: INurse
    sent_offer: boolean
  }
  
  export interface User {
    phone:string
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
  
  export interface SingleNurseOrder {
    sentOffer: boolean
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    user_id: string
    status: string
    rate: any
    comment: any
    cancel_reason: any
    cancel_request: boolean
    address_id: string
    notes: any
    date_from: string
    date_to: string
    price: string
    nurse_id: any
    number: string
    user: User
    address: Address
    nurse: any
  }
  

  

  