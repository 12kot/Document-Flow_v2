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

export type DiskProps = {
  searchValue: string,
  changeSearchText: (text: string) => void,
  shareFile: (file: UserFile, email: string) => Promise<void>,

  handleFile: (file: File) => Promise<void>
  removeFile: (file: UserFile) => Promise<void>,
  deleteUserOnFile: (file: UserFile, email: string) => Promise<void>
  createFolder: (folder: string) => Promise<void>,
  deleteFolder: () => Promise<void>,
  changeFileFolder: (file: UserFile, path: string) => Promise<void>

  isFilesLoading: boolean,
  isUploadLoading: boolean, 
  userEmail: string,
  folder?: string,
}