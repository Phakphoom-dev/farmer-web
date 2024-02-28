export interface IUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  createdAt: string; // Assuming createdAt and updatedAt are strings for simplicity
  updatedAt: string;
  roleId: number;
  role: {
    id: number;
    rolename: string;
  };
}
