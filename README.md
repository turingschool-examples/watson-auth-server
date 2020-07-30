# Watson Authentication Server

A server for students to run locally in order to use the IBM Watson Tone Analyzer API.

## Set Up

1. Make sure you are NOT inside your FE repository.
1. Clone down this repo: `$ git clone git@github.com:turingschool-examples/watson-auth-server.git`
1. Change directories into the `watson-auth-server` repository.
1. Install dependencies: `$ npm install`
1. Touch a `.env` file in the root of repo. Notice that there is no name in front of the `.env` file extension.
1. Create an IBM Cloud account.
1. Head to the [Tone Analyzer page](https://cloud.ibm.com/catalog/services/tone-analyzer)
1. Fill in the form and hit the `Create` button to create a connection to the API.
1. Select "Manage" from the tab navigation to get your credentials: an `API KEY` and a `URL`. 
1. In the `.env` file of your cloned `watson-auth-server` repo, add the following code:

  ```
  API_KEY=yourKeyGoesHere
  URL=yourURLgoesHere
  ```

1. Be SURE that your environment variable names are exactly `API_KEY` and `URL`
1. Replace "yourKeyGoesHere" with your API key. Do not add quotes around it.
1. Replace "yourURLgoesHere" with your url. Do not add quotes around it.
1. Save your changes.
1. To start the server, run the start script: `$ npm start`

## Endpoint

| Method | Endpoint                         | Sample Request                                               | Sample Response                                              |
| ------ | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| GET    | http://localhost:5000/tone/:text | http://localhost:5000/tone/oh%20my%20gosh,%20this%20is%20so%20cool!%20I%20can't%20believe%20it's%20working! | {"document_tone":{"tones":[{"score":0.654847,"tone_id":"joy","tone_name":"Joy"},{"score":0.966403,"tone_id":"tentative","tone_name":"Tentative"}]},"sentences_tone":[{"sentence_id":0,"text":"oh my gosh, this is so cool!","tones":[{"score":0.70421,"tone_id":"joy","tone_name":"Joy"}]},{"sentence_id":1,"text":"I can't believe it's working!","tones":[{"score":0.968123,"tone_id":"tentative","tone_name":"Tentative"}]}]} |

In case of an error, instead of an object of relevant data, you will receive back an object with a key of "error".

Here is a closer look at the sample response:

```js
{
  "document_tone": {
    "tones": [
      {
        "score": 0.654847,
        "tone_id": "joy",
        "tone_name": "Joy"
      },
      {
        "score": 0.966403,
        "tone_id": "tentative",
        "tone_name": "Tentative"
      }
    ]
  },
  "sentences_tone": [
    {
      "sentence_id": 0,
      "text": "oh my gosh, this is so cool!",
      "tones": [
        {
          "score": 0.70421,
          "tone_id": "joy",
          "tone_name": "Joy"
        }
      ]
    },
    {
      "sentence_id": 1,
      "text": "I can't believe it's working!",
      "tones": [
        {
          "score": 0.968123,
          "tone_id": "tentative",
          "tone_name": "Tentative"
        }
      ]
    }
  ]
}
```

As you can see, the text to be analyzed is passed in as a query parameter into the URL itself.

The `%20`s replacing the spaces in the sentences may not be necessary! If however, you receive errors, you can try modifying your query string with the following helper function:

```js
const modifyText = (sentence) => sentence.split(' ').map(word => `${word}%20`).reduce((sentence, word) => sentence + word, '');
```

