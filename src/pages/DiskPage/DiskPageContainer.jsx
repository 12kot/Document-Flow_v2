import DiskPage from "./DiskPage";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch, changeSortType } from "../../store/slices/diskSlice";
import uploadFile from "../../API/uploadFile";
import { addFile, searchFile } from "../../store/slices/userSlice";

const DiskPageContainer = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.user.email);
  const { search, sortType } = useSelector((state) => state.disk);

  const changeSearchText = (text) => {
    dispatch(changeSearch({ text }));
    dispatch(searchFile({ text }));
  };

  const changeSortText = (text) => {
    dispatch(changeSortType({ text }));
  };

  const handleFile = async (file) => {
    alert("Отправляем файл на сервер.")
    
    let newFile = await uploadFile(file, email);

    dispatch(addFile({ ...newFile }));
    alert("Файл успешно загружен");
  };

  return (
    <DiskPage
      searchValue={search}
      changeSearchText={changeSearchText}
      sortTypeValue={sortType}
      changeSortText={changeSortText}
      handleFile={handleFile}
    />
  );
};

export default DiskPageContainer;
