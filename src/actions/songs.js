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
export const editSong = (song, song_id) => {
  return {
    type: 'EDIT_SONG',
    song: song,
    song_id: song_id
  }
}

export const removeSong = (song_id) => {
  console.log("removing song: ", song_id)
  return {
    type: 'REMOVE_SONG',
    song_id: song_id
  }
}
