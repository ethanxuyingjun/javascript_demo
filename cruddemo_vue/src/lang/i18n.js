import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'

import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

const messages = {
   en: Object.assign(en, enLocale),
   zh: Object.assign(zh, zhLocale)
}

const i18n = new VueI18n({
   locale: localStorage.getItem('locale') || 'en',
   messages 
 })

locale.i18n((key, value) => i18n.t(key, value))

export default i18n