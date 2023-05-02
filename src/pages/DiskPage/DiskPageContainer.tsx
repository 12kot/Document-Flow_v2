import React, { ReactElement, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useNavigate, useParams } from "react-router-dom";
import DiskPage from "./DiskPage";

import { setSearchText } from "../../store/slices/diskSlice";
import {
  addFile,
  addFolder,
  addUserOnFile,
  changeFileFolder,
  removeFile,
  setFolders,
  removeUserOnFile,
  searchFile,
  setFiles,
} from "../../store/slices/userSlice";
import {
  deleteAccess,
  deleteFile,
  share,
  upload,
} from "../../functions/file.service";

import addFolderDB from "../../API/DB/Folder/addFolder";
import getUserFiles from "../../API/DB/User/getUserFiles";
import deleteFolderDB from "../../API/DB/Folder/deleteFolder";
import updateFileFolder from "../../API/DB/Folder/updateFileFolder";
import { UserFile } from "../../Types/Types";

const DiskPageContainer = (): ReactElement => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user);
  const { search } = useAppSelector((state) => state.disk);
  const navigate = useNavigate();

  let { id } = useParams();
  id = id ? id : "";

  const [isFilesLoading, setIsFilesLoading] = useState(true);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const files: UserFile[] = await getUserFiles(currentUser.email);

      dispatch(setFiles({ files }));
      setIsFilesLoading(false);
    };

    fetchUserData();
  }, []);

  const changeSearchText = (text: string): void => {
    dispatch(setSearchText({ text }));
    dispatch(searchFile({ text }));
  };

  const shareFile = async (
    file: UserFile,
    newUserEmail: string
  ): Promise<void> => {
    let result: string = await share(file, newUserEmail, currentUser.email);
    if (result) {
      dispatch(addUserOnFile({ fileId: file.id, userEmail: result }));
    }
  };

  const handleFile = async (file: File): Promise<void> => {
    setIsUploadLoading(true);

    let newFile = await upload(
      file,
      currentUser.email,
      currentUser.files,
      id ? id : ""
    );
    if (!!newFile) dispatch(addFile({ ...newFile }));

    setIsUploadLoading(false);
  };

  const deleteObj = async (file: UserFile): Promise<void> => {
    await deleteFile(file, currentUser.email);
    dispatch(removeFile({ path: file.fullPath }));
  };

  const deleteUserOnFile = async (
    file: UserFile,
    email: string
  ): Promise<void> => {
    let isDelete: boolean = await deleteAccess(file, currentUser.email, email);
    if (isDelete) {
      dispatch(removeUserOnFile({ fileId: file.id, userEmail: email }));
    }
  };

  const createFolder = async (folder: string): Promise<void> => {
    let result: string = await addFolderDB(
      currentUser.email,
      currentUser.folders,
      id ? id : "",
      folder.trim()
    );

    if (!!result) dispatch(addFolder({ folder: result }));
  };

  const deleteFolder = async (): Promise<void> => {
    const result: string[] = await deleteFolderDB(
      currentUser.email,
      currentUser.folders,
      id ? id.trim() : ""
    );

    if (!!result) {
      for (let file of currentUser.files) {
        if (file.folder.startsWith(id ? id.trim() : "")) {
          await deleteObj(file);
        }
      }

      dispatch(setFolders({ folders: result }));
      navigate("/disk");
    }
  };

  const handlerChangeFileFolder = async (
    file: UserFile,
    newFolderPath: string
  ): Promise<void> => {
    dispatch(changeFileFolder({ fileID: file.id, folder: newFolderPath }));
    const isChange: boolean = await updateFileFolder(
      currentUser.email,
      file,
      newFolderPath
    );

    if (!isChange)
      dispatch(changeFileFolder({ fileID: file.id, folder: id ? id : "" }));
  };

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
