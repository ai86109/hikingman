import { Box, Stack, Badge, Flex, Switch, Heading, StatArrow, Stat } from "@chakra-ui/react"
import { BasicInfoType } from "types/WeatherDataType"
import { useTranslation } from 'react-i18next'

export default function MtHeader({ 
  basicInfo 
}: {
  basicInfo: BasicInfoType
}) {
  const { t } = useTranslation()

  return (
    <Box>
      <Flex mt={12} alignItems="center" justifyContent="space-between">
        <Heading color="white">{t(`locationName.${basicInfo.locationName}`)}</Heading>
        {/* 攝氏華氏 */}
        <Switch colorScheme='teal' />
      </Flex>
      <Stack direction='row'>
        <Stat flex="unset" fontSize={'14px'}><StatArrow type="increase" />3251m</Stat>
        <Badge>百岳</Badge>
        <Badge colorScheme='blue'>五嶽</Badge>
        <Badge colorScheme='red'>中橫四辣</Badge>
        <Badge colorScheme='purple'>南橫三星</Badge>
      </Stack>
    </Box>
  )
}