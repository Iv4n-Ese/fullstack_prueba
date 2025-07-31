export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pendiente' | 'completado';
  created_at?: string;
  updated_at?: string;
}
