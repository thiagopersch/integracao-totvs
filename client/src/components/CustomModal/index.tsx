import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { X } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Separator } from '../ui/separator';

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
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="p-4 rounded-lg bg-background shadow-xl"
        onInteractOutside={(e) => {
          if (disableBackdropClick) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (disableBackdropClick) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-[900] text-primary">
            {title}
          </DialogTitle>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="close"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </DialogHeader>
        <Separator />
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
