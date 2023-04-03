import { Box, TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import HoursForecast from "./HoursForecast";
import WeekForecast from "./WeekForecast";

export default function WeatherForecast({ 
  weekWeatherData,
  hourWeatherData
}: {
  weekWeatherData: any[],
  hourWeatherData: any[]
}) {
  return (
    <Box mt={6}>
      <Tabs isFitted isLazy variant='enclosed'>
        <TabList bg='whiteAlpha.400' borderTopRadius={10}>
          <Tab _selected={{ color: 'black', bg: 'white' }}>一週</Tab>
          <Tab _selected={{ color: 'black', bg: 'white' }}>每三小時</Tab>
        </TabList>
        <TabPanels bg="white">
          <TabPanel px="unset">
            <WeekForecast weekWeatherData={weekWeatherData} />
          </TabPanel>
          <TabPanel>
            <HoursForecast hourWeatherData={hourWeatherData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}