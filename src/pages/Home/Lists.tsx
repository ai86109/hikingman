import { Card, CardBody, CardFooter, Stack, Heading, Button, Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { WeatherMapType, WeatherDataType } from 'types/WeatherDataType'
import { getWxName } from 'utils/getWeather'

export default function Lists({ 
  data 
}: {
  data: WeatherMapType
} ) {
  const { t } = useTranslation()

  return (
    <>
      {data.size > 0 &&
        Array.from(data.values()).map((mountain: WeatherDataType) => (
          <Card
            key={mountain.basicInfo.id}
            direction={{ base: 'row' }}
            alignItems={{ base: 'center' }}
            overflow='hidden'
            cursor='pointer'
          >
            <Heading size='md' whiteSpace='nowrap'>{t(`locationName.${mountain.basicInfo.locationName}`)}</Heading>
            <Stack flexGrow={2} direction={{ base: 'row' }} alignItems={{ base: 'center' }}>
              <CardBody>
                <Flex>
                  <div>{t(`Wx.${getWxName(mountain.hourWeatherData[9].time[0].elementValue[0].value)}`)}</div>，
                  <div>{mountain.hourWeatherData[0].time[0].elementValue.value}</div>度
                </Flex>
              </CardBody>
              <CardFooter>
                <Link to={mountain.basicInfo.id}>
                  <Button variant='solid' colorScheme='blue'>
                    詳細
                  </Button>
                </Link>
              </CardFooter>
            </Stack>
          </Card>
        ))
      }
    </>
  )
}