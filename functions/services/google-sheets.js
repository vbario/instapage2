// const {google} = require('googleapis');
const querystring = require('querystring')
let redirectUri = process.env.NODE_ENV == 'production' ? `https://pushableapp.com/more` : `http://localhost:8080/more`
const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const scope1 = `https://www.googleapis.com/auth/spreadsheets` // Replace with your scope
const axios = require('axios');

let writeLastRowToSpreadsheet = async (token, spreadsheetId, data) => {
  const SPREADSHEET_ID = spreadsheetId;  // Replace with your Spreadsheet ID
  const RANGE = 'OML_SHIP';  // This assumes you want to append data starting from the A column. Adjust as needed.
 
  const values = data

  const sheetsEndpoint = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  console.log('A', token)

  try {
    console.log('B')
    const response = await axios.post(sheetsEndpoint, {
        values: values
    }, {
        headers: {
            'Authorization': `Bearer ${token.access_token}`,
            'Content-Type': 'application/json'
        }
    });

    console.log("Data appended successfully!", response.data);
  } catch (error) {
      console.error("Failed to append data:", error.response.data);
  }
}

let getMySheets = async (token) => {
  // get the token from uid
  const endpoint = `https://www.googleapis.com/drive/v3/files` // Replace with the service's auth endpoint

  axios.get(endpoint, {
    headers: {
      'Authorization': `Bearer ${token.access_token}`
    },
    params: {
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      spaces: 'drive',
      fields: 'files(id, name)',  // This will return only the ID and name of each file. Add/modify fields as necessary.
    }
  })
  .then(response => {
    console.log('List of Spreadsheets:');
    console.log(response.data.files);
    return response.data
  })
  .catch(error => {
    console.error('Error fetching the list of spreadsheets:', error);
    return error
  });
  // const queryParams = querystring.stringify({
  //   grant_type: 'authorization_code',
  //   code,
  //   client_id: clientId,
  //   client_secret: clientSecret,
  //   redirect_uri: redirectUri
  // });

  // let headers = {
  //     // 'Authorization': `Bearer ${token.access_token}`,
  //     'Content-Type': 'application/x-www-form-urlencoded'
  // }

  // let accessToken = await axios({
  //   url: `${authorizationEndpoint}?${queryParams}`,
  //   method: 'post',
  //   headers
  // }).catch((error) => {
  //   console.log('error', error)
  // })

  // console.log('getTokenFromCode res', accessToken.data)

  // return accessToken.data;

}

let generateAuthUrl = async () => {
  const authorizationEndpoint = `https://accounts.google.com/o/oauth2/v2/auth` // Replace with the service's auth endpoint
  
  const queryParams = querystring.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scope1,
    response_type: 'code',
    state: 'abcdef'
  });

  const authorizationURL = `${authorizationEndpoint}?${queryParams}`;

  return authorizationURL;
}

let getTokenFromCode = async (code) => {
  // let db = admin.database()
  const authorizationEndpoint = `https://oauth2.googleapis.com/token` // Replace with the service's auth endpoint

  const queryParams = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri
  });

  let headers = {
      // 'Authorization': `Bearer ${token.access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded'
  }

  let accessToken = await axios({
    url: `${authorizationEndpoint}?${queryParams}`,
    method: 'post',
    headers
  }).catch((error) => {
    console.log('error', error)
  })

  console.log('getTokenFromCode res', accessToken.data)

  return accessToken.data;
}

exports.generateAuthUrl = generateAuthUrl
exports.getTokenFromCode = getTokenFromCode
exports.getMySheets = getMySheets
exports.writeLastRowToSpreadsheet = writeLastRowToSpreadsheet