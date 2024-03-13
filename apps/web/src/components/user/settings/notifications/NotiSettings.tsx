import { Checkbox } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'

const NotiSettings = () => {
  // fijarme si hace falta la carpeta de notifications o pongo todos los componentes en 1 sola carpeta en vez de hacer una carpeta por seccion
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='flex'
      >
        <Checkbox>
          <h3 className='text-lg text-appColors-text'>
            Mute all notifications
          </h3>
          <p className='absolute text-sm font-light truncate text-appColors-gray'>
            Mute all notifications, this setting will be on all devices
          </p>
        </Checkbox>
      </motion.div>
    </AnimatePresence>
  )
}
export default NotiSettings
