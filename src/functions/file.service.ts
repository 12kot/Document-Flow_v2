import deleteFileDB from "../API/DB/File/deleteFileData";
import updateFileUsers from "../API/DB/File/updateFileUsers";
import uploadFileDB from "../API/DB/File/uploadFileData";

import getUserByName from "../API/DB/User/getUserByName";
import getUserData from "../API/DB/User/getUserData";
import getUserFiles from "../API/DB/User/getUserFiles";

import deleteFileStorage from "../API/Storage/deleteFileStorage";
import uploadFile from "../API/Storage/uploadFileStorage";
import { UserFile } from "../Types/Types";
import HandleMessage from "./HandleMessage";

export const share = async (
  file: UserFile,
  newUserEmail: string,
  userEmail: string
): Promise<string> => {
  newUserEmail = newUserEmail.toLowerCase();
  userEmail = userEmail.toLowerCase();

  if (!newUserEmail || newUserEmail.trim().length === 0) {
    HandleMessage("Поле должно быть заполнено", "error");
    return "";
  }

  HandleMessage("Начинаем делиться", "info");

  if (!newUserEmail.includes("@"))
    newUserEmail = await getUserByName(newUserEmail);

  if (!newUserEmail) {
    HandleMessage("Пользователь с таким именем не найден", "error");
    return "";
  }

  if (!_checkAccess(file.ownerEmail, userEmail)) {
    HandleMessage("Вы не являетесь владельцем данного файла", "error");
    return "";
  }

  if (!(await _checkUser(newUserEmail))) {
    HandleMessage("Пользователь не найден", "error");
    return "";
  }

  if (!_checkUsers(file.ownerEmail, newUserEmail, file.usersEmail)) {
    HandleMessage(
      "Данный пользователь уже имеет доступ к этому файлу",
      "error"
    );
    return "";
  }

  let newFile = { ...file, folder: "" };
  await uploadFileDB(newUserEmail, newFile); //добавляем файл к новому юзеру

  let usersEmail = [...file.usersEmail, file.ownerEmail, newUserEmail]; //все емейлы в кучу
  for (let user of usersEmail) {
    if (user.toLowerCase())
      await updateFileUsers(user.toLowerCase(), file.id, usersEmail); //добавляем новый емейл во все экземпляры файла
  }

  HandleMessage("Поделились", "success");
  return newUserEmail;
};

export const upload = async (
  file: File,
  userEmail: string,
  filesState: UserFile[],
  folder: string
): Promise<UserFile | void> => {
  if (!file) {
    HandleMessage("Выберите файл", "error");
    return;
  }

  HandleMessage("Загружаем файл", "info");

  const files = await getUserFiles(userEmail);

  if (!_checkFilesName(file.name, files)) {
    HandleMessage("Файл с таким названием уже существует", "error");
    return;
  }
  if (!_checkFilesName(file.name, filesState)) {
    HandleMessage("Файл с таким названием уже существует", "error");
    return;
  }

  userEmail = userEmail.toLowerCase();

  let newFile: UserFile | void = await uploadFile(file, userEmail);
  if (newFile) {
    newFile.folder = folder;
    await uploadFileDB(userEmail, newFile);

    HandleMessage("Файл был успешно загружен", "success");
  }

  return newFile;
};

export const deleteFile = async (file: UserFile, userEmail: string): Promise<void> => {
  userEmail = userEmail.toLowerCase();

  let users = [...file.usersEmail];
  if (!file.usersEmail.includes(file.ownerEmail)) users.push(file.ownerEmail);

  if (file.ownerEmail !== userEmail) {
    await deleteFileDB(userEmail, file.id);

    let newUsers = users.filter((user) => user !== userEmail);
    for (let user of newUsers) {
      await updateFileUsers(user.toLowerCase(), file.id, newUsers);
    }

    return;
  }

  await deleteFileStorage(file.fullPath)
    .then()
    .catch((error: Error) => HandleMessage(error, "error")); //удаляем из памяти

  for (let user of users) {
    await deleteFileDB(user.toLowerCase(), file.id);
  }
};

export const deleteAccess = async (
  file: UserFile,
  oldUser: string,
  newUser: string
): Promise<boolean> => {
  oldUser = oldUser.toLowerCase();
  newUser = newUser.toLowerCase();

  if (!(await _checkUser(newUser))) {
    HandleMessage("Пользователь не найден", "error");
    return false;
  }

  if (!_checkAccess(file.ownerEmail, oldUser)) {
    HandleMessage("Вы не являетесь владельцем файла", "error");
    return false;
  }

  if (_checkUsers(file.ownerEmail, newUser, file.usersEmail)) {
    HandleMessage("У данного пользователя нет доступа к файлу", "error");
    return false;
  }

  if (oldUser === newUser) {
    HandleMessage(
      "Вы не можете удалить доступ у самого себя. Воспользуйтесь кнопкой delete",
      "error"
    );
    return false;
  }

  HandleMessage("Начинаем закрывать доступ", "info");

  await deleteFile(file, newUser);
  HandleMessage("Доступ для пользователя успешно закрыт", "success");
  return true;
};

const _checkFilesName = (name: string, files: UserFile[]): boolean => {
  for (let file of files) {
    if (file.name === name) return false;
  }

  return true;
};

const _checkUser = async (newUser: string): Promise<boolean> => {
  newUser = newUser.toLowerCase();
  if (newUser.trim() === "") return false;

  let user = await getUserData(newUser);

  if (!user) return false;

  if (!user.email) return false;

  return true;
};

const _checkAccess = (ownerEmail: string, oldUser: string): boolean => {
  if (ownerEmail.toLowerCase() !== oldUser.toLowerCase()) {
    return false;
  }

  return true;
};

const _checkUsers = (
  ownerEmail: string,
  userEmail: string,
  users: string[]
): boolean => {
  if (
    ownerEmail.toLowerCase() === userEmail.toLowerCase() ||
    users.includes(userEmail.toLowerCase())
  ) {
    return false;
  }

  return true;
};
