import DashboardIcon from '@mui/icons-material/Dashboard'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
const MENU_STYLE = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      paddingX: 2,
      overflowX: 'auto',
      borderTop: '1px solid #179BAE'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.05 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label="nmhao79 Board"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add To Google Driver"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup max={4} 
          sx={{
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: '16px'
            }
          }}>
          <Tooltip title='nmhao79' >
            <Avatar 
              alt="nmhao79"
              src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/437918682_1801615997014828_7874766212613586370_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH9GMRIl7AvWfRelEs8RB40UWQQ_ey6NoFRZBD97Lo2gfwjasB_KQbci01B_dCvMnzdMhICAuMsfLjYLaIbfpMT&_nc_ohc=BwDzJyVyKaEQ7kNvgHjU13o&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AgFt9ZiA9Lzd0F0Ba46L7zV&oh=00_AYAL2qB55Vg5Qq-XP92fKEjAhGtAiVfzEUataMrzmG1eYQ&oe=66F0B7AF" />
          </Tooltip>
          <Tooltip title='nmhao79' >
            <Avatar 
              alt="nmhao79"
              src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/437918682_1801615997014828_7874766212613586370_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH9GMRIl7AvWfRelEs8RB40UWQQ_ey6NoFRZBD97Lo2gfwjasB_KQbci01B_dCvMnzdMhICAuMsfLjYLaIbfpMT&_nc_ohc=BwDzJyVyKaEQ7kNvgHjU13o&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AgFt9ZiA9Lzd0F0Ba46L7zV&oh=00_AYAL2qB55Vg5Qq-XP92fKEjAhGtAiVfzEUataMrzmG1eYQ&oe=66F0B7AF" />
          </Tooltip>
          <Tooltip title='nmhao79' >
            <Avatar 
              alt="nmhao79"
              src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/437918682_1801615997014828_7874766212613586370_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH9GMRIl7AvWfRelEs8RB40UWQQ_ey6NoFRZBD97Lo2gfwjasB_KQbci01B_dCvMnzdMhICAuMsfLjYLaIbfpMT&_nc_ohc=BwDzJyVyKaEQ7kNvgHjU13o&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AgFt9ZiA9Lzd0F0Ba46L7zV&oh=00_AYAL2qB55Vg5Qq-XP92fKEjAhGtAiVfzEUataMrzmG1eYQ&oe=66F0B7AF" />
          </Tooltip>
          <Tooltip title='nmhao79' >
            <Avatar 
              alt="nmhao79"
              src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/437918682_1801615997014828_7874766212613586370_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH9GMRIl7AvWfRelEs8RB40UWQQ_ey6NoFRZBD97Lo2gfwjasB_KQbci01B_dCvMnzdMhICAuMsfLjYLaIbfpMT&_nc_ohc=BwDzJyVyKaEQ7kNvgHjU13o&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AgFt9ZiA9Lzd0F0Ba46L7zV&oh=00_AYAL2qB55Vg5Qq-XP92fKEjAhGtAiVfzEUataMrzmG1eYQ&oe=66F0B7AF" />
          </Tooltip>
          <Tooltip title='nmhao79' >
            <Avatar 
              alt="nmhao79"
              src="https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/437918682_1801615997014828_7874766212613586370_n.jpg?stp=dst-jpg_s200x200&_nc_cat=102&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH9GMRIl7AvWfRelEs8RB40UWQQ_ey6NoFRZBD97Lo2gfwjasB_KQbci01B_dCvMnzdMhICAuMsfLjYLaIbfpMT&_nc_ohc=BwDzJyVyKaEQ7kNvgHjU13o&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=AgFt9ZiA9Lzd0F0Ba46L7zV&oh=00_AYAL2qB55Vg5Qq-XP92fKEjAhGtAiVfzEUataMrzmG1eYQ&oe=66F0B7AF" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
