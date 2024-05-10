import { setAppTheme } from '@/redux/reducers/appSlice'
import { RootState } from '@/redux/store'
import { Checkbox } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

const ThemeSettings = () => {
  const appTheme = useSelector(
    (state: RootState) => state.persistedAppReducer.app.appTheme
  )
  const dispatch = useDispatch()
  const { t } = useTranslation()

  return (
    <div className='flex flex-col space-y-2'>
      <h4 className='text-appColors-primaryText'>{t('Theme')}</h4>
      <p className='text-sm font-light truncate text-appColors-gray'>
        {t('Choose the app theme you’d like to use.')}
      </p>
      <div className='flex flex-col pt-5 space-y-4'>
        <Checkbox
          onValueChange={() => dispatch(setAppTheme('System'))}
          isSelected={appTheme === 'System'}
        >
          <h4 className='text-appColors-primaryText'>{t('System')}</h4>
        </Checkbox>
        <Checkbox
          onValueChange={() => dispatch(setAppTheme('Light'))}
          isSelected={appTheme === 'Light'}
        >
          <h4 className='text-appColors-primaryText'>{t('Light')}</h4>
        </Checkbox>
        <Checkbox
          onValueChange={() => dispatch(setAppTheme('Dark'))}
          isSelected={appTheme === 'Dark'}
        >
          <h4 className='text-appColors-primaryText'>{t('Dark')}</h4>
        </Checkbox>
      </div>
    </div>
  )
}
export default ThemeSettings

