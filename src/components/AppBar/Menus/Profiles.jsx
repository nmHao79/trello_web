import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { Box } from '@mui/material'
function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null)
  };
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Button
            id="basic-button-profiles"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Avatar 
              sx={{ width: 34, height: 34 }}
              src='data:image/jpeg;base64,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'
            />
          </Button>
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <MenuItem >
          <Avatar sx={{ width: 28, height: 28, mr: 1 }}/> Profile
        </MenuItem>
        <MenuItem >
          <Avatar sx={{ width: 28, height: 28, mr: 1 }}/> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
