import Link from 'next/link'
import { ButtonConfig } from './Sidebar'
import { useDispatch } from 'react-redux'
import { setAppSection } from '@/redux/reducers/appSlice'

interface SidebarButtonProps extends ButtonConfig {
  isActive: boolean
}

const SidebarButton = ({
  isActive,
  label,
  path,
  IconActive,
  IconInactive,
}: SidebarButtonProps) => {
  const Icon = isActive ? IconActive : IconInactive
  const dispatch = useDispatch()

  return (
    <Link
      href={path}
      passHref
      onClick={() => dispatch(setAppSection(label.toLowerCase()))}
    >
      <div
        className={`flex items-center p-3 space-x-4 rounded-2xl ${
          isActive ? 'bg-appColors-primary' : 'bg-transparent'
        }`}
      >
        <Icon
          className={`w-8 ${
            isActive ? 'text-appColors-blueWhite' : 'text-appColors-primary'
          }`}
        />
        <h3
          className={`text-lg ${
            isActive ? 'text-appColors-blueWhite' : 'text-appColors-gray'
          }`}
        >
          {label}
        </h3>
      </div>
    </Link>
  )
}

export default SidebarButton

