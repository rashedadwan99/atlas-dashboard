import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

function CInput({ type = "text", rows, value, slotProps = {}, ...rest }) {
  const isArabic = useSelector((state) => state.language.isArabic);

  return (
    <FormControl fullWidth>
      <TextField
        value={value}
        {...rest}
        type={type}
        autoComplete="true"
        multiline={rows ? true : ""}
        rows={rows ? 5 : undefined}
        sx={{
          direction: isArabic ? "rtl" : "ltr",

          // Fix label
          "& .MuiInputLabel-root": {
            left: isArabic ? "auto" : 0,
            right: isArabic ? "25px" : "auto",
            transformOrigin: isArabic ? "top right" : "top left",
            textAlign: isArabic ? "right" : "left",
          },

          "& .MuiInputLabel-shrink": {
            left: isArabic ? "auto" : 0,
            right: isArabic ? "30px" : "auto",
          },

          // Fix notch (fieldset)
          "& .MuiOutlinedInput-notchedOutline": {
            textAlign: isArabic ? "right" : "left",
            "& legend": {
              textAlign: isArabic ? "right" : "left",
              direction: isArabic ? "rtl" : "ltr",
            },
          },

          "& input": {
            textAlign: isArabic ? "right" : "left",
          },
        }}
        slotProps={{
          ...slotProps,
          inputLabel: {
            ...(slotProps.inputLabel || {}),
          },
        }}
        variant="outlined" // Ensure variant is outlined for notch to exist
      />
    </FormControl>
  );
}

export default CInput;
