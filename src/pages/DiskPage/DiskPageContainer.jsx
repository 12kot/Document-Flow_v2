import DiskPage from "./DiskPage";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../store/slices/diskSlice";
import {
  addFile,
  addFolder,
  addUserOnFile,
  changeFileFolder,
  removeFile,
  removeFolder,
  removeUserOnFile,
  searchFile,
  setFiles,
} from "../../store/slices/userSlice";
import { useEffect, useState } from "react";
import getUserFiles from "../../API/DB/getUserFiles";
import { deleteAccess, deleteFile, share, upload } from "./file.service";
import { useNavigate, useParams } from "react-router-dom";
import addFolderDB from "../../API/DB/addFolder";
import deleteFolderDB from "../../API/DB/deleteFolder";
import updateFileFolder from "../../API/DB/updateFileFolder";

const DiskPageContainer = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const { search } = useSelector((state) => state.disk);
  const navigate = useNavigate();

  let { id } = useParams();
  id = id ? id : "";

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
    newUserEmail = await share(file, newUserEmail, currentUser.email);
    if (newUserEmail) {
      dispatch(addUserOnFile({ fileId: file.id, userEmail: newUserEmail }));
    }
  };

  const handleFile = async (file) => {
    setIsUploadLoading(true);

    let newFile = await upload(file, currentUser.email, currentUser.files, id);
    if (!!newFile) dispatch(addFile({ ...newFile }));

    setIsUploadLoading(false);
  };

  const deleteObj = async (file) => {
    await deleteFile(file, currentUser.email);
    dispatch(removeFile({ path: file.fullPath }));
  };

  const deleteUserOnFile = async (file, user) => {
    let isDelete = await deleteAccess(file, currentUser.email, user);
    if (isDelete) {
      dispatch(removeUserOnFile({ fileId: file.id, userEmail: user }));
    }
  };

  const createFolder = async (folder) => {
    let isAdded = await addFolderDB(
      currentUser.email,
      currentUser.folders,
      id,
      folder
    );

    if (!!isAdded) dispatch(addFolder({ folder: isAdded }));
  };

  const deleteFolder = async () => {
    const isDeleted = await deleteFolderDB(
      currentUser.email,
      currentUser.folders,
      id
    );

    if (isDeleted) {
      dispatch(removeFolder({ folder: id }));
      navigate("/disk");
    }
  };

  const handlerChangeFileFolder = async (file, newFolderPath) => {
    dispatch(changeFileFolder({ fileID: file.id, folder: newFolderPath }));
    const isChange = await updateFileFolder(currentUser.email, file, newFolderPath);
    
    if (!isChange) 
      dispatch(changeFileFolder({ fileID: file.id, folder: id }));
  }

  return (
    <DiskPage
      searchValue={search}
      changeSearchText={changeSearchText}
      shareFile={shareFile}

      handleFile={handleFile}
      removeFile={deleteObj}
      deleteUserOnFile={deleteUserOnFile}
      createFolder={createFolder}
      deleteFolder={deleteFolder}
      changeFileFolder={handlerChangeFileFolder}

      isFilesLoading={isFilesLoading}
      isUploadLoading={isUploadLoading}
      userEmail={currentUser.email}
    />
  );
};

export default DiskPageContainer;
