export const addVersion = (song_id, version_id, title) => {
  return { 
    type: 'ADD_VERSION',
    song_id: song_id,
    version: {
      "id": version_id,
      "title": title,
      "created_at": "14 march, 2017",
      "recording": "file.mp3",
      "notes": "Add notes here",
      "lyrics": "Add lyrics here"
    }
  }
}
export const editVersion = (version, song_id) => {
  return {
    type: 'EDIT_VERSION',
    song_id: song_id, 
    version: version
  }
}

export const removeVersion = (song_id, version_id) => {
  return {
    type: 'REMOVE_VERSION',
    song_id: song_id,
    version_id: version_id
  }
}
