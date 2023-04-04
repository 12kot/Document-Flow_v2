import getUserFromDB from "../API/getUserFromDB";

const loginUser = async (user) => {
  //let userFiles = await getFiles(user.user.email);

  let us = await getUserFromDB(user.user.uid);

  if (!us.files)
    us = { ...us, files: [] }

  return { ...us };
};

export default loginUser;
