import React, { useState } from 'react'
import { Modal, ModalBody, ModalContent } from '@nextui-org/react'
import { LanguageIcon } from '@heroicons/react/24/outline'
import {
  BellIcon,
  PaintBrushIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/solid'
import NotiSettings from './notifications/NotiSettings'
import LangSettings from './language/LangSettings'
import ThemeSettings from './theme/ThemeSettings'

const settingsSections = [
  {
    key: 'Notifications',
    icon: BellIcon,
    title: 'Notifications',
    component: NotiSettings,
  },
  {
    key: 'Language',
    icon: LanguageIcon,
    title: 'Language',
    component: LangSettings,
  },
  {
    key: 'Audio&video',
    icon: VideoCameraIcon,
    title: 'Audio & video',
    component: NotiSettings,
  },
  {
    key: 'Theme',
    icon: PaintBrushIcon,
    title: 'Theme',
    component: ThemeSettings,
  },
]

const SettingsModal = ({ disclosure }: any) => {
  const { isOpen, onOpen, onOpenChange, onClose } = disclosure
  const [settingsSection, setSettingsSection] = useState('Notifications')

  const SectionComponent = settingsSections.find(
    (section) => section.key === settingsSection
  )?.component

  return (
    <Modal
      className='!max-w-160 !h-100'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody className='p-0'>
            <div className='flex w-full h-full'>
              <div className='flex flex-col p-8 space-y-8 border-r-[0.5px] w-fit h-full'>
                {settingsSections.map((section) => (
                  <div
                    key={section.key}
                    onClick={() => setSettingsSection(section.key)}
                    className={`flex cursor-pointer items-center space-x-3 transform transition-all delay-100 ${
                      settingsSection === section.key
                        ? 'text-appColors-blue'
                        : 'text-appColors-textGray'
                    }`}
                  >
                    <section.icon className='w-6' />
                    <h4>{section.title}</h4>
                  </div>
                ))}
              </div>
              <div className='p-8'>
                {SectionComponent && <SectionComponent />}
              </div>
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  )
}

export default SettingsModal
