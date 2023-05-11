import { Box, Stack, Badge, Flex, Heading, StatArrow, Stat } from "@chakra-ui/react"
import { useTranslation } from 'react-i18next'
import i18n from "i18n"
import { convertMeterToFeet } from "utils/unitCalculate"
import { MtInfoType } from "types/MtInfoType";
import { badgeColor } from "data/constant";

export default function Info({ 
  mountainInfo
}: {
  mountainInfo: MtInfoType
}) {
  const { t } = useTranslation()

  return (
    <Box>
      <Flex mt={12} alignItems="center" justifyContent="space-between">
        <Heading color="white">
          {t(`locationName.${mountainInfo.locationName}`)}
          <Badge colorScheme="gray" ml={2}>
            {mountainInfo.difficulty && `${t(`mtHeader.difficulty`)}：${mountainInfo.difficulty}`}
          </Badge>
        </Heading>
      </Flex>
      <Stack direction='row'>
        <Stat flex="unset" fontSize={'14px'}>
          <StatArrow type="increase" />
          {i18n.language === 'en' ? convertMeterToFeet(mountainInfo.height) : mountainInfo.height}
          {i18n.language === 'en' ? ' ft' : ' m'}
        </Stat>
        <Flex>
          {mountainInfo.cate.map((item) => (
            <Badge key={item} colorScheme={badgeColor[item]} mr={2}>{t(`mtTag.${item}`)}</Badge>
          ))}
        </Flex>
      </Stack>
    </Box>
  )
}