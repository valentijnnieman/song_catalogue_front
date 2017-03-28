export const editVersion = (version) => {
  console.log("version", version)
  return {
    type: 'EDIT_VERSION',
    song_id: 1, 
    version_id: 0,
    version: version
  }
}
