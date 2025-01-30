import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

type CustomModalProps = {
  title: string;
  showCloseButton?: boolean;
  disableBackdropClick?: boolean;
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
};

const CustomModal: React.FC<CustomModalProps> = ({
  title,
  showCloseButton = true,
  disableBackdropClick = false,
  open,
  onClose,
  children,
}) => {
  const handleClose = (
    _: object,
    reason: 'backdropClick' | 'escapeKeyDown',
  ) => {
    if (reason === 'backdropClick' && disableBackdropClick) return;
    if (onClose) onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
      disableEscapeKeyDown={disableBackdropClick}
    >
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: {
              xs: '100%',
              sm: '50dvw',
            },
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              id="custom-modal-title"
              variant="h6"
              color="primary"
              sx={{
                fontWeight: 'bold',
              }}
            >
              {title}
            </Typography>
            {showCloseButton && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <Box id="custom-modal-description">{children}</Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
