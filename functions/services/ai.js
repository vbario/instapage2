const axios = require('axios')

let orgId = 'org-J1DGy3rE6Yj2avASKogJq0vM'
let openAIApiKey = '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'

// const { Configuration, OpenAIApi } = require('openai')
// const configuration = new Configuration({
//   apiKey: openAIApiKey
// });
// const openai = new OpenAIApi(configuration);

let generateWebsite = async (htmlInput) => {
  return new Promise(async (resolve, reject) => {
    let headers = {
        'Authorization': `Bearer ${openAIApiKey}`,
        'OpenAI-Organization': orgId,
        'Content-Type': 'application/json'
    }

    let makeWebsite = await axios({
      url: `https://api.openai.com/v1/chat/completions`,
      method: 'post',
      headers,
      data: {
        "model": "gpt-4",
        "messages": [
          {
            "role": "user",
            "content": "Make a website using the following input:"
          },
          {
            "role": "user",
            "content": htmlInput
          }
        ],
        "temperature": 1,
        // "max_tokens": 256,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0
      }
    }).catch((err) => {
        console.log('error', err)
    })

    console.log('RESPONSE', makeWebsite.data.choices)
    return resolve(makeWebsite.data.choices)
    // console.log('makeWebsite', makeWebsite)
  })
}

exports.generateWebsite = generateWebsite