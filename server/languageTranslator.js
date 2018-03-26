const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');

const languageTranslator = new LanguageTranslatorV2({
  username: '332be775-f147-43ce-9afb-a955b3855936',
  password: 'VdaWbwSTz75V',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

let parameters = {
  text: 'Goodbye',
  model_id: 'en-es'
};

// languageTranslator.translate(
//   parameters,
//   (error, response) => {
//     if (error)
//       console.log(error)
//     else
//       console.log(JSON.stringify(response, null, 2));
//   }
// );

// languageTranslator.listIdentifiableLanguages(
//   {},
//   (err, response) => {
//     if (err)
//       console.log(err)
//     else
//       console.log(JSON.stringify(response, null, 2));
//   }
// );

module.exports = { languageTranslator };