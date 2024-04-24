import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface CustomToastProps {
  notifi: string
  state: boolean
  show: boolean
  toastOnClose: (value: boolean) => void
}

const CustomToast = ({
  notifi,
  state,
  show,
  toastOnClose,
}: CustomToastProps) => {
  useEffect(() => {
    if (show) {
      if (!state) {
        toast.error(notifi, {
          theme: 'colored',
          onClose: () => toastOnClose(true),
        })
      } else {
        toast.success(notifi, {
          theme: 'colored',
          onClose: () => toastOnClose(true),
        })
      }
    }
  }, [show])

  return (
    <div>
      <ToastContainer
        progressClassName='toastProgress'
        bodyClassName='toastBody'
        className='bg-white'
        position='top-center'
        autoClose={3000}
      />
    </div>
  )
}

export default CustomToast
