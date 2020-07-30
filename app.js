const dotenv = require('dotenv');
dotenv.config();

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require(cors);
const port = process.env.PORT || 5000;

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
cosnt { IamAuthenticator } = require('ibm-watson/auth');

const getAuthentication = () => {
  const authenticator = new IamAuthenticator({
    apiKey: process.env.API_KEY
  })
  return authenticator;
}

app.use(bodyParser.json());
app.use(cors());

app.get('/authentication', (req, res) => { 
  //
  // I'm not sure how sending the auth as json will work, but this would be for
  // if you just wanted to get your auth token from the server and do everything 
  // else on the client side
  //
  const auth = getAuthentication;
  res.status(200).json({authentication: JSON.stringify(auth)}) 
});

app.listen(port, () => console.log(`Server running on port ${port}`));
