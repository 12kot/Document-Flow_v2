export type UserFile = {
  folder: string;
  fullPath: string;
  id: string;
  isHiden: boolean;
  name: string;
  ownerEmail: string;
  path: string;
  usersEmail: string[];
};

export type User = {
  email: string;
  token: string;
  uid: string;
  files: UserFile[];
  isLoggedIn: boolean;
  name?: string;
  folders: string[];
};