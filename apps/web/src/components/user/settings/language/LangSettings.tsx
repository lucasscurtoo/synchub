import { AnimatePresence, motion } from 'framer-motion'
import CustomSelect from '@/components/nextui/CustomSelect'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Checkbox } from '@nextui-org/react'
import { toggleSpellcheckOn } from '@/redux/reducers/appSlice'

const LangSettings = () => {
  const spellCheck = useSelector(
    (state: RootState) => state.persistedAppReducer.app.spellCheck
  )
  const Languages = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
  ]
  const dispatch = useDispatch()

  // hacer que el default language sea el del sistema

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
          values={Languages}
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
            values={Languages}
            isDisabled={!spellCheck}
            placeholder='Select the spellcheck'
            description='Choose the language you’d like to use to spellcheck.'
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
export default LangSettings
