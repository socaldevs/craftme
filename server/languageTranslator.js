const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

const languageTranslator = new LanguageTranslatorV2({
  username: '332be775-f147-43ce-9afb-a955b3855936',
  password: 'VdaWbwSTz75V',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

console.log('LOOK', process.env.PEERKEY);

// username: `${process.env.USRNM}`,
//   password: `${process.env.PSWRD}`,
//   url: `${process.env.WATSON}`

module.exports = { languageTranslator };