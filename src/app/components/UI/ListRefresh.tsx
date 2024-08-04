"use client";

import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

interface ListRefreshProps {
  handleRefresh: () => void;
}
const ListRefresh: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <span
      onClick={handleRefresh}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <CachedOutlinedIcon sx={{ color: "#000000" }} />
      Refresh List
    </span>
  );
};

export default ListRefresh;
