import DiskPage from "./DiskPage";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch, changeSortType } from "../../store/slices/diskSlice";
import { addFile, removeFile, searchFile } from "../../store/slices/userSlice";
import uploadFile from "../../API/uploadFileStorage";
import deleteFileStorage from "../../API/deleteFileStorage";
import uploadFileDB from "../../API/uploadFileDB";
import deleteFileDB from "../../API/deleteFileDB";

const DiskPageContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { search, sortType } = useSelector((state) => state.disk);

  const changeSearchText = (text) => {
    dispatch(changeSearch({ text }));
    dispatch(searchFile({ text }));
  };

  const changeSortText = (text) => {
    dispatch(changeSortType({ text }));
  };

  const handleFile = async (file) => {
    alert("Отправляем файл на сервер.");

    let newFile = await uploadFile(file, user.uid); //папка по uid
    uploadFileDB(user, newFile); //переименовать
    dispatch(addFile({ ...newFile }));

    alert("Файл успешно загружен");
  };

  const deleteObj = async (path, fileID) => {
    alert("Начинаем выносить файл");

    await deleteFileStorage(path)
      .then(async () => {
        await deleteFileDB(user.uid, fileID);
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
    />
  );
};

export default DiskPageContainer;
