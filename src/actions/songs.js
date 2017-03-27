let next_id = 0
export const addSong = (title) => {
  return {
    type: 'ADD_SONG',
    id: next_id++,
    title
  }
}
