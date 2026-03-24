// ===============================
// 📦 IMPORTS
// ===============================
import React from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Tooltip, Divider, IconButton, Stack, Typography, Collapse } from '@mui/material';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PoolIcon from '@mui/icons-material/Pool';
import PetsIcon from '@mui/icons-material/Pets';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MedicationIcon from '@mui/icons-material/Medication';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Router
import { Link as RouterLink, useLocation } from 'react-router-dom';

// ===============================
// 🚀 COMPONENT
// ===============================
export default function Sidebar({ open, isDesktop, mobileOpen, onCloseMobile, onToggleOpen, drawerWidth = 240, collapsedWidth = 72 }) {
  // ===============================
  // 🧠 STATE & CONTEXT
  // ===============================
  const [openDropdown, setOpenDropdown] = React.useState({});
  const role = localStorage.getItem('role') || 'petani';
  const location = useLocation();

  // ===============================
  // 📋 MENU CONFIG (SOURCE OF TRUTH)
  // ===============================
  const menuItems = [
    { text: 'Dashboard Utama', icon: <DashboardIcon />, to: '/dashboard', roles: ['admin', 'pemilik'] },
    { text: 'Dashboard Kolam', icon: <PoolIcon />, to: '/kolam', roles: ['admin', 'pemilik', 'petani'] },
    { text: 'Panen', icon: <AgricultureIcon />, to: '/panen', roles: ['admin', 'pemilik', 'petani'] },

    // ✅ DROPDOWN MENU
    {
      text: 'Stok Sumber Daya',
      icon: <InventoryIcon />,
      roles: ['admin', 'pemilik', 'petani'],
      children: [
        { text: 'Ikan', icon: <PetsIcon />, to: '/ikan' },
        { text: 'Pakan', icon: <LocalDiningIcon />, to: '/feed' },
        { text: 'Vitamin', icon: <MedicationIcon />, to: '/vitamin' },
      ],
    },

    { text: 'Keuangan', icon: <AccountBalanceIcon />, to: '/finance', roles: ['admin', 'pemilik'] },
    { text: 'Pengguna', icon: <PeopleIcon />, to: '/users', roles: ['admin'] },
    {
      text: 'Manajemen Data',
      icon: <SettingsIcon />,
      roles: ['admin', 'pemilik'],
      children: [
        {
          text: 'Manajemen User',
          icon: <PeopleIcon />,
          to: '/management', // tetap route lama
        },
        {
          text: 'Master Data Reference',
          icon: <SettingsIcon />,
          to: '/master-data-reference',
        },
      ],
    },
  ];

  // ===============================
  // 🔐 FILTER BERDASARKAN ROLE
  // ===============================
  const filtered = menuItems.filter((item) => item.roles.includes(role));

  // ===============================
  // 🎯 UI LOGIC
  // ===============================
  const showText = isDesktop ? open : true;
  const showTooltip = isDesktop && !open;

  // ===============================
  // 🧱 DRAWER CONTENT (ISI SIDEBAR)
  // ===============================
  const DrawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Spacer AppBar */}
      <Toolbar />

      {/* Branding mini */}
      {isDesktop && !open && (
        <Box sx={{ px: 1.5, pb: 1 }}>
          <Typography variant="caption" color="text.secondary" align="center" />
        </Box>
      )}

      <Divider />

      {/* ===============================
          📜 MENU LIST
      =============================== */}
      <List sx={{ px: showText ? 1 : 0.5, py: 1, flex: 1, overflowY: 'auto' }}>
        {filtered.map((item) => {
          const isParent = !!item.children;
          const isChildActive = item.children?.some((child) => location.pathname.startsWith(child.to));

          const isOpen = openDropdown[item.text] ?? isChildActive;

          // ===============================
          // 🔽 DROPDOWN MENU
          // ===============================
          if (isParent) {
            return (
              <Box key={item.text}>
                <ListItemButton
                  onClick={() =>
                    setOpenDropdown((prev) => ({
                      ...prev,
                      [item.text]: !prev[item.text],
                    }))
                  }
                  sx={{ mb: 0.5, borderRadius: 2, px: showText ? 1.5 : 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: showText ? 1.5 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>

                  <ListItemText primary={item.text} sx={{ opacity: showText ? 1 : 0 }} />

                  {showText && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>

                {/* CHILD MENU */}
                <Collapse in={isOpen} timeout="auto" unmountOnExit  >
                  <List disablePadding>
                    {item.children.map((child) => {
                      const selected = location.pathname.startsWith(child.to);

                      return (
                        <ListItemButton key={child.text} component={RouterLink} to={child.to} selected={selected} sx={{ pl: 4, borderRadius: 2, mb: 0.5 }}>
                          <ListItemIcon>{child.icon}</ListItemIcon>
                          <ListItemText primary={child.text} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            );
          }

          // ===============================
          // 📄 MENU BIASA
          // ===============================
          const selected = location.pathname.startsWith(item.to);

          const button = (
            <ListItemButton
              component={RouterLink}
              to={item.to}
              selected={selected}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                px: showText ? 1.5 : 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: '#fff',
                  '& .MuiListItemIcon-root': { color: '#fff' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: showText ? 1.5 : 'auto', justifyContent: 'center' }}>{item.icon}</ListItemIcon>

              <ListItemText primary={item.text} sx={{ opacity: showText ? 1 : 0 }} />
            </ListItemButton>
          );

          // Tooltip saat collapsed
          return showTooltip ? (
            <Tooltip key={item.text} title={item.text} placement="right">
              <Box>{button}</Box>
            </Tooltip>
          ) : (
            <Box key={item.text}>{button}</Box>
          );
        })}
      </List>

      <Divider />

      {/* ===============================
          🔄 TOGGLE BUTTON (DESKTOP)
      =============================== */}
      {isDesktop && (
        <Box sx={{ p: 1 }}>
          <Stack direction="row" justifyContent="center">
            <IconButton onClick={onToggleOpen} size="small" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Stack>
        </Box>
      )}
    </Box>
  );

  // ===============================
  // 🎨 RENDER FINAL (MOBILE + DESKTOP)
  // ===============================
  return (
    <>
      {/* 📱 MOBILE */}
      <Drawer
        variant="temporary"
        open={!isDesktop && mobileOpen}
        onClose={onCloseMobile}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: '#f7f8fb',
          },
        }}
      >
        {DrawerContent}
      </Drawer>

      {/* 🖥️ DESKTOP */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          width: open ? drawerWidth : collapsedWidth,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            backgroundColor: '#f3f4f7',
            transition: 'width 0.3s',
          },
        }}
      >
        {DrawerContent}
      </Drawer>
    </>
  );
}
