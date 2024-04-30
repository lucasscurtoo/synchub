import enUserConfig from './en/userConfig.json'
import esUserConfig from './es/userConfig.json'
import enUserDropdown from './en/userDropdown.json'
import esUserDropdown from './es/userDropdown.json'
import enUserDetails from './en/userDetails.json'
import esUserDetails from './es/userDetails.json'
import enSections from './en/sections.json'
import esSections from './es/sections.json'
import enCommon from './en/common.json'
import esCommon from './es/common.json'

export const resources = {
  en: {
    translation: {
      ...enUserConfig,
      ...enUserDropdown,
      ...enUserDetails,
      ...enSections,
      ...enCommon,
    },
  },
  es: {
    translation: {
      ...esUserConfig,
      ...esUserDropdown,
      ...esUserDetails,
      ...esSections,
      ...esCommon,
    },
  },
}
