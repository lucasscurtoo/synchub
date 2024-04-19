export const validateEmail = (value: string) =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

export const formatFileSize = (size: number): string => {
  let formattedSize: string

  if (size >= 1024 * 1024) {
    // size is larger than 1 MB
    formattedSize = (size / (1024 * 1024)).toFixed(2) + ' MB'
  } else {
    // size is smaller than 1 MB (but larger than 1 KB)
    formattedSize = (size / 1024).toFixed(2) + ' KB'
  }

  return formattedSize
}

export const truncateFileName = (
  fileName: string,
  maxLength: number
): string => {
  if (fileName.length <= maxLength) {
    return fileName
  }

  const extension = fileName.slice(fileName.lastIndexOf('.'))
  const name = fileName.slice(0, fileName.lastIndexOf('.'))
  const truncatedName = name.slice(0, maxLength - extension.length)

  return `${truncatedName}... ${extension}`
}
