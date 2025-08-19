import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTranslation } from "react-i18next";
import Translation from "../translation/Translation";

export default function CSelect({
  label,
  path,
  options = [],
  required,
  disabled = false,
  f,
  ...rest
}) {
  const { t } = useTranslation();
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth required={required} disabled={disabled}>
        <InputLabel id="demo-simple-select-label">{t(label)}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={label}
          {...rest}
        >
          {options.map((o, i) => {
            return (
              <MenuItem value={path ? o[path] : o._id}>
                {f.translate ? <Translation object={o} path="name" /> : o.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
