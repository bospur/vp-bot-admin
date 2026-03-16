import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/config/AuthContext';
import { NotificationProvider } from './shared/ui/Notification/NotificationContext';
import { ProtectedRoute } from './shared/ui/ProtectedRoute';
import { LoginScreen } from './screens/LoginScreen';
import { AnimalsScreen } from './screens/AnimalsScreen';
import { CategoriesScreen } from './screens/CategoriesScreen';
import { ArticlesScreen } from './screens/ArticlesScreen';
import { ArticleEditorScreen } from './screens/ArticleEditorScreen';

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}
