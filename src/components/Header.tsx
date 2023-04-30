import { Box, Flex, Switch } from '@chakra-ui/react';
import { TemperatureContext } from 'context/TemperatureContext';
import i18n from 'i18n';
import { useContext } from 'react';

export default function Header() {
  const { isCelsius, toggleTemperature } = useContext(TemperatureContext)

  const handleChange = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh-TW' : 'en')
    if(
      (i18n.language === 'en' && isCelsius) || 
      (i18n.language !== 'en' && !isCelsius)
    ) toggleTemperature()
  }

  return (
    <Flex bg="green" p={2} justifyContent="flex-end" alignItems="center">
      <Switch colorScheme='teal' isChecked={isCelsius} onChange={toggleTemperature} mr={4} />
      <Box onClick={handleChange} cursor="pointer">
        {i18n.language === 'en' ? '中文' : "EN"}
      </Box>
    </Flex>
  )
}