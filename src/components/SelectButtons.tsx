import { Flex, Box, Image } from "@chakra-ui/react"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"

export default function SelectButtons({
  tabs,
  icons,
  selectedType,
  setSelectedType
} : {
  tabs: { [x: string]: string[] },
  icons: { [x: string]: string },
  selectedType: string,
  setSelectedType: Dispatch<SetStateAction<string>>
}) {
  const { t } = useTranslation()
  const handleClick = (tab: string) => setSelectedType(tab)

  return (
    <Flex wrap="wrap" textAlign="center" justifyContent="space-around">
      {Object.keys(tabs).map((tab: string) => (
        <Flex 
          key={tab} 
          bg="blue.100"
          w="45%" 
          p={3} 
          borderRadius={10} 
          mb={4} 
          fontSize="14px"
          onClick={() => handleClick(tab)}
          flexDirection="column"
          alignItems="center"
          opacity={tab === selectedType ? "1" : "0.5"}
        >
          <Image 
            src={icons[tab]}
            w="40px"
            mb={2}
          />
          {tabs[tab].map((item) => t(item)).join(' / ')}
        </Flex>
      ))}
      <Box bg="transparent" w="45%" padding={5} borderRadius={10} mb={4}></Box>
    </Flex>
  )
}