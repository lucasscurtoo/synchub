import { Chip } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface StatusRenderProps {
  status: string
}

const RenderStatus = ({ status }: StatusRenderProps) => {
  const [key, setKey] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [status])

  return (
    <Chip
      key={key}
      variant='dot'
      color={status === 'Active' ? 'primary' : 'default'}
      className='items-center text-sm text-appColors-textGray dark:text-appColors-lightGraySecondary'
      classNames={{
        base: `border-none w-fill px-0 dot-`,
      }}
    >
      {t(status) ?? t('Offline')}
    </Chip>
  )
}

export default RenderStatus

