export interface IDoctor {
    id: string
    avatar: string
    name: string
    rating: number
    specialization: Specialization
  }
  
  export interface Specialization {
    id: string
    name: string
  }
  