//Capitalize the first letter of a string 
export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}
/**
 * generatePlaceholderCard
 * Fe se tu tao ra 1 card dac biet : placeholder Card, khong lien quan toi BE
 *Card nay se duoc an o giao dien nguoi dung
  cau truc id cua card nay de unique rat don gian, khong can phai random phuc tap:
  'columnId-placeholder-card' (moi column chi co the co toi da 1 cai placeholder card)
  quan trong khi tao: phai day du (_id, boardId, columnId, Fe_PlacerHolderCard)
*/
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}