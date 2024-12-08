import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'
function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '67557ab11449b33e57e71a1c'
    //call api
    fetchBoardDetailsAPI(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth= {false} sx={{ height : '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
