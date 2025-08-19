// components/common/button/FloatingActionButton.jsx
import { Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FloatingActionButton({
  label = "Action",
  icon,
  onClick,
  condition = true,
  failMessage = null,
  navigateTo = null,
  position = { bottom: 40, right: 10 }, // default position
  color = "primary",
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!condition) {
      if (failMessage) {
        return typeof failMessage === "function"
          ? failMessage()
          : alert(t(failMessage));
      }
      return;
    }

    if (onClick) onClick();
    if (navigateTo) navigate(navigateTo);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: position.bottom,
        right: position.right,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        zIndex: 1300,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <Fab color={color} aria-label={label} size="medium">
        {icon}
      </Fab>
      <span
        style={{
          fontWeight: 600,
          fontSize: "0.9rem",
          color: "var(--dark-blue)",
          userSelect: "none",
        }}
      >
        {t(label)}
      </span>
    </div>
  );
}

export default FloatingActionButton;
