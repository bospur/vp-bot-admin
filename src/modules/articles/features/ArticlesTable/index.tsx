import {
  Box, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Tooltip, Typography,
  useMediaQuery, useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Article } from '../../domain/types';

interface ArticlesTableProps {
  data: Article[];
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
}

export function ArticlesTable({ data, onEdit, onDelete }: ArticlesTableProps) {
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  if (data.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
        Статьи не добавлены
      </Typography>
    );
  }

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {data.map((article) => (
          <Paper key={article.id} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography fontWeight={600} noWrap>{article.title}</Typography>
              <Typography variant="body2" color="text.secondary" noWrap>{article.slug}</Typography>
            </Box>
            <Tooltip title="Редактировать">
              <IconButton size="small" onClick={() => onEdit(article)}><EditIcon fontSize="small" /></IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton size="small" color="error" onClick={() => onDelete(article)}><DeleteIcon fontSize="small" /></IconButton>
            </Tooltip>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {['Заголовок', 'Slug', ''].map((h) => (
                <TableCell key={h} sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((article) => (
              <TableRow key={article.id} hover>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.slug}</TableCell>
                <TableCell width={100}>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Tooltip title="Редактировать">
                      <IconButton size="small" onClick={() => onEdit(article)}><EditIcon fontSize="small" /></IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton size="small" color="error" onClick={() => onDelete(article)}><DeleteIcon fontSize="small" /></IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
