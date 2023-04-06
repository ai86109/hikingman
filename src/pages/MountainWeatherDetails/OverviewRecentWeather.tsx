import { Box, Flex, Grid, GridItem, Image, Text, Divider } from "@chakra-ui/react";
import { TemperatureContext } from "context/TemperatureContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { getDateInfo } from "utils/getDate";
import { getWxName, getPoP6hrOfTheDay } from "utils/getWeather";
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'

type TimeType = 'today' | 'tomorrow'

const RecentWeatherBlock = ({ 
  time, 
  weekWeatherData,
  PoP
} : { 
  time: TimeType,
  weekWeatherData: any[],
  PoP: string[][]
}) => {
  const { isCelsius } = useContext(TemperatureContext)
  const { t } = useTranslation()
  const { month, date, day } = time === 'today' ? getDateInfo() : getDateInfo(undefined, 1)
  const weather = time === 'today' ? weekWeatherData[12].time[0].elementValue[0].value : weekWeatherData[12].time[1].elementValue[0].value
  const maxTemp = time === 'today' ? weekWeatherData[3].time[0].elementValue.value : weekWeatherData[3].time[1].elementValue.value
  const minTemp = time === 'today' ? weekWeatherData[4].time[0].elementValue.value : weekWeatherData[4].time[1].elementValue.value
  const PoP6hr = time === 'today' ? PoP[0] : PoP[1]

  return (
    <Flex direction={{ base: "row" }} justify={{ base: "space-between" }}>
      <Flex direction={{ base: "column" }} alignItems={{ base: "center" }}>
        <Text fontSize="md" as="b">{t(`time.${time}`)}</Text>
        <Text fontSize="md" as="b">
          {month}/{date}
          ({t(`time.daysOfTheWeek.${day}`)})
        </Text>
        <Flex direction={{ base: "column" }} alignItems={{ base: "center" }} mt={4}>
          {/* link to weather image */}
          <Image src="https://cdn1.n-kishou.co.jp/image/icon_weather/42.png" boxSize="54px" objectFit={'contain'} />
          {/* text length might reflect layout */}
          <Text fontSize="sm" as="b">{t(`Wx.${getWxName(weather)}`)}</Text>
        </Flex>
      </Flex>
      <Box>
        <Flex direction={{ base: "row" }} justify={{ base: "space-between" }} mb={2}>
          <Box bg="#ed4350" w={110} borderRadius={10} textAlign="center" borderWidth={2} borderColor="#ed4350">
            <Text as="b" color="white">最高</Text>
            <Box bg="white" color="#ed4350" borderBottomRadius={8}>
              <Text as="b">
                {isCelsius 
                  ? maxTemp 
                  : convertCelsiusToFahrenheit(maxTemp)
                }
                {isCelsius ? "°C" : "°F"}
              </Text>
            </Box>
          </Box>
          <Box bg="#1477d0" w={110} borderRadius={10} textAlign="center" borderWidth={2} borderColor="#1477d0">
            <Text as="b" color="white">最低</Text>
            <Box bg="white" color="#1477d0" borderBottomRadius={8}>
              <Text as="b">
                {isCelsius 
                  ? minTemp 
                  : convertCelsiusToFahrenheit(minTemp)
                }
                {isCelsius ? "°C" : "°F"}
              </Text>
            </Box>
          </Box>
        </Flex>
        <Grid 
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap="1px"
          bg="gray"
          borderRadius={10}
          textAlign="center"
          overflow="hidden"
          fontSize={12}
          borderColor="gray"
          borderWidth="1px"
        >
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">時間</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">0-6</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">6-12</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">12-18</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">18-24</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">降雨機率</GridItem>
          {PoP6hr.map((value, index) => (
            <GridItem key={index} w="100%" h="10" bg="white" lineHeight="3em">
              {value}{value !== "--" && "%"}
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  )
}

export default function OverviewRecentWeather({ 
  weekWeatherData,
  hourWeatherData
}: {
  weekWeatherData: any[],
  hourWeatherData: any[]
}) {
  const PoP6hr = getPoP6hrOfTheDay(hourWeatherData[3].time)

  return (
    <Box bg="white" borderRadius={10} padding={[8, 6]} mt={4}>
      <RecentWeatherBlock time="today" weekWeatherData={weekWeatherData} PoP={PoP6hr} />
      <Divider orientation='horizontal' m={[5, 0]} w="unset" />
      <RecentWeatherBlock time="tomorrow" weekWeatherData={weekWeatherData} PoP={PoP6hr} />
    </Box>
  )
}