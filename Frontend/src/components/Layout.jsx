import { useEffect, useMemo, useState } from "react";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 72;
const LS_KEY = "sidebarOpen";

export default function Layout({ children }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const initialOpen = useMemo(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved === "true") return true;
    if (saved === "false") return false;
    return true;
  }, []);

  const [sidebarOpen, setSidebarOpen] = useState(initialOpen);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LS_KEY, String(sidebarOpen));
  }, [sidebarOpen]);

  const handleToggleSidebar = () => {
    if (isDesktop) setSidebarOpen((prev) => !prev);
    else setMobileOpen((prev) => !prev);
  };

  // ❗️Ini lebar yang benar-benar kita sisihkan untuk konten
  const sidebarWidthForLayout = isDesktop
    ? (sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH)
    : 0;

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        onToggleSidebar={handleToggleSidebar}
        isSidebarOpen={sidebarOpen}
        isDesktop={isDesktop}
      />

      <Sidebar
        open={sidebarOpen}
        isDesktop={isDesktop}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleOpen={handleToggleSidebar}
        drawerWidth={DRAWER_WIDTH}
        collapsedWidth={COLLAPSED_WIDTH}
      />

      {/* 🔧 Spacer "phantom" agar konten pas nempel ke sisi kanan sidebar
        <Box
          aria-hidden
          sx={{
            width: sidebarWidthForLayout,
            flexShrink: 0,
            transition: (t) =>
              t.transitions.create("width", {
                easing: t.transitions.easing.sharp,
                duration: t.transitions.duration.leavingScreen,
              }),
          }}
        /> */}

      {/* 🔧 Hapus ml supaya tidak double offset */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: { xs: 2, md: 3 },
          transition: (t) =>
            t.transitions.create("padding", {
              easing: t.transitions.easing.sharp,
              duration: t.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
