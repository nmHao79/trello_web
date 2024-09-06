////////////////////////IMPORT////////////////////////////////
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SurroundSoundIcon from '@mui/icons-material/SurroundSound'
import Box from '@mui/material/Box'
////////////////////////END IMPORT////////////////////////////

////////////////////////COMPONENTS////////////////////////////
function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    const selecteMode = event.target.value
    setMode(selecteMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >

        <MenuItem value="light">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon fontSize='small' />
        Light
          </div>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeIcon fontSize='  small' />
          Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SurroundSoundIcon fontSize='small' />
        System
          </div>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
// function ModeToggle() {
//   const { mode, setMode } = useColorScheme()
//   // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
//   // const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)')
//   // console.log('prefersDarkMode: ', prefersDarkMode)
//   // console.log('prefersLightMode: ', prefersLightMode)
//   return (
//     <Button
//       onClick={() => {
//         setMode(mode === 'light' ? 'dark' : 'light')
//       }}
//     >
//       {mode === 'light' ? 'Turn dark' : 'Turn light'}
//     </Button>
//   )
// }
function App() {
  return (
    <>
      <ModeSelect />
      {/* <ModeToggle /> */}
      <hr />
      <div>nmhao79</div>
      <Typography variant='body2' color={'text.secondary'}>Test Typography</Typography>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
