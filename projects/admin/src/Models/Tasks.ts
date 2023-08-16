export interface Tasks {
  title: string;
  userId: string;
  image: object;
  description: string;
  deadline: string;
};

export interface User {
  userId: string;
}

export interface PeriodicElement {
  title: string;
  user: string;
  deadline: string;
  status: string;
}
