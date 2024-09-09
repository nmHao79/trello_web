////////////////////////IMPORT////////////////////////////////
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SurroundSoundIcon from '@mui/icons-material/SurroundSound'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useColorScheme } from '@mui/material/styles'
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
    <Container disableGutters maxWidth= {false} sx={{ height : '100vh' }}>
      <Box sx={{
        backgroundColor: 'white',
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'


      }}>
        <ModeSelect />
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board-bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content
      </Box>
    </Container>
  )
}

export default App
