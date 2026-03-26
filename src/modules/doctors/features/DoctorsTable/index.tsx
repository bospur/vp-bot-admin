import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import type { Doctor } from '../../domain/types';

interface DoctorsTableProps {
  data: Doctor[];
  role: 'admin' | 'editor';
  onEdit: (d: Doctor) => void;
  onDelete: (d: Doctor) => void;
  onPublish: (d: Doctor) => void;
  baseUrl: string;
}

export function DoctorsTable({ data, role, onEdit, onDelete, onPublish, baseUrl }: DoctorsTableProps) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Фото</TableCell>
            <TableCell>ФИО</TableCell>
            <TableCell>Специализация</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d) => (
            <TableRow key={d.id} hover>
              <TableCell>
                <Avatar
                  src={d.photo_url ? `${baseUrl}${d.photo_url}` : undefined}
                  alt={d.full_name}
                  sx={{ width: 40, height: 40 }}
                >
                  {d.full_name[0]}
                </Avatar>
              </TableCell>
              <TableCell>{d.full_name}</TableCell>
              <TableCell>{d.specialty || '—'}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={d.status === 'published' ? 'Опубликован' : 'Черновик'}
                  color={d.status === 'published' ? 'success' : 'default'}
                />
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                  {role === 'admin' && (
                    <Tooltip title={d.status === 'published' ? 'Снять с публикации' : 'Опубликовать'}>
                      <IconButton size="small" onClick={() => onPublish(d)}>
                        {d.status === 'published' ? <UnpublishedIcon fontSize="small" /> : <PublishIcon fontSize="small" />}
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Редактировать">
                    <IconButton size="small" onClick={() => onEdit(d)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  {(role === 'admin' || d.status === 'draft') && (
                    <Tooltip title="Удалить">
                      <IconButton size="small" color="error" onClick={() => onDelete(d)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
