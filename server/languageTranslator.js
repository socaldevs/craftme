const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
const env = require('dotenv');
const path = require('path'); 

env.config({path: path.resolve(__dirname, '../../.env')});

const languageTranslator = new LanguageTranslatorV2({
  username: process.env.USRNM,
  password: process.env.PSWRD,
  url: process.env.WATSON
});

module.exports = { languageTranslator };