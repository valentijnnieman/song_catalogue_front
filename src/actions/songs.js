let next_id = 2
// TO-DO: get correct id --^
//
export const addSong = (title) => {
  return {
    type: 'ADD_SONG',
    id: next_id++,
    title,
    versions: [{ 
      "id": 0,
      "title": "Version #1 (new)",
      "created_at": "14 march, 2017",
      "recording": "file.mp3",
      "notes": "Add notes here",
      "lyrics": "Add lyrics here"
    }]
  }
}
