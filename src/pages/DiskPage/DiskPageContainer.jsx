import DiskPage from "./DiskPage";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch, changeSortType } from "../../store/slices/diskSlice";
import {
  addFile,
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

const DiskPageContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { search, sortType } = useSelector((state) => state.disk);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const files = await getUserFiles(user.email);
      dispatch(setFiles({ files }));
      setIsLoading(false);
    };

    fetchUserData();
  }, []);

  const changeSearchText = (text) => {
    dispatch(changeSearch({ text }));
    dispatch(searchFile({ text }));
  };

  const changeSortText = (text) => {
    dispatch(changeSortType({ text }));
  };

  const handleFile = async (file) => {
    alert("Отправляем файл на сервер.");

    let newFile = await uploadFile(file, user.email); //папка по email
    uploadFileDB(user.email, newFile); //переименовать
    dispatch(addFile({ ...newFile }));

    alert("Файл успешно загружен");
  };

  const deleteObj = async (path, fileID) => {
    alert("Начинаем выносить файл");

    await deleteFileStorage(path)
      .then(async () => {
        await deleteFileDB(user.email, fileID);
        dispatch(removeFile({ path }));

        alert("Файл был успешно удалён.");
      })
      .catch(console.log);
  };

  return (
    <DiskPage
      searchValue={search}
      changeSearchText={changeSearchText}
      sortTypeValue={sortType}
      changeSortText={changeSortText}
      handleFile={handleFile}
      removeFile={deleteObj}
      isLoading={isLoading}
    />
  );
};

export default DiskPageContainer;
