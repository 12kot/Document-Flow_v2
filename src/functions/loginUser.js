import getFiles from "../API/getFiles";

const loginUser = async (user) => {
  let userFiles = await getFiles(user.user.email);

  return {
    email: user.user.email,
    accessToken: user.user.accessToken,
    uid: user.user.uid,
    files: userFiles,
  };
};

export default loginUser;
