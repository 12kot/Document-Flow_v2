import getFiles from "../API/getFiles";
import getFileName from "./getFileName";

const loginUser = async (user) => {
  let userFiles = [];

  await getFiles(user.user.email).then(async (files) => {
    for (const file of files.items) {
        userFiles.push({ name: getFileName(file.name), file, isHiden: false });
      }
  });

  return {
    email: user.user.email,
    accessToken: user.user.accessToken,
    uid: user.user.uid,
    files: userFiles,
  };
};

export default loginUser;
