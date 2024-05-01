import { useState } from 'react'
import { CustomSearcherInput } from '@/components/nextui/CustomSearcherInput'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

interface SearchChatsProps {
  placeholder?: string
  styles?: {}
  data: Array<{ [key: string]: string }>
  onFilter: (filteredUsers: any) => void
  searchProperty: string
}

const SearchAndFilterChats = ({
  placeholder,
  styles,
  data,
  onFilter,
  searchProperty,
}: SearchChatsProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)

    const filteredData = data.filter((item: any) =>
      item[searchProperty].toLowerCase().includes(newSearchTerm.toLowerCase())
    )

    onFilter(filteredData)
  }

  return (
    <CustomSearcherInput
      type='text'
      placeholder={placeholder}
      classNames={styles}
      onChange={handleInputChange}
      value={searchTerm}
      startContent={
        <div className='p-1 mr-2 rounded-md'>
          <MagnifyingGlassIcon className='w-5 text-appColors-primary' />
        </div>
      }
    />
  )
}

export default SearchAndFilterChats

