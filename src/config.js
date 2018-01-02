var mode   = NODE_ENV
let endpoint
if(mode == "development") {
    endpoint = "http://localhost:8080/"
} else if(mode == "production") {
    endpoint = "https://song-catalogue-api.herokuapp.com/"
}

export {endpoint}