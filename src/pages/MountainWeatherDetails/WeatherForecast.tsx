import { Box, TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { SunriseAndSunsetTimeType, WeatherElementType } from "types/WeatherDataType";
import HoursForecast from "./HoursForecast";
import WeekForecast from "./WeekForecast";

export default function WeatherForecast({ 
  weekForecastWeatherData,
  hourForecastWeatherData,
  sunriseAndSunsetList
}: {
  weekForecastWeatherData: WeatherElementType[],
  hourForecastWeatherData: WeatherElementType[],
  sunriseAndSunsetList: SunriseAndSunsetTimeType[]
}) {
  const { t } = useTranslation()

  return (
    <Box mt={6}>
      <Tabs isFitted isLazy variant='enclosed'>
        <TabList bg='whiteAlpha.400' borderTopRadius={10}>
          <Tab _selected={{ color: 'black', bg: 'white' }}>{t('forecast.week')}</Tab>
          <Tab _selected={{ color: 'black', bg: 'white' }}>{t('forecast.threeHours')}</Tab>
        </TabList>
        <TabPanels bg="white">
          <TabPanel px="unset">
            <WeekForecast weekForecastWeatherData={weekForecastWeatherData} sunriseAndSunsetList={sunriseAndSunsetList} />
          </TabPanel>
          <TabPanel>
            <HoursForecast hourForecastWeatherData={hourForecastWeatherData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}