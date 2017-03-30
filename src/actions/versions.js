export const editVersion = (version, song_id) => {
  return {
    type: 'EDIT_VERSION',
    song_id: song_id, 
    version_id: version.id,
    version: version
  }
}
