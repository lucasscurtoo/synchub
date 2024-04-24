'use client'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomToast from './CustomToast'
import { RootState } from '@/redux/store'
import { clearAppNotification } from '@/redux/reducers/appSlice'

const ShowToast = () => {
  const [showToast, setShowToast] = useState(false)
  const { appNotification } = useSelector(
    (state: RootState) => state.persistedAppReducer.app
  )
  const dispatch = useDispatch()

  console.log('render')

  useEffect(() => {
    if (appNotification.message !== '') {
      setShowToast(true)
    }
  }, [appNotification])

  const handleToastClose = () => {
    setShowToast(false)
    dispatch(clearAppNotification())
  }

  return (
    <CustomToast
      show={showToast}
      toastOnClose={handleToastClose}
      notifi={appNotification?.message}
      state={!appNotification?.error}
    />
  )
}

export default ShowToast
