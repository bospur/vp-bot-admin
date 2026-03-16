import { type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../config/AuthContext';
import { useNotification } from '../Notification/NotificationContext';
import { styles } from './styles';

const NAV_ITEMS = [
  { label: 'Животные', to: '/animals', icon: <PetsIcon /> },
  { label: 'Категории', to: '/categories', icon: <CategoryIcon /> },
  { label: 'Статьи', to: '/articles', icon: <ArticleIcon /> },
];

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title = 'VP Admin' }: LayoutProps) {
  const { logout } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    notify('Вы вышли из системы', 'info');
    navigate('/login');
  };

  return (
    <Box sx={styles.root}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={styles.drawer}>
        <Box sx={styles.drawerHeader}>
          <PetsIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" color="primary" fontWeight={700}>
            VP Admin
          </Typography>
        </Box>

        <List sx={{ pt: 1, flexGrow: 1 }}>
          {NAV_ITEMS.map(({ label, to, icon }) => (
            <ListItemButton
              key={to}
              component={NavLink}
              to={to}
              sx={styles.navItem}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* AppBar */}
      <AppBar position="fixed" sx={styles.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Tooltip title="Выйти">
            <IconButton onClick={handleLogout} color="default">
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box component="main" sx={styles.main}>
        {children}
      </Box>
    </Box>
  );
}
