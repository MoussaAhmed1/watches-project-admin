export interface PharmacyOrder {
    id: string
    status: string
    created_at: string
    number: string
    categories: any[]
    user_id: string
    user: User
    drugs: any[]
    notes: any
    attachments: any[]
    voice_recording: VoiceRecording[]
    has_replied: boolean
  }
  
   interface User {
    name: string
    avatar: string
  }
  
   interface VoiceRecording {
    id: string
    created_at: string
    updated_at: string
    deleted_at: any
    file: string
    type: string
    ph_order_id: string
  }
  