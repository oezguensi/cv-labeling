import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import * as english from './assets/languages/english.json'
import * as german from './assets/languages/german.json'

const resources = { en: english, de: german }
i18n.use(initReactI18next).init({ fallbackLng: "en", resources, lng: "en" })
