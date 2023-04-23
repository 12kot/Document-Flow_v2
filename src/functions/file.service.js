import deleteFileDB from "../API/DB/File/deleteFileData";
import updateFileUsers from "../API/DB/File/updateFileUsers";
import uploadFileDB from "../API/DB/File/uploadFileData";

import getUserByName from "../API/DB/User/getUserByName";
import getUserData from "../API/DB/User/getUserData";
import getUserFiles from "../API/DB/User/getUserFiles";

import deleteFileStorage from "../API/Storage/deleteFileStorage";
import uploadFile from "../API/Storage/uploadFileStorage";
import HandleMessage from "./HandleMessage";

export const share = async (file, newUserEmail, userEmail) => {
  newUserEmail = newUserEmail.toLowerCase();
  userEmail = userEmail.toLowerCase();
  
  if (!newUserEmail || newUserEmail.trim().length === 0) {
    HandleMessage("Поле должно быть заполнено", "error");
    return false;
  }
  
  HandleMessage("Начинаем делиться", "info");

  if (!newUserEmail.includes("@"))
    newUserEmail = await getUserByName(newUserEmail);

  if (!newUserEmail) {
    HandleMessage("Пользователь с таким именем не найден", "error");
    return false;
  }

  if (!_checkAccess(file.ownerEmail, userEmail)) {
    HandleMessage("Вы не являетесь владельцем данного файла", "error");
    return false;
  }

  if (!(await _checkUser(newUserEmail))) {
    HandleMessage("Пользователь не найден", "error");
    return false;
  }

  if (!_checkUsers(file.ownerEmail, newUserEmail, file.usersEmail)) {
    HandleMessage(
      "Данный пользователь уже имеет доступ к этому файлу",
      "error"
    );
    return false;
  }

  let newFile = {...file, folder: ""}
  await uploadFileDB(newUserEmail, newFile); //добавляем файл к новому юзеру

  let usersEmail = [...file.usersEmail, file.ownerEmail, newUserEmail]; //все емейлы в кучу
  for (let user of usersEmail) {
    if (user.toLowerCase())
      await updateFileUsers(user.toLowerCase(), file.id, usersEmail); //добавляем новый емейл во все экземпляры файла
  }

  HandleMessage("Поделились", "success");
  return newUserEmail;
};

export const upload = async (file, userEmail, filesState, folder) => {
  if (!file) {
    HandleMessage("Выберите файл", "error");
    return false;
  }
  
  HandleMessage("Загружаем файл", "info");

  const files = await getUserFiles(userEmail);
  if (!_checkFilesName(file.name, files)) {
    HandleMessage("Файл с таким названием уже существует", "error");
    return false;
  }
  if (!_checkFilesName(file.name, filesState)) {
    HandleMessage("Файл с таким названием уже существует", "error");
    return false;
  }

  userEmail = userEmail.toLowerCase();

  let newFile = await uploadFile(file, userEmail);
  newFile.folder = folder;
  
  await uploadFileDB(userEmail, newFile);

  HandleMessage("Файл был успешно загружен", "success");
  return newFile;
};

export const deleteFile = async (file, userEmail) => {
  userEmail = userEmail.toLowerCase();
  HandleMessage("Начинаем удалять", "info");

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
    .catch((error) => HandleMessage(error, "error")); //удаляем из памяти

  for (let user of users) {
    await deleteFileDB(user.toLowerCase(), file.id);
  }

  HandleMessage("Удалили", "success");
};

export const deleteAccess = async (file, oldUser, newUser) => {
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

const _checkFilesName = (name, files) => {
  for (let file of files) {
    if (file.name === name) return false;
  }

  return true;
};

const _checkUser = async (newUser) => {
  newUser = newUser.toLowerCase();
  if (newUser.trim() === "") return false;

  let user = await getUserData(newUser);

  if (!user.email) {
    return false;
  }

  return true;
};

const _checkAccess = (ownerEmail, oldUser) => {
  if (ownerEmail.toLowerCase() !== oldUser.toLowerCase()) {
    return false;
  }

  return true;
};

const _checkUsers = (ownerEmail, userEmail, users) => {
  if (
    ownerEmail.toLowerCase() === userEmail.toLowerCase() ||
    users.includes(userEmail.toLowerCase())
  ) {
    return false;
  }

  return true;
};
