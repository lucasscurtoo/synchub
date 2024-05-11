import { AnimatePresence, motion } from 'framer-motion'
import CustomSelect from '@/components/nextui/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Checkbox } from '@nextui-org/react'
import { setAppLanguage, toggleSpellcheckOn } from '@/redux/reducers/appSlice'
import i18n from '@/i18n/i18n.config'
import { useTranslation } from 'react-i18next'

const LangSettings = () => {
  const { t } = useTranslation()
  const { language, spellCheck } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )
  const Languages = [
    { label: t('English'), value: 'en' },
    { label: t('Spanish'), value: 'es' },
  ]
  const dispatch = useDispatch()

  const handleLanguageChange = (e: any) => {
    if (e.target.value !== language && e.target.value !== '') {
      dispatch(setAppLanguage(e.target.value))
      i18n.changeLanguage(e.target.value)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col space-y-8'
      >
        <CustomSelect
          label={t('Language')}
          isMultiple={false}
          value={language}
          options={Languages}
          onChange={handleLanguageChange}
          placeholder={t('Select a language')}
          description={t('Choose the language you’d like to use with the app.')}
        />
        <div className='flex flex-col space-y-0'>
          <h4 className='text-appColors-primaryText dark:text-appColors-blueWhite'>
            {t('Spellcheck')}
          </h4>
          <Checkbox
            onValueChange={() => dispatch(toggleSpellcheckOn())}
            isSelected={spellCheck}
          >
            <h4 className='font-light text-appColors-gray '>
              {t('Enable spellcheck')}
            </h4>
          </Checkbox>
          <CustomSelect
            isMultiple={true}
            options={Languages}
            value={language}
            isDisabled={!spellCheck}
            onChange={() => {}}
            description={t(
              'Choose the language you’d like to use to spellcheck.'
            )}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
export default LangSettings

