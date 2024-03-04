let server = {
    LOCAL_PORT: 4000,
    LOCAL_SERVER: 'http://localhost',
    // REMOTE_SERVER: 'https://us-central1-wagermatch-a71e9.cloudfunctions.net'
    REMOTE_SERVER: 'https://wagermatch.herokuapp.com'
}

let baseURL = process.env.NODE_ENV == 'development' ?
                (server.LOCAL_SERVER + ':' + server.LOCAL_PORT) :
                (server.REMOTE_SERVER)

export default baseURL