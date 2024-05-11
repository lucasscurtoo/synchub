import { setAppTheme } from '@/redux/reducers/appSlice'
import { RootState } from '@/redux/store'
import { Checkbox } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const ThemeSettings = () => {
  const appTheme = useSelector(
    (state: RootState) => state.persistedAppReducer.app.appTheme
  )
  const { setTheme } = useTheme()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleChangeTheme = (theme: string) => {
    dispatch(setAppTheme(theme))
    setTheme(theme)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className='flex flex-col space-y-2'
    >
      <h4 className='text-appColors-primaryText dark:text-appColors-blueWhite'>
        {t('Theme')}
      </h4>
      <p className='text-sm font-light truncate text-appColors-gray dark:text-appColors-lightGrayPrimary'>
        {t('Choose the app theme you’d like to use.')}
      </p>
      <div className='flex flex-col pt-5 space-y-4'>
        <Checkbox
          onValueChange={() => handleChangeTheme('system')}
          isSelected={appTheme === 'system'}
        >
          <h4 className='text-appColors-primaryText dark:text-appColors-lightGrayPrimary'>
            {t('System')}
          </h4>
        </Checkbox>
        <Checkbox
          onValueChange={() => handleChangeTheme('light')}
          isSelected={appTheme === 'light'}
        >
          <h4 className='text-appColors-primaryText dark:text-appColors-lightGrayPrimary'>
            {t('Light')}
          </h4>
        </Checkbox>
        <Checkbox
          onValueChange={() => handleChangeTheme('dark')}
          isSelected={appTheme === 'dark'}
        >
          <h4 className='text-appColors-primaryText dark:text-appColors-lightGrayPrimary'>
            {t('Dark')}
          </h4>
        </Checkbox>
      </div>
    </motion.div>
  )
}
export default ThemeSettings

