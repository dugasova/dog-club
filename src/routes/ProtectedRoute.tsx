import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/context/useAuth';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) return <p role="status">{t('common.loading')}</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
