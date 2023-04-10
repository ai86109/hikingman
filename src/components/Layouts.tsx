import { Box, Flex, Switch } from '@chakra-ui/react';
import { TemperatureContext } from 'context/TemperatureContext';
import i18n from 'i18n';
import { useContext } from 'react';

export default function Layouts() {
  const { isCelsius, toggleTemperature } = useContext(TemperatureContext)

  const handleChange = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh-tw' : 'en')
    if(
      (i18n.language === 'en' && isCelsius) || 
      (i18n.language !== 'en' && !isCelsius)
    ) toggleTemperature()
  }

  return (
    <Flex bg="green" p={2} mb={6} justifyContent="space-between">
      <Switch colorScheme='teal' isChecked={isCelsius} onChange={toggleTemperature} />
      <Box onClick={handleChange}>
        {i18n.language === 'en' ? '中文' : "EN"}
      </Box>
    </Flex>
  )
}