import DiskPage from "./DiskPage";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../store/slices/diskSlice";
import {
  addFile,
  addUserOnFile,
  removeFile,
  removeUserOnFile,
  searchFile,
  setFiles,
} from "../../store/slices/userSlice";
import { useEffect, useState } from "react";
import getUserFiles from "../../API/DB/getUserFiles";
import { deleteAccess, deleteFile, share, upload } from "./file.service";

const DiskPageContainer = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const { search } = useSelector((state) => state.disk);

  const [isFilesLoading, setIsFilesLoading] = useState(true);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const files = await getUserFiles(currentUser.email);
      dispatch(setFiles({ files }));
      setIsFilesLoading(false);
    };

    fetchUserData();
  }, []);

  const changeSearchText = (text) => {
    dispatch(setSearchText({ text }));
    dispatch(searchFile({ text }));
  };

  const shareFile = async (file, newUserEmail) => {
    let isShare = await share(file, newUserEmail, currentUser.email);
    if (isShare) {
      dispatch(addUserOnFile({ fileId: file.id, userEmail: newUserEmail }));
    }
  };

  const handleFile = async (file) => {
    setIsUploadLoading(true);

    let newFile = await upload(file, currentUser.email);
    dispatch(addFile({ ...newFile }));
    setIsUploadLoading(false);
  };

  const deleteObj = async (file) => {
    await deleteFile(file, currentUser.email);
    dispatch(removeFile({ path: file.fullPath }));
  };

  const deleteUserOnFile = async (file, user) => {
    let isDelete = await deleteAccess(file, currentUser.email, user);
    if (isDelete) {
      dispatch(removeUserOnFile({ fileId: file.id, userEmail: user })); //добавляем нового юзера в локальный стейт
    }
  };

  return (
    <DiskPage
      searchValue={search}
      changeSearchText={changeSearchText}

      shareFile={shareFile}
      handleFile={handleFile}
      removeFile={deleteObj}
      deleteUserOnFile={deleteUserOnFile}

      isFilesLoading={isFilesLoading}
      isUploadLoading={isUploadLoading}
      userEmail={currentUser.email}
    />
  );
};

export default DiskPageContainer;
