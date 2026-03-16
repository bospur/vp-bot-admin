import { flexRender } from '@tanstack/react-table';
import {
  Box, Chip, IconButton, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Tooltip, Typography,
  useMediaQuery, useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CategoryRow } from '../../domain/types';
import { useCategoriesTableLogic } from './useLogic';
import { styles } from './styles';

interface CategoriesTableProps {
  data: CategoryRow[];
  onEdit: (category: CategoryRow) => void;
  onDelete: (category: CategoryRow) => void;
}

export function CategoriesTable({ data, onEdit, onDelete }: CategoriesTableProps) {
  const { table } = useCategoriesTableLogic({ data, onEdit, onDelete });
  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  if (data.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
        Категории не добавлены
      </Typography>
    );
  }

  if (isMobile) {
    return (
      <Box sx={styles.cardList}>
        {table.getRowModel().rows.map((row) => {
          const cat = row.original;
          return (
            <Paper key={cat.id} sx={styles.card}>
              <Box sx={styles.cardIcon}>{cat.icon || '📁'}</Box>
              <Box sx={styles.cardContent}>
                <Typography fontWeight={600} noWrap>{cat.name}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>{cat.slug}</Typography>
                <Chip label={cat.animalName} size="small" sx={{ mt: 0.5 }} />
              </Box>
              <Box sx={styles.cardActions}>
                <Tooltip title="Редактировать">
                  <IconButton size="small" onClick={() => onEdit(cat)}><EditIcon fontSize="small" /></IconButton>
                </Tooltip>
                <Tooltip title="Удалить">
                  <IconButton size="small" color="error" onClick={() => onDelete(cat)}><DeleteIcon fontSize="small" /></IconButton>
                </Tooltip>
              </Box>
            </Paper>
          );
        })}
      </Box>
    );
  }

  return (
    <Paper sx={styles.paper}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableCell key={header.id} width={header.getSize()} sx={{ fontWeight: 600, bgcolor: 'grey.50' }}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const cat = row.original;
              return (
                <TableRow key={row.id} hover>
                  {row.getVisibleCells().map((cell) => {
                    if (cell.column.id === 'icon') return (
                      <TableCell key={cell.id}><Box sx={styles.iconCell}>{cat.icon || '—'}</Box></TableCell>
                    );
                    if (cell.column.id === 'actions') return (
                      <TableCell key={cell.id}>
                        <Box sx={styles.actionsCell}>
                          <Tooltip title="Редактировать">
                            <IconButton size="small" onClick={() => onEdit(cat)}><EditIcon fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Удалить">
                            <IconButton size="small" color="error" onClick={() => onDelete(cat)}><DeleteIcon fontSize="small" /></IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    );
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
