export interface IBanner {
  id: string;
  banar: string;
  started_at: string;
  ended_at: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description?: string;
  doctor_id?: string;
}
