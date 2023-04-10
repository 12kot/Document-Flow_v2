import deleteFileDB from "../../API/DB/deleteFileData";
import getUserData from "../../API/DB/getUserData";
import updateFileUsers from "../../API/DB/updateFileUsers";
import uploadFileDB from "../../API/DB/uploadFileData";
import deleteFileStorage from "../../API/Storage/deleteFileStorage";
import uploadFile from "../../API/Storage/uploadFileStorage";

export const share = async (file, newUserEmail, userEmail) => {
  if (!(await _checkUser(newUserEmail))) {
    alert("Пользователь не найден");
    return false;
  }

  if (!_checkAccess(file.ownerEmail, userEmail)) {
    alert("Вы не являетесь владельцем данного файла.");
    return false;
  }

  if (!_checkUsers(file.ownerEmail, newUserEmail, file.usersEmail)) {
    alert("Данный пользователь уже имеет доступ к этому файлу.");
    return false;
  }

  await uploadFileDB(newUserEmail, file); //добавляем файл к новому юзеру

  let usersEmail = [...file.usersEmail, file.ownerEmail, newUserEmail]; //все емейлы в кучу
  for (let user of usersEmail) {
    if (user) await updateFileUsers(user, file.id, usersEmail); //добавляем новый емейл во все экземпляры файла
  }

  alert("Поделились");
  return true;
};

export const upload = async (file, userEmail) => {
  let newFile = await uploadFile(file, userEmail);
  uploadFileDB(userEmail, newFile);
  return newFile;
};

export const deleteFile = async (file, userEmail) => {
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

  await deleteFileStorage(file.fullPath).then().catch(console.log); //удаляем из памяти
  for (let user of users) {
    await deleteFileDB(user, file.id);
    }
    
    alert("Удалили");
};

export const deleteAccess = async (file, oldUser, newUser) => {
  if (!(await _checkUser(newUser))) {
    alert("Пользователь не найден.");
    return false;
  }

  if (!_checkAccess(file.ownerEmail, oldUser)) {
    alert("Вы не являетесь владельцем файла");
    return false;
  }

  if (_checkUsers(file.ownerEmail, newUser, file.usersEmail)) {
    alert("У данного пользователя нет доступа к файлу");
    return false;
  }

  if (oldUser === newUser) {
    alert(
      "Вы не можете удалить доступ у самого себя. Воспользуйтесь кнопкой delete"
    );
    return false;
  }

  await deleteFile(file, newUser);
  alert("Доступ для пользователя успешно закрыт");
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
