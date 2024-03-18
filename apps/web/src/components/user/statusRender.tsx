import { Chip } from '@nextui-org/react'
import { useState, useEffect } from 'react'

interface StatusRenderProps {
  status: string
}

const StatusRender = ({ status }: StatusRenderProps) => {
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [status])

  return (
    <Chip
      key={key}
      variant='dot'
      color={status === 'Active' ? 'primary' : 'default'}
      className='items-center text-sm text-appColors-textGray'
      classNames={{
        base: `border-none w-fill px-0 dot-`,
      }}
    >
      {status ?? 'Offline'}
    </Chip>
  )
}

export default StatusRender
