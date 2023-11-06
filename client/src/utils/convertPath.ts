const convertPath = (path: string) => {
  let key = path.indexOf("/");
  let stringCut = path.slice(key + 1);

  let restKey = stringCut.indexOf("/");

  let pathname = path.slice(key, restKey !== -1 ? restKey + 1 : path.length);
  return pathname;
};

export default convertPath;
