import { formatFileSize, truncateFileName } from '@/lib/utils'
import {
  CheckCircleIcon,
  DocumentArrowUpIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid'
import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import useFileUpload from '@/hooks/useFileUpload'

const UserPhotoUploader = () => {
  const { file, handleFileUpload, handleDrop, handleDragOver } = useFileUpload()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileUpload(event.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='flex flex-col w-full'>
      <div
        className='flex flex-col items-center justify-center border-2 bg-appColors-lightBlue w-80 h-52 border-appColors-blue rounded-2xl gap-y-8'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type='file'
          className='hidden'
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <div className='flex flex-col items-center gap-y-4'>
          <DocumentArrowUpIcon className='w-12 text-appColors-blue' />
          <p className='text-lg text-appColors-textGray'>
            Drag & drop your files here or
          </p>
        </div>
        <button
          className='px-8 py-3 font-medium transition-all rounded-2xl bg-appColors-secondLightBlue text-appColors-text hover:bg-appColors-blue hover:text-white'
          onClick={handleButtonClick}
        >
          Choose File
        </button>
      </div>
      <p className='my-2 text-sm font-normal text-appColors-textGray'>
        Only .jpg and .png files. 500Kb max file size.
      </p>
      {file && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          key={file.name}
          className='flex items-center gap-x-3'
        >
          <PhotoIcon className='w-11 text-appColors-blue' />
          <div className='flex flex-col'>
            <p className='text-sm break-all text-clip max-w-56 text-appColors-text'>
              {truncateFileName(file.name, 28)}
            </p>
            <p className='text-xs font-normal text-appColors-textGray'>
              {formatFileSize(file.size)}
            </p>
          </div>
          <CheckCircleIcon className='w-6 ml-auto text-appColors-successGreen' />
        </motion.div>
      )}
    </div>
  )
}

export default UserPhotoUploader
