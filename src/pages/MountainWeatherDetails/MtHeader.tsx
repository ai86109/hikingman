import { Box, Stack, Badge, Flex, Heading, StatArrow, Stat } from "@chakra-ui/react"
import { BasicInfoType } from "types/WeatherDataType"
import { useTranslation } from 'react-i18next'
import i18n from "i18n"
import { convertMeterToFeet } from "utils/unitCalculate"

export default function MtHeader({ 
  basicInfo 
}: {
  basicInfo: BasicInfoType
}) {
  const { t } = useTranslation()

  return (
    <Box>
      <Flex mt={12} alignItems="center" justifyContent="space-between">
        <Heading color="white">
          {t(`locationName.${basicInfo.locationName}`)}
        </Heading>
      </Flex>
      <Stack direction='row'>
        <Stat flex="unset" fontSize={'14px'}>
          <StatArrow type="increase" />
            {i18n.language === 'en' ? convertMeterToFeet(3251) : 3251}
            {i18n.language === 'en' ? 'ft' : 'm'}
        </Stat>
        <Badge>百岳</Badge>
        <Badge colorScheme='blue'>五嶽</Badge>
        <Badge colorScheme='red'>中橫四辣</Badge>
        <Badge colorScheme='purple'>南橫三星</Badge>
      </Stack>
    </Box>
  )
}