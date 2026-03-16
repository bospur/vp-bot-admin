import { Navigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useAuth } from '../../shared/config/AuthContext';

export function DashboardScreen() {
  const { token, logout } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Панель управления
      </Typography>
      <Button variant="outlined" color="error" onClick={logout}>
        Выйти
      </Button>
    </Box>
  );
}
