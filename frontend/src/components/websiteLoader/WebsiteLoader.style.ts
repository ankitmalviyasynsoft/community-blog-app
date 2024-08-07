import { Style } from '@/types/Style.type'


export const style: Style = {
  root: {
    color: 'primary.main',
    opacity: '1 !important',
    zIndex: (theme: any) => theme.zIndex.drawer + 1,
    '&.MuiBackdrop-root': {
      flexFlow: 'column',
      bgcolor: 'background.default',
      py: 5
    }
  },
  progressContainer: {
    flexGrow: 1,
    py: 5,
  }
}