import { Controller } from 'react-hook-form';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import type { Animal } from '../../domain/types';
import { useAnimalFormDialogLogic } from './useLogic';

interface AnimalFormDialogProps {
  open: boolean;
  animal: Animal | null;
  onClose: () => void;
}

export function AnimalFormDialog({ open, animal, onClose }: AnimalFormDialogProps) {
  const { form, onSubmit, isEdit, loading } = useAnimalFormDialogLogic({ animal, onClose });
  const { control, formState: { errors } } = form;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Редактировать животное' : 'Добавить животное'}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Название"
                fullWidth
                autoFocus
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Slug"
                fullWidth
                placeholder="sobaka"
                error={!!errors.slug}
                helperText={errors.slug?.message ?? 'Строчные латинские буквы, цифры, дефис'}
              />
            )}
          />
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Иконка (эмодзи)"
                fullWidth
                placeholder="🐶"
                error={!!errors.icon}
                helperText={errors.icon?.message}
              />
            )}
          />
          <Controller
            name="sort_order"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                label="Порядок сортировки"
                type="number"
                fullWidth
                error={!!errors.sort_order}
                helperText={errors.sort_order?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>Отмена</Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {loading ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
