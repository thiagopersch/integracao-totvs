'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

type ConfirmationDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onClose,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ConfirmationDialogProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="text-lg md:text-base sm:text-center text-left font-bold text-primary">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">{message}</DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="px-4 py-6 flex flex-col">
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <Separator />
        <DialogFooter className="flex flex-row gap-2 p-4 md:gap-3 md:flex-col-reverse">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            className="w-full"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
