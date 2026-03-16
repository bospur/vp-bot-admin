import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Button, CircularProgress, IconButton,
  Tooltip, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Layout } from '../../shared/ui/Layout';
import { ArticlesTable } from '../../modules/articles/features/ArticlesTable';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { getArticles, deleteArticle } from '../../data/source/articles';
import { useNotification } from '../../shared/ui/Notification/NotificationContext';
import type { Article } from '../../modules/articles/domain/types';

export function ArticlesScreen() {
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);

  const { data: articles = [], isLoading, isError } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      notify('Статья удалена', 'success');
      setDeleteTarget(null);
    },
    onError: () => notify('Ошибка удаления', 'error'),
  });

  return (
    <Layout title="Статьи">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>Статьи</Typography>
        {isMobile ? (
          <Tooltip title="Добавить">
            <IconButton color="primary" onClick={() => navigate('/articles/new')}><AddIcon /></IconButton>
          </Tooltip>
        ) : (
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/articles/new')}>
            Добавить
          </Button>
        )}
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {isError && (
        <Typography color="error">Не удалось загрузить статьи</Typography>
      )}

      {!isLoading && !isError && (
        <ArticlesTable
          data={articles}
          onEdit={(a) => navigate(`/articles/${a.id}/edit`)}
          onDelete={setDeleteTarget}
        />
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Удалить статью?"
        message={`«${deleteTarget?.title}» будет удалена безвозвратно.`}
        loading={deleteMutation.isPending}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        onClose={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}
