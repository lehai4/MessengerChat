import Resizer from "react-image-file-resizer";

const resizeFile = (
  file: any,
  width: number,
  height: number,
  quantity: number
) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      "PNG",
      quantity,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
export default resizeFile;
