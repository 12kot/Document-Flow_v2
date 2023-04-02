const getFileName = (name) => {
  return name.slice(name.indexOf("_[FILE_NAME]_") + 13);
};

export default getFileName;
