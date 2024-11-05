export interface IWatch {
    id: string
    IMEI: string
    watch_user: WatchUser
  }


  
  export interface AddEditWatchBody {
    IMEI: string;
  }
  
  export interface WatchUser {
      id: string
      created_at: string
      updated_at: string
      deleted_at: any
      parent_id: string
      phone: string
      driver_id: any
      name: string
      gender: string
      birth_date: any
      avatar: string
      school_id: string
      school: any
      driver: any
      parent: any
    
  }