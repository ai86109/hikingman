import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { Search2Icon } from '@chakra-ui/icons'

export default function SearchBar({ 
  placeholder,
  inputVal, 
  handleChange
} : { 
  placeholder: string,
  inputVal: string, 
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <InputGroup m={2} w="90%">
      <InputLeftElement
        pointerEvents='none'
        children={<Search2Icon color='gray.300' />}
      />
      <Input 
        placeholder={placeholder} 
        value={inputVal} 
        onChange={handleChange} 
      />
    </InputGroup>
  )
}