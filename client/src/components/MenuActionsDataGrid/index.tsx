import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';

interface MenuAction {
  label: string;
  icon?: React.ReactNode;
  tooltip?: string;
  onClick: () => void;
  color?: string;
}

interface MenuActionsDataGridProps {
  buttonContent?: React.ReactNode;
  actions: MenuAction[];
}

const MenuActionsDataGrid: React.FC<MenuActionsDataGridProps> = ({
  buttonContent,
  actions,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Opções">
        <IconButton
          id="custom-menu-button"
          aria-controls={open ? 'custom-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {buttonContent || <MoreVertIcon />}
        </IconButton>
      </Tooltip>

      <Menu
        id="custom-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'custom-menu-button',
        }}
      >
        {actions.map((action, index) => (
          <Tooltip key={index} title={action.tooltip || ''} placement="bottom">
            <MenuItem
              onClick={() => {
                action.onClick();
                handleClose();
              }}
            >
              {action.icon && (
                <ListItemIcon
                  sx={{
                    color: action.color || 'inherit',
                  }}
                >
                  {action.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={action.label}
                sx={{
                  color: action.color || 'inherit',
                }}
              />
            </MenuItem>
          </Tooltip>
        ))}
      </Menu>
    </div>
  );
};

export default MenuActionsDataGrid;
