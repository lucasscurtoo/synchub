import { setAppTheme } from '@/redux/reducers/appSlice'
import { RootState } from '@/redux/store'
import { Checkbox } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'

const ThemeSettings = () => {
  const appTheme = useSelector((state: RootState) => state.app.appTheme)
  const dispatch = useDispatch()

  return (
    <div className='flex flex-col space-y-2'>
      <h4 className='text-appColors-text'>Theme</h4>
      <p className='text-sm font-light truncate text-appColors-gray'>
        Choose the app theme you’d like.
      </p>
      <div className='flex flex-col pt-5 space-y-4'>
        <Checkbox
          onValueChange={() => dispatch(setAppTheme('OS'))}
          isSelected={appTheme === 'OS'}
        >
          <h4 className='text-appColors-text'>OS theme</h4>
        </Checkbox>
        <Checkbox
          onValueChange={() => dispatch(setAppTheme('Light'))}
          isSelected={appTheme === 'Light'}
        >
          <h4 className='text-appColors-text'>Light theme</h4>
        </Checkbox>
        <Checkbox
          onValueChange={() => dispatch(setAppTheme('Dark'))}
          isSelected={appTheme === 'Dark'}
        >
          <h4 className='text-appColors-text'>Dark theme</h4>
        </Checkbox>
      </div>
    </div>
  )
}
export default ThemeSettings
