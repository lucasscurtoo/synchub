import Link from 'next/link'
import { ButtonConfig } from './Sidebar'

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

  return (
    <Link href={path} passHref>
      <div
        className={`flex items-center p-3 space-x-4 rounded-2xl ${
          isActive ? 'bg-appColors-blue' : 'bg-transparent'
        }`}
      >
        <Icon
          className={`w-8 ${
            isActive ? 'text-appColors-backgroundBlue' : 'text-appColors-blue'
          }`}
        />
        <h3
          className={`text-lg ${
            isActive ? 'text-appColors-backgroundBlue' : 'text-appColors-gray'
          }`}
        >
          {label}
        </h3>
      </div>
    </Link>
  )
}

export default SidebarButton
