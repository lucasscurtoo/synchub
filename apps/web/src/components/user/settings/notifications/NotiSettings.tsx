import { Checkbox } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const NotiSettings = () => {
  const { t } = useTranslation()
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='flex'
      >
        <Checkbox>
          <h3 className='text-lg text-appColors-primaryText'>
            {t('Mute all notifications')}
          </h3>
          <p className='absolute text-sm font-light w-96 text-clip text-appColors-gray'>
            {t('Mute all notifications, this setting will be on all devices')}
          </p>
        </Checkbox>
      </motion.div>
    </AnimatePresence>
  )
}
export default NotiSettings

