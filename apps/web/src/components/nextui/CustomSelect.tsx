import { Chip, Select, SelectItem } from '@nextui-org/react'
import { ChangeEventHandler } from 'react'

interface SelectProps {
  label?: string
  isMultiple: boolean
  description?: string
  placeholder?: string
  isDisabled?: boolean
  value: string
  options: { label: string; value: string }[]
  onChange: ChangeEventHandler<HTMLSelectElement>
}

const CustomSelect = ({
  label,
  isMultiple,
  description,
  placeholder,
  isDisabled,
  value,
  options,
  onChange,
}: SelectProps) => {
  return (
    <Select
      items={options}
      label={label}
      variant='bordered'
      isMultiline={true}
      selectionMode={isMultiple ? 'multiple' : 'single'}
      placeholder={placeholder}
      selectedKeys={[value]}
      defaultSelectedKeys={[value]}
      labelPlacement='outside'
      isDisabled={isDisabled}
      onChange={onChange}
      description={description}
      renderValue={(items) => (
        <div className='flex flex-wrap gap-2'>
          {items.map((item) =>
            isMultiple ? (
              <Chip className='bg-appColors-babyBlue' key={item.key}>
                {item.textValue}
              </Chip>
            ) : (
              <h4>{item.textValue}</h4>
            )
          )}
        </div>
      )}
      listboxProps={{
        itemClasses: {
          base: [
            '!bg-appColors-blueWhite',
            'data-[hover=true]:!bg-appColors-babyBlue',
          ],
        },
      }}
      classNames={{
        value: '!text-appColors-primaryText ',
        listbox: '!text-appColors-textGray',
        trigger: [
          '!text-appColors-primary',
          '!border-none',
          'rounded-md',
          'shadow-lg',
          'bg-transparent',
          'ring-1',
          'ring-inset',
          '!ring-appColors-gray/30',
        ],
        description: 'text-appColors-gray text-sm font-light',
        label: ['!text-appColors-primaryText text-lg !font-normal'],
      }}
    >
      {options.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  )
}
export default CustomSelect

