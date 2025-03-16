import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
};

const StyledBackdrop = styled(Backdrop)({
  backdropFilter: 'blur(0.2rem)', // Pequeno blur no fundo
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Leve escurecimento
});

export default function ConfirmationDialog({
  open,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slots={{ backdrop: StyledBackdrop }}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle
        id="confirmation-dialog-title"
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      >
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', padding: '3rem 1rem' }}
      >
        <Typography id="confirmation-dialog-description">{message}</Typography>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ padding: '1rem' }}>
        <Button onClick={onClose} variant="outlined" color="inherit" fullWidth>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" fullWidth>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
