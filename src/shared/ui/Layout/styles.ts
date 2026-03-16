import type { SxProps, Theme } from '@mui/material';

export const SIDEBAR_WIDTH = 240;

export const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  } satisfies SxProps<Theme>,

  drawer: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: SIDEBAR_WIDTH,
      boxSizing: 'border-box',
      borderRight: '1px solid',
      borderColor: 'divider',
    },
  } satisfies SxProps<Theme>,

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    py: 2.5,
    borderBottom: '1px solid',
    borderColor: 'divider',
  } satisfies SxProps<Theme>,

  appBar: {
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    ml: `${SIDEBAR_WIDTH}px`,
  } satisfies SxProps<Theme>,

  main: {
    flexGrow: 1,
    ml: `${SIDEBAR_WIDTH}px`,
    mt: '64px',
    p: 3,
    bgcolor: 'background.default',
    minHeight: 'calc(100vh - 64px)',
  } satisfies SxProps<Theme>,

  navItem: {
    borderRadius: 2,
    mx: 1,
    mb: 0.5,
    '&.active': {
      bgcolor: 'primary.main',
      color: 'primary.contrastText',
      '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
      '&:hover': { bgcolor: 'primary.dark' },
    },
  } satisfies SxProps<Theme>,
};
