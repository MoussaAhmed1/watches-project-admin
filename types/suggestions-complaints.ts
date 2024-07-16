export interface SuggestionsComplaints {
  created_at: string
  id: string
  title: string
  description: string
  email: string
  user: User
}

export interface User {
  phone: string
  id: string
  avatar: string
  name: string
}
