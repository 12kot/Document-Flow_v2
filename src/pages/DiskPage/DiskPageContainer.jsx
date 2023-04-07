//раскидать функции по разным файлам

import DiskPage from "./DiskPage";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, changeSortType, setShareEmailText } from "../../store/slices/diskSlice";
import {
  addFile,
  addUserOnFile,
  removeFile,
  searchFile,
  setFiles,
} from "../../store/slices/userSlice";
import uploadFile from "../../API/Storage/uploadFileStorage";
import deleteFileStorage from "../../API/Storage/deleteFileStorage";
import uploadFileDB from "../../API/DB/uploadFileData";
import deleteFileDB from "../../API/DB/deleteFileData";
import { useEffect, useState } from "react";
import getUserFiles from "../../API/DB/getUserFiles";
import getUserData from "../../API/DB/getUserData";
import updateFileUsers from "../../API/DB/updateFileUsers";

const DiskPageContainer = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const { search, sortType } = useSelector((state) => state.disk);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const files = await getUserFiles(currentUser.email);
      dispatch(setFiles({ files }));
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  //эти 3 перекинуть в другой файл
  const changeSearchText = (text) => {
    dispatch(setSearchText({ text }));
    dispatch(searchFile({ text }));
  };

  const changeSortText = (text) => {
    dispatch(changeSortType({ text }));
  };

  //эти 3 перекинуть в другой файл
  const shareFile = async (file, shareEmailText) => {
    let user = await getUserData(shareEmailText);
    if (!user.email) { alert("User not found"); return; }
    if (file.ownerEmail === shareEmailText || file.usersEmail.includes(shareEmailText)) { alert("Данный пользователь уже имеет доступ к этому файлу."); return; }
    if (file.ownerEmail !== currentUser.email) { alert("Вы не являетесь владельцем данного файла."); return; }

    await uploadFileDB(shareEmailText, file); //добавляем файл к новому юзеру
    
    let usersEmail = [...file.usersEmail, file.ownerEmail, shareEmailText]; //все емейлы в кучу
    for (user of usersEmail) {
      if(user)
        await updateFileUsers(user, file.id, usersEmail); //добавляем новый емейл во все экземпляры файла
    }
    
    dispatch(addUserOnFile({ fileId: file.id, userEmail: shareEmailText })); //добавляем нового юзера в локальный стейт
    alert("Вы успешно поделились файлом.")
  }

  const handleFile = async (file) => {
    alert("Отправляем файл на сервер.");

    let newFile = await uploadFile(file, currentUser.email); //папка по email
    uploadFileDB(currentUser.email, newFile); //переименовать
    dispatch(addFile({ ...newFile }));

    alert("Файл успешно загружен");
  };

  const deleteFile = async (path, fileID) => {
    alert("Начинаем выносить файл");

    await deleteFileStorage(path)
      .then(async () => {
        await deleteFileDB(currentUser.email, fileID);
        dispatch(removeFile({ path }));

        alert("Файл был успешно удалён.");
      })
      .catch(console.log);
  };

  return (
    <DiskPage
      searchValue={search}
      changeSearchText={changeSearchText}
      
      shareFile={shareFile}
      
      sortTypeValue={sortType}
      changeSortText={changeSortText}
      
      handleFile={handleFile}
      removeFile={deleteFile}
      
      isLoading={isLoading}
      userEmail={currentUser.email}
      />
      );
};

export default DiskPageContainer;
