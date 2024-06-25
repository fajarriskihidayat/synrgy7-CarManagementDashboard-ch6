export function imageName(url?: any | undefined) {
  if (!url) return "";
  const urlArray = url.split("/");
  const image = `${urlArray[urlArray.length - 2]}/${
    urlArray[urlArray.length - 1]
  }`;
  const name = image.split(".")[0];
  return name;
}
