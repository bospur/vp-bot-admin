import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { AuthProvider } from './shared/config/AuthContext';
import { NotificationProvider } from './shared/ui/Notification/NotificationContext';
import { ProtectedRoute } from './shared/ui/ProtectedRoute';

const LoginScreen = lazy(() => import('./screens/LoginScreen').then((m) => ({ default: m.LoginScreen })));
const AnimalsScreen = lazy(() => import('./screens/AnimalsScreen').then((m) => ({ default: m.AnimalsScreen })));
const CategoriesScreen = lazy(() => import('./screens/CategoriesScreen').then((m) => ({ default: m.CategoriesScreen })));
const ArticlesScreen = lazy(() => import('./screens/ArticlesScreen').then((m) => ({ default: m.ArticlesScreen })));
const ArticleEditorScreen = lazy(() => import('./screens/ArticleEditorScreen').then((m) => ({ default: m.ArticleEditorScreen })));

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/login" element={<LoginScreen />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/animals" element={<AnimalsScreen />} />
                <Route path="/categories" element={<CategoriesScreen />} />
                <Route path="/articles" element={<ArticlesScreen />} />
                <Route path="/articles/new" element={<ArticleEditorScreen />} />
                <Route path="/articles/:id/edit" element={<ArticleEditorScreen />} />
              </Route>

              <Route path="*" element={<Navigate to="/animals" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}
