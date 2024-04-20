import { useState } from 'react'

const useImageUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validTypes = ['image/png', 'image/jpeg']

  const handleFileUpload = (file: File) => {
    if (validTypes.includes(file.type)) {
      setFile(file)
      setError(null)
    } else {
      setFile(null)
      setError('Invalid file type. Only PNG and JPG files are allowed.')
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (event.dataTransfer.files.length > 0) {
      handleFileUpload(event.dataTransfer.files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return { file, error, handleFileUpload, handleDrop, handleDragOver }
}

export default useImageUpload

