export function createVersion(token, song_index, song_id, version_id, version_title) {
  return function (dispatch) {
    return fetch(`http://localhost:8080/auth/version/create`, {
      method: "POST",
      body: JSON.stringify({
        title: version_title,
        "recording": "file.mp3",
        "notes": "Add notes here",
        "lyrics": "Add lyrics here",
        "song_id": song_id
      }),
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(json => { 
          dispatch(addVersion(song_index, json.version))
        })
      }
      else { 
        console.log("ERROR! Couldn't create version!")  
      }
    })
  }
}
export function updateVersion(token, song_index, song_id, version_index, version) {
  return function (dispatch) {
    return fetch(`http://localhost:8080/auth/version/${version.ID}/update`, {
      method: "PATCH",
      body: JSON.stringify({
        title: version.title,
        "recording": version.recording,
        "notes": version.notes,
        "lyrics": version.lyrics,
        "song_id": song_id
      }),
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(json => { 
          dispatch(editVersion(song_index, version_index, json.version))
        })
      }
      else { 
        console.log("ERROR! Couldn't create version!")  
      }
    })
  }
}
export function updateRecording(token, song_index, song_id, version_index, version_id, file) {
  return function (dispatch) {
    var data = new FormData()
    data.append('song_id', song_id)
    data.append('version_id', version_id)
    data.append('file', file)
    return fetch(`http://localhost:8080/auth/version/recording`, {
      method: "POST",
      body: data,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(json => { 
          dispatch(editVersion(song_index, version_index, json.version))
        })
      }
      else { 
        console.log("ERROR! Couldn't create version!")  
      }
    })
  }
}
export function deleteVersion(token, song_index, song_id, version_index, version_id,) {
  return function (dispatch) {
    return fetch(`http://localhost:8080/auth/song/${song_id}/version/${version_id}/delete`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      if(response.ok) {
        response.json()
        .then(json => { 
          dispatch(removeVersion(song_index, version_index))
        })
      }
      else { 
        console.log("ERROR! Couldn't delete song!")  
      }
    })
  }
}

export const addVersion = (song_index, version) => {
  return { 
    type: 'ADD_VERSION',
    song_index: song_index,
    version: version
  }
}
export const editVersion = (song_index, version_index, version) => {
  return {
    type: 'EDIT_VERSION',
    song_index: song_index, 
    version_index: version_index,
    version: version
  }
}

export const removeVersion = (song_index, version_index) => {
  return {
    type: 'REMOVE_VERSION',
    song_index: song_index,
    version_index: version_index
  }
}
