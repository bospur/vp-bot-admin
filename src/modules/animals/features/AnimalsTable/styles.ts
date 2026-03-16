import type { SxProps, Theme } from '@mui/material';

export const styles = {
  paper: {
    overflow: 'hidden',
    borderRadius: 2,
  } satisfies SxProps<Theme>,

  iconCell: {
    fontSize: '1.5rem',
    lineHeight: 1,
  } satisfies SxProps<Theme>,

  actionsCell: {
    display: 'flex',
    gap: 0.5,
    justifyContent: 'flex-end',
  } satisfies SxProps<Theme>,
};
