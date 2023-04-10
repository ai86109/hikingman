import { Card, CardBody, CardFooter, Stack, Heading, Button, Flex } from '@chakra-ui/react'
import { TemperatureContext } from 'context/TemperatureContext'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { WeatherMapType, WeatherDataType } from 'types/WeatherDataType'
import { getWxName } from 'utils/getWeather'
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'
import { getSearchedList } from 'utils/search'

export default function Lists({ 
  data,
  inputVal
}: {
  data: WeatherMapType,
  inputVal: string
} ) {
  const { isCelsius } = useContext(TemperatureContext)
  const { t } = useTranslation()
  const list = getSearchedList(Array.from(data.values()), inputVal, t)
  // console.log("list", list)
  // let res: any = {}
  // for(let [key, value] of (data as any).entries()) {
  //   res[key] = {
  //     "locationName": value.basicInfo.locationName,
  //     "height": 3,
  //     "cate": [],
  //     "park": "",
  //     "county": [],
  //     "difficulty": ""
  //   }
  // }
  // let ress: any = {}
  // const sortedKeys = Object.keys(res).sort()
  // for(let i = 0; i < sortedKeys.length; i++) {
  //   ress[sortedKeys[i]] = res[sortedKeys[i]]
  // }

  // console.log("ress", ress)

  return (
    <>
      {list.length > 0 &&
        list.map((mountain: WeatherDataType) => (
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
                  <div>
                    {isCelsius 
                      ? mountain.hourWeatherData[0].time[0].elementValue.value 
                      : convertCelsiusToFahrenheit(mountain.hourWeatherData[0].time[0].elementValue.value)
                    }
                    {isCelsius ? "°C" : "°F"}
                  </div>
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