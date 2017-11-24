/**
 * Created by zhulijun on 2017/7/19.
 */
import i18n from 'i18next'

const startI18n = (file, lang) => i18n.init({
    lng: lang, // active language http://i18next.com/translate/
    fallbackLng: 'pt',
    resources: file,
    ns: ['common'],
    defaultNS: 'common',
    debug: false
})

export default startI18n
