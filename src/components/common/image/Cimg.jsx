import { Image } from "react-bootstrap";
import { STORAGE_BASE_URL } from "../../../config";

function Cimg({ isServerImg = false, src, ...rest }) {
  if (isServerImg) return <Image {...rest} src={STORAGE_BASE_URL + src} />;
  return <Image {...rest} src={src} />;
}

export default Cimg;
