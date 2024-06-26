/**
 * Validates an email address.
 * @param value - The email address to validate.
 * @returns True if the email address is valid, false otherwise.
 */
export const validateEmail = (value: string): boolean =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) !== null

/**
 * Formats a file size in bytes to a human-readable string.
 * @param size - The file size in bytes.
 * @returns The formatted file size string.
 */
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

/**
 * Truncates a file name if it exceeds a maximum length.
 * @param fileName - The file name to truncate.
 * @param maxLength - The maximum length of the truncated file name.
 * @returns The truncated file name.
 */
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

/**
 * Formats a date to the "YYYY-MM-DD" format.
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export const formatDateYMD = (date: Date | string): string => {
  const dateObj = new Date(date)
  const formattedDate = `${dateObj.getFullYear()}-${String(
    dateObj.getMonth() + 1
  ).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
  return formattedDate
}

/**
 * Formats a date for chat sections.
 * @param date - The date to format.
 * @returns The formatted date string.
 */
export const formatDateForChatSections = (date: Date): string => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set the time to 00:00:00
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  // Convert the date to the local timezone
  date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)

  if (date.getTime() === today.getTime()) {
    return 'Today'
  } else if (date.getTime() === yesterday.getTime()) {
    return 'Yesterday'
  } else if (date.getFullYear() === today.getFullYear()) {
    return `${date.getDate()}-${date.getMonth() + 1}`
  } else {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  }
}

