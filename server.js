const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const server = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const apikey = process.env.API_KEY;
const url = process.env.URL;

// WATSON SETUP
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: `${apikey}`,
  }),
  url: `${url}`,
  disableSslVerification: true,
});

// App-level Middleware
server.use(express.json());
server.use(cors());

// Route Handling
server.get('/tone/:text', (request, response) => {
  const {text} = request.params;
  const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
  };

  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      response.status(200).json(toneAnalysis.result);
    })
    .catch(err => {
      response.status(400).json({error: err});
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
