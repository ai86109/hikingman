import { Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

export default function NoData() {
  const { t } = useTranslation()
  return (
    <Flex justifyContent="center" pt={6}>
      <Text as="b" fontSize={18}>{t('error.nodata')}</Text>
    </Flex>
  )
}