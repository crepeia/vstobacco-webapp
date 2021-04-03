import I18n from 'i18n-js';
import * as Localization from 'expo-localization';

import en from './Idiomas/en'
import pt from './Idiomas/pt'

//Possíveis linguagens que o aparelho pode providenciar e sua devida normalização
const languages = ['en-US', 'pt-BR', 'en', 'pt_US']

//Traduções que vamos utilizar no App
I18n.translations = 
{
    'en-US': en,
    'en': en,
    'pt-BR': pt,
    'pt_US': pt,
}

//Retorno da linguagem que o aparelho está utilizando
const getDeviceLanguage = () =>
{
    return Localization.locale
}

//Checa se há uma tradução disponível para a linguagem do celular no App (caso não tenha a linguagem padrão será o inglês)
export const isThereTranslation = () =>
{
    const deviceLanguage = getDeviceLanguage()

    return languages.includes(deviceLanguage)
}

//Define a linguagem a ser apresentada no App
const setAppLanguage = () =>
{
    const deviceLanguage = getDeviceLanguage()

    isThereTranslation() ? I18n.locale = deviceLanguage : I18n.defaultLocale = 'en-US'
}

setAppLanguage()

// i18n.fallbacks = true;
// i18n.translations = { pt, en };
// i18n.locale = Localization.locale;

export default I18n;