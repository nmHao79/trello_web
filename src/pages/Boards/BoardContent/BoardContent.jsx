import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  rectIntersection,
  pointerWithin,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { arrayMove, defaultAnimateLayoutChanges } from '@dnd-kit/sortable'
import { useCallback, useEffect, useRef, useState } from 'react'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, over } from 'lodash'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN :'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD : 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  // yeu cau di chuyen 10px thi moi kich hoat event, fix truong hop click bi goi event
  // const pointSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } } )
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } } )
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } } )

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  //cùng 1 thời điểm chỉ có 1 item được kéo (Column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  const lastOverId = useRef(null)
  useEffect( () => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board] )

  //tim 1 column theo cardId
  const findColumnByCardId = (cardId) => {
    //
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }
  // Func chung xu ly viec Cap nhap lai state trong truong hop di chuyen cards qua lai giua cac column khac nhau
  const moveCardsBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardData,
    activeDraggingCardId

  ) => {
    setOrderedColumns(prevColumns => {
      //TIm vitri cua overCard trong column dich( noi activeCard sap dc tha )
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
      // logic tinh toan 'cardIndex moi' tren hoac duoi cua over card , lay chuan ra tu code cua thu vien
      let newCardIndex
      const isBelowOverItem =
          active.rect.current.translated &&
        active.rect.current.translated.top >
          over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1
      //Clone mang OrderedColumnsState cu ra mot cai moi de xu ly data roi return - cap nhap lai orderedColumnsState moi
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
      //column cu
      if (nextActiveColumn) {
        // xoa card column active (column cu ) cai luc keo card ra khoi no de sang column khac
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //cap nhap cardOrderIds
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      //column moi
      if (nextOverColumn) {
        //
        // xoa card column active (column cu ) cai luc keo card ra khoi no de sang column khac
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //phai cap nhap lai chuan du lieu columnId trong card sau khi keo card giua 2 column khac nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        //them card dang keo  vao overColumn theo vi tri index moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        //cap nhap cardOrderIds
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }
  // Trigger khi bat dau keo 1 phan tu
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN )
    setActiveDragItemData(event?.active?.data?.current)
    //neu la keo card thi moi thuc hien
    if(event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger trong qua trinh keo 1 item
  const handleDragOver = (event) => {

    //Khong lam gi them neu dang keo column
    if ( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // console.log('handleDragOver: ', event)
    const {active, over } = event

    // can dam bao neu khong ton tai active hay over (Khi keo ra khoi pham vi container) thi khong lam gi, de tranh crash trang web
    if (!active ||!over) return

    //activeDragginCard: la cai card dang duoc keo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

    // overCard: lai cai card dang tuong tac tren hoac duoi so voi card dang duoc keo
    const { id: overCardId } = over

    //tim 2 cai column theo CardID
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // neu khong ton tai 1 trong 2 column thi khong lam gi het , tranh crash trang
    if (!activeColumn || !overColumn) return

    //logic o day la  chi khi keo 2 column khac nhau, con neu keo card trong 1 column ban dau thi khong lam gi ca.
    //vi day dang la doan xu ly luc keo (handleDragOver), con neu keo xong thi no la o handleDragEnd
    if (activeColumn._id !== overColumn._id ) {
      moveCardsBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardData,
        activeDraggingCardId
      )
    }
  }

  // Trigger khi ket thuc keo 1 phan tu
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

      // overCard: lai cai card dang tuong tac tren hoac duoi so voi card dang duoc keo
      const { id: overCardId } = over

      //tim 2 cai column theo CardID
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // neu khong ton tai 1 trong 2 column thi khong lam gi het , tranh crash trang
      if (!activeColumn || !overColumn) return
      if (oldColumnWhenDraggingCard._id !== overColumn._id ) {
        moveCardsBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardData,
          activeDraggingCardId
        )
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)// vi tri cu tu oldColumnWhenDraggingCard
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex )

        setOrderedColumns(prevColumns => {

          const nextColumns = cloneDeep(prevColumns)

          const targetColum = nextColumns.find(column => column._id === overColumn._id)

          // Cap nhap lai 2 gia tri moi la card va cardOrderIds trong targetColumn
          targetColum.cards = dndOrderedCards
          targetColum.cardOrderIds = dndOrderedCards.map(card => card._id)
          console.log('targetColum',targetColum)

          return nextColumns
        })
      }
    }
    //xu ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)// vi tri cu tu active
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex )
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log('dndOrderedColumns :', dndOrderedColumns)
        // console.log('dndOrderedColumnsIds :', dndOrderedColumnsIds)
        //cap nhap lai state columns ban dau sau khi keo tha
        setOrderedColumns(dndOrderedColumns)
      }
    }
    // nhung du lieu sau khi keo tha luon phai tra ve null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  const collisionDetectionStrategy = useCallback((args) => {
    //truong hop keo column thi dung thuat toan closestCorners
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({...args})
    }
    //tim cac diem va cham voi con tro
    const pointerIntersection = pointerWithin(args)

    const intersections = !!pointerIntersection?.length
      ? pointerIntersection
      : rectIntersection(args)
      let overId = getFirstCollision(intersections, 'id')
      console.log('overId: ', overId)
      if(overId){
        const checkColumn = orderedColumns.find(column => column._id === overId)
        if(checkColumn) {
          // console.log('overId bf: ', overId)
          overId = closestCenter({
            ...args ,
            droppableContainers: args.droppableContainers.filter(container => {
              return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id ))
            })
          })[0]?.id
          // console.log('overId at: ', overId)
        }
        lastOverId.current = overId
        return [{ id: overId}]
      }
      // Neu overId null tra ve mang rong tranh crash trang 
      return lastOverId.current ? [{id: lastOverId.current}] : []
  }, [activeDragItemType, orderedColumns])
  return (
    <DndContext
      sensors= {sensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy} // thuat toan phat hien va cham  fix khong keo duoc tab anh
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trella.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns= {orderedColumns}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
