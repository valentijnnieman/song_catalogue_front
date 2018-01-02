var mode   = NODE_ENV
console.log("MODE: " + mode)
let endpoint
if(mode == "development") {
    endpoint = "http://localhost:8080/"
} else if(mode == "production") {
    endpoint = "https://song-catalogue-api.herokuapp.com/"
}

export {endpoint}