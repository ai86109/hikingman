import { Flex, Box } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"

export default function SelectButtons({
  tabs,
  setSelectedType
} : {
  tabs: { [x: string]: string[] }
  setSelectedType: Dispatch<SetStateAction<string>>
}) {
  const { t } = useTranslation()
  const handleClick = (tab: string) => setSelectedType(tab)

  return (
    <Flex wrap="wrap" textAlign="center" justifyContent="space-around">
      {Object.keys(tabs).map((tab: string) => (
        <Box 
          key={tab} 
          bg="blue.100" 
          w="45%" 
          p={5} 
          borderRadius={10} 
          mb={4} 
          fontSize="14px"
          onClick={() => handleClick(tab)}
        >
          {tabs[tab].map((item) => t(item)).join(' / ')}
        </Box>
      ))}
      <Box bg="transparent" w="45%" padding={5} borderRadius={10} mb={4}></Box>
    </Flex>
  )
}