import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
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
    <div>
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
              src='https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/437918682_1801615997014828_7874766212613586370_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH9GMRIl7AvWfRelEs8RB40UWQQ_ey6NoFRZBD97Lo2gfwjasB_KQbci01B_dCvMnzdMhICAuMsfLjYLaIbfpMT&_nc_ohc=BwDzJyVyKaEQ7kNvgHjU13o&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AgFt9ZiA9Lzd0F0Ba46L7zV&oh=00_AYAL2qB55Vg5Qq-XP92fKEjAhGtAiVfzEUataMrzmG1eYQ&oe=66F0B7AF'
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
    </div>
  )
}

export default Profiles
