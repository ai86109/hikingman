import { Input } from "@chakra-ui/react"

export default function Search({ 
  inputVal, 
  handleChange
} : { 
  inputVal: string, 
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <Input placeholder='輸入想查詢的山' value={inputVal} onChange={handleChange} />
  )
}