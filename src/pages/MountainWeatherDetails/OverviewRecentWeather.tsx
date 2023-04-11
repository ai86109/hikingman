import { Box, Flex, Grid, GridItem, Image, Text, Divider, Tooltip } from "@chakra-ui/react";
import { TemperatureContext } from "context/TemperatureContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { getDateInfo, getTime } from "utils/getDate";
import { getWxName, getPoP6hrOfTheDay } from "utils/getWeather";
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'

type TimeType = 'today' | 'tomorrow'

const TempBlock = ({ 
  isCelsius,
  isMax,
  temp,
  t
} : {
  isCelsius: boolean,
  isMax: boolean,
  temp: number,
  t: TFunction
}) => {
  const mainBg = isMax ? "#ed4350" : "#1477d0"

  return (
    <Box bg={mainBg} w={110} borderRadius={10} textAlign="center" borderWidth={2} borderColor={mainBg}>
      <Text as="b" color="white">
        {isMax ? t(`overviewRecentWeather.max`) : t(`overviewRecentWeather.min`)}
      </Text>
      <Box bg="white" color={mainBg} borderBottomRadius={8}>
        <Text as="b">
          {isCelsius 
            ? temp 
            : convertCelsiusToFahrenheit(temp)
          }
          {isCelsius ? "°C" : "°F"}
        </Text>
      </Box>
    </Box>
  )
}

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
  const weather = time === 'today' ? weekWeatherData[12].time[0] : weekWeatherData[12].time[1]
  const maxTemp = time === 'today' ? weekWeatherData[3].time[0].elementValue.value : weekWeatherData[3].time[1].elementValue.value
  const minTemp = time === 'today' ? weekWeatherData[4].time[0].elementValue.value : weekWeatherData[4].time[1].elementValue.value
  const PoP6hr = time === 'today' ? PoP[0] : PoP[1]

  return (
    <Flex direction={{ base: "row" }} justify={{ base: "space-between" }}>
      <Flex direction={{ base: "column" }} alignItems={{ base: "center" }} w="150px">
        <Text fontSize="md" as="b">{t(`time.${time}`)}</Text>
        <Text fontSize="md" as="b">
          {month}/{date}
          ({t(`time.daysOfTheWeek.${day}`)})
        </Text>
        <Flex direction={{ base: "column" }} alignItems={{ base: "center" }} mt={4}>
          <Tooltip label={t(`Wx.${getWxName(weather.elementValue[0].value)}`)}>
            <Image 
              src={require(`assets/icons/Wx/wx_${getTime(weather.startTime) < 18 ? "day" : "night"}_${weather.elementValue[1].value}.svg`)} 
              alt={t(`Wx.${getWxName(weather.elementValue[0].value)}`) || "--"}
              boxSize="54px"
              objectFit={'contain'}
            />
          </Tooltip>
          <Text fontSize="sm" as="b" textAlign={'center'}>{t(`Wx.${getWxName(weather.elementValue[0].value)}`)}</Text>
        </Flex>
      </Flex>
      <Box w="250px">
        <Flex direction={{ base: "row" }} justify={{ base: "space-between" }} mb={2}>
          <TempBlock isCelsius={isCelsius} isMax={true} temp={maxTemp} t={t} />
          <TempBlock isCelsius={isCelsius} isMax={false} temp={minTemp} t={t} />
        </Flex>
        <Grid 
          templateColumns="repeat(5, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap="1px"
          bg="gray"
          borderRadius={10}
          textAlign="center"
          overflow="hidden"
          fontSize={14}
          borderColor="gray"
          borderWidth="1px"
          mt={4}
        >
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">
            {t('overviewRecentWeather.time')}
          </GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">0-6</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">6-12</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">12-18</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">18-24</GridItem>
          <GridItem w="100%" h="10" bg="gray.100" lineHeight="3em">
            {t('overviewRecentWeather.PoP')}
          </GridItem>
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
    <Box bg="white" borderRadius={10} px={2} py={8} mt={4}>
      <RecentWeatherBlock time="today" weekWeatherData={weekWeatherData} PoP={PoP6hr} />
      <Divider orientation='horizontal' m={[5, 0]} w="unset" />
      <RecentWeatherBlock time="tomorrow" weekWeatherData={weekWeatherData} PoP={PoP6hr} />
    </Box>
  )
}