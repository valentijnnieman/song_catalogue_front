export const editVersion = (version) => {
  return {
    type: 'EDIT_VERSION',
    song_id: 1, 
    version_id: version.id,
    version: version
  }
}
