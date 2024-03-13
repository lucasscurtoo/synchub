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

  const colorsByStatus = {
    Active: 'appColors-blue',
    Offline: 'appColors-gray',
  }

  const color =
    (colorsByStatus as Record<string, string>)[status] || 'appColors-gray'
  return (
    <Chip
      key={key}
      variant='dot'
      className='items-center text-sm text-appColors-textGray'
      classNames={{
        base: `border-none w-fill px-0 dot-`,
        dot: `!bg-${color}`,
      }}
    >
      {status ?? 'Offline'}
    </Chip>
  )
}

export default StatusRender
