export interface IReview {
    rating: string
    Comment: any
    order_number: string
    user: User
  }
  
  export interface User {
    name: string
    id: string
  }