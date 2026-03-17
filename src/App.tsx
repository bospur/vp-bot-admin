import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { AuthProvider } from './shared/config/AuthContext';
import { NotificationProvider } from './shared/ui/Notification/NotificationContext';
import { ProtectedRoute } from './shared/ui/ProtectedRoute';

const LoginScreen = lazy(() => import('./screens/LoginScreen').then((m) => ({ default: m.LoginScreen })));
const AnimalsScreen = lazy(() => import('./screens/AnimalsScreen').then((m) => ({ default: m.AnimalsScreen })));
const CategoriesScreen = lazy(() => import('./screens/CategoriesScreen').then((m) => ({ default: m.CategoriesScreen })));
const ArticlesScreen = lazy(() => import('./screens/ArticlesScreen').then((m) => ({ default: m.ArticlesScreen })));
const ArticleEditorScreen = lazy(() => import('./screens/ArticleEditorScreen').then((m) => ({ default: m.ArticleEditorScreen })));
const UsersScreen = lazy(() => import('./screens/UsersScreen').then((m) => ({ default: m.UsersScreen })));

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const router = createBrowserRouter([
  { path: '/login', element: <Suspense fallback={<Loader />}><LoginScreen /></Suspense> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/animals', element: <Suspense fallback={<Loader />}><AnimalsScreen /></Suspense> },
      { path: '/categories', element: <Suspense fallback={<Loader />}><CategoriesScreen /></Suspense> },
      { path: '/articles', element: <Suspense fallback={<Loader />}><ArticlesScreen /></Suspense> },
      { path: '/articles/new', element: <Suspense fallback={<Loader />}><ArticleEditorScreen /></Suspense> },
      { path: '/articles/:id/edit', element: <Suspense fallback={<Loader />}><ArticleEditorScreen /></Suspense> },
      { path: '/users', element: <Suspense fallback={<Loader />}><UsersScreen /></Suspense> },
    ],
  },
  { path: '*', element: <Navigate to="/animals" replace /> },
]);

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </AuthProvider>
  );
}
