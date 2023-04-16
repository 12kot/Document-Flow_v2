import deleteFileDB from "../../API/DB/deleteFileData";
import getUserData from "../../API/DB/getUserData";
import updateFileUsers from "../../API/DB/updateFileUsers";
import uploadFileDB from "../../API/DB/uploadFileData";
import deleteFileStorage from "../../API/Storage/deleteFileStorage";
import uploadFile from "../../API/Storage/uploadFileStorage";
import HandleMessage from "../../functions/HandleMessage";

export const share = async (file, newUserEmail, userEmail) => {
  if (!newUserEmail || newUserEmail.trim().length === 0) {
    HandleMessage("Поле должно быть заполнено", false);
    return false;
  }

  if (!_checkAccess(file.ownerEmail, userEmail)) {
    HandleMessage("Вы не являетесь владельцем данного файла", false);
    return false;
  }
  
  if (!(await _checkUser(newUserEmail))) {
    HandleMessage("Пользователь не найден", false);
    return false;
  }

  if (!_checkUsers(file.ownerEmail, newUserEmail, file.usersEmail)) {
    HandleMessage("Данный пользователь уже имеет доступ к этому файлу", false);
    return false;
  }

  HandleMessage("Начинаем делиться", true);
  
  await uploadFileDB(newUserEmail, file); //добавляем файл к новому юзеру

  let usersEmail = [...file.usersEmail, file.ownerEmail, newUserEmail]; //все емейлы в кучу
  for (let user of usersEmail) {
    if (user) await updateFileUsers(user, file.id, usersEmail); //добавляем новый емейл во все экземпляры файла
  }

  HandleMessage("Поделились", true);
  return true;
};

export const upload = async (file, userEmail) => {
  let newFile = await uploadFile(file, userEmail);
  await uploadFileDB(userEmail, newFile);
  return newFile;
};

export const deleteFile = async (file, userEmail) => {
  HandleMessage("Начинаем удалять", true);

  let users = [...file.usersEmail];
  if (!file.usersEmail.includes(file.ownerEmail)) users.push(file.ownerEmail);

  if (file.ownerEmail !== userEmail) {
    await deleteFileDB(userEmail, file.id);

    let newUsers = users.filter((user) => user !== userEmail);
    for (let user of newUsers) {
      await updateFileUsers(user, file.id, newUsers);
    }

    return;
  }

  await deleteFileStorage(file.fullPath).then().catch((error) => HandleMessage(error, false)); //удаляем из памяти
  
  for (let user of users) {
    await deleteFileDB(user, file.id);
  }
  
  HandleMessage("Удалили", true);
};

export const deleteAccess = async (file, oldUser, newUser) => {
  if (!(await _checkUser(newUser))) {
    HandleMessage("Пользователь не найден", false);
    return false;
  }

  if (!_checkAccess(file.ownerEmail, oldUser)) {
    HandleMessage("Вы не являетесь владельцем файла", false);
    return false;
  }

  if (_checkUsers(file.ownerEmail, newUser, file.usersEmail)) {
    HandleMessage("У данного пользователя нет доступа к файлу", false);
    return false;
  }

  if (oldUser === newUser) {
    HandleMessage(
      "Вы не можете удалить доступ у самого себя. Воспользуйтесь кнопкой delete", false
    );
    return false;
  }

  HandleMessage("Начинаем закрывать доступ", true);

  await deleteFile(file, newUser);
  HandleMessage("Доступ для пользователя успешно закрыт", false);
  return true;
};

const _checkUser = async (newUser) => {
  if (newUser.trim() === "") return false;

  let user = await getUserData(newUser);

  if (!user.email) {
    return false;
  }

  return true;
};

const _checkAccess = (ownerEmail, oldUser) => {
  if (ownerEmail !== oldUser) {
    return false;
  }

  return true;
};

const _checkUsers = (ownerEmail, userEmail, users) => {
  if (ownerEmail === userEmail || users.includes(userEmail)) {
    return false;
  }

  return true;
};
