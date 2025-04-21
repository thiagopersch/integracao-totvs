'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { MoreVertical } from 'lucide-react';
import React from 'react';

interface MenuAction {
  label: string;
  icon?: React.ReactNode;
  tooltip?: string;
  onClick: () => void;
  color?: string;
}

interface MenuActionsProps {
  buttonContent?: React.ReactNode;
  actions: MenuAction[];
}

const MenuActions: React.FC<MenuActionsProps> = ({
  buttonContent,
  actions,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Opções"
                className="h-8 w-8 p-0"
              >
                {buttonContent || <MoreVertical className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map((action, index) => (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <DropdownMenuItem
                      onClick={action.onClick}
                      className={cn(
                        'flex items-center gap-2',
                        action.color && `text-${action.color}`,
                      )}
                    >
                      {action.icon && (
                        <span
                          className={cn(
                            'h-4 w-4',
                            action.color && `text-${action.color}`,
                          )}
                        >
                          {action.icon}
                        </span>
                      )}
                      <span>{action.label}</span>
                    </DropdownMenuItem>
                  </TooltipTrigger>
                  {action.tooltip && (
                    <TooltipContent side="right">
                      {action.tooltip}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>Opções</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MenuActions;
