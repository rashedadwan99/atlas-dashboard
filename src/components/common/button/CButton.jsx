import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
function CButton({ label, ...rest }) {
  // variant="text"
  // variant="contained"
  // variant="outlined"
  const { t } = useTranslation();
  return <Button {...rest}>{t(label)}</Button>;
}

export default CButton;
