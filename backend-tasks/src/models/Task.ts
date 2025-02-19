export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    status: 'pending' | 'in-progress' | 'completed';
    idUser?: number;
  }
  
  