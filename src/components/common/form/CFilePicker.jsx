import { useRef, useState, useMemo } from "react";
import {
  Box,
  Stack,
  Button,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "./CFilePicker.css";

export default function FilePicker({
  label = "Choose files",
  multiple = true,
  accept = "image/*",
  maxFiles = 10,
  minFiles = 0,
  maxSizeMB = 10,
  value,
  onChange,
  disabled = false,
  name = "files",
  labelTextKey = "",
}) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [internalFiles, setInternalFiles] = useState([]);
  const files = value ?? internalFiles;
  const [err, setErr] = useState("");

  const previewUrls = useMemo(() => {
    return files.map((f) => ({
      name: f.name,
      type: f.type,
      url: URL.createObjectURL(f),
    }));
  }, [files]);

  const translatedLabel = useMemo(() => {
    return labelTextKey ? t(labelTextKey) : label;
  }, [labelTextKey, label, t]);

  const validate = (candidate) => {
    if (candidate.length > maxFiles) return t("max_files_error", { maxFiles });

    for (const f of candidate) {
      const sizeMB = f.size / (1024 * 1024);
      if (sizeMB > maxSizeMB)
        return t("max_size_error", { name: f.name, maxSizeMB });
    }

    return "";
  };

  const applyFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    const merged = multiple ? [...files, ...incoming] : incoming.slice(0, 1);

    const unique = [];
    const seen = new Set();
    for (const f of merged) {
      const key = `${f.name}-${f.size}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(f);
      }
    }

    const message = validate(unique);
    setErr(message);

    if (!message) {
      if (value === undefined) setInternalFiles(unique);
      onChange?.(unique);
    }
  };

  const removeAt = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    const message = validate(next);
    setErr(message);
    if (value === undefined) setInternalFiles(next);
    onChange?.(next);
  };

  const clearAll = () => {
    if (value === undefined) setInternalFiles([]);
    onChange?.([]);
    setErr("");
  };

  return (
    <Stack spacing={1.25} alignItems="center" width="100%">
      {translatedLabel && (
        <Typography variant="subtitle1" align="center">
          {translatedLabel}
        </Typography>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          applyFiles(e.target.files);
          e.target.value = "";
        }}
        disabled={disabled}
        name={name}
      />

      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Button
          variant="outlined"
          startIcon={<FiUploadCloud />}
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
        >
          {t("choose_files")}
        </Button>

        <Chip
          label={`${t("selected")}: ${files.length}`}
          variant="outlined"
          size="small"
        />

        {files.length > 0 && (
          <Button
            color="error"
            size="small"
            onClick={clearAll}
            disabled={disabled}
          >
            {t("clear")}
          </Button>
        )}
      </Stack>

      {err && (
        <Typography variant="body2" color="error" sx={{ width: "100%" }}>
          {err}
        </Typography>
      )}

      {files.length > 0 && (
        <Box width="100%" display="flex" justifyContent="center" mt={2}>
          <Box sx={{ width: "100%" }}>
            {/* Image Previews */}
            {previewUrls
              .filter((p) => p.type.startsWith("image"))
              .map((p, i) => (
                <Box key={p.url} sx={{ mb: 2 }}>
                  <img
                    src={p.url}
                    alt={p.name}
                    loading="lazy"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                      maxHeight: 250,
                    }}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 0.5 }}
                  >
                    <Typography variant="caption" noWrap title={p.name}>
                      {p.name}
                    </Typography>
                    <IconButton size="small" onClick={() => removeAt(i)}>
                      <FiTrash2 size={16} />
                    </IconButton>
                  </Stack>
                </Box>
              ))}

            {/* Video Previews */}
            {previewUrls
              .filter((p) => p.type.startsWith("video"))
              .map((p, i) => (
                <Box key={p.url} sx={{ mb: 2 }}>
                  <video
                    src={p.url}
                    controls
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mt: 0.5 }}
                  >
                    <Typography variant="caption" noWrap title={p.name}>
                      {p.name}
                    </Typography>
                    <IconButton size="small" onClick={() => removeAt(i)}>
                      <FiTrash2 size={16} />
                    </IconButton>
                  </Stack>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    </Stack>
  );
}
