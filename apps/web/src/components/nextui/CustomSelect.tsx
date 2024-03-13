import { Chip, Select, SelectItem } from '@nextui-org/react'

interface SelectProps {
  label?: string
  isMultiple: boolean
  description?: string
  placeholder?: string
  isDisabled?: boolean
  values: { label: string; value: string }[]
}

const CustomSelect = ({
  label,
  isMultiple,
  description,
  placeholder,
  isDisabled,
  values,
}: SelectProps) => {
  return (
    <Select
      items={values}
      label={label}
      variant='bordered'
      isMultiline={true}
      selectionMode={isMultiple ? 'multiple' : 'single'}
      placeholder={placeholder}
      labelPlacement='outside'
      isDisabled={isDisabled}
      description={description}
      renderValue={(items) => (
        <div className='flex flex-wrap gap-2'>
          {items.map((item) =>
            isMultiple ? (
              <Chip className='bg-appColors-lightBlue' key={item.key}>
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
            '!bg-appColors-backgroundBlue',
            'data-[hover=true]:!bg-appColors-lightBlue',
          ],
        },
      }}
      classNames={{
        value: '!text-appColors-text ',
        listbox: '!text-appColors-textGray',
        trigger: [
          '!text-appColors-blue',
          '!border-none',
          'rounded-md',
          'shadow-lg',
          'bg-transparent',
          'ring-1',
          'ring-inset',
          '!ring-appColors-gray/30',
        ],
        description: 'text-appColors-gray text-sm font-light',
        label: ['!text-appColors-text text-lg !font-normal'],
      }}
    >
      {values.map((item) => (
        <SelectItem key={item.value} textValue={item.label}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  )
}
export default CustomSelect
