import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SurroundSoundIcon from '@mui/icons-material/SurroundSound'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
const MODESELECT_STYLES = {
  display: 'flex',
  alignItems: 'center',
  gap: 1
}
function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selecteMode = event.target.value
    setMode(selecteMode)
  }

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }}>
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          color: 'white',
          '&.Mui-focused': { color: 'white' }
        }}
      >
          Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'white',
          '.MuiOutlinedInput-notchedOutline': { borderColor: 'white'},
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '.MuiSvgIcon-root': {color: 'white' }
        }}
      >

        <MenuItem value="light">
          <Box sx={MODESELECT_STYLES}>
            <LightModeIcon fontSize='small' />
          Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={MODESELECT_STYLES}>
            <DarkModeIcon fontSize='  small' />
          Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <div style={MODESELECT_STYLES}>
            <SurroundSoundIcon fontSize='small' />
        System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
