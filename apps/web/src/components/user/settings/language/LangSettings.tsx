import { AnimatePresence, motion } from 'framer-motion'
import CustomSelect from '@/components/nextui/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Checkbox } from '@nextui-org/react'
import { setAppLanguage, toggleSpellcheckOn } from '@/redux/reducers/appSlice'
import { ChangeEvent, ChangeEventHandler } from 'react'
import i18n from '@/i18n/i18n.config'

const LangSettings = () => {
  const { language, spellCheck } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )
  const Languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
  ]
  const dispatch = useDispatch()

  const handleLanguageChange = (e: any) => {
    dispatch(setAppLanguage(e.target.value))
    i18n.changeLanguage(e.target.value)
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
          label='Language'
          isMultiple={false}
          value={language}
          options={Languages}
          onChange={handleLanguageChange}
          placeholder='Select a language'
          description='Choose the language you’d like to use with the app.'
        />
        <div className='flex flex-col space-y-0'>
          <h4 className='text-appColors-text'>Spellcheck</h4>
          <Checkbox
            onValueChange={() => dispatch(toggleSpellcheckOn())}
            isSelected={spellCheck}
          >
            <h4 className='font-light text-appColors-gray'>
              Enable spellcheck
            </h4>
          </Checkbox>
          <CustomSelect
            isMultiple={true}
            options={Languages}
            value={language}
            isDisabled={!spellCheck}
            onChange={handleLanguageChange}
            placeholder='Select the spellcheck'
            description='Choose the language you’d like to use to spellcheck.'
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
export default LangSettings

