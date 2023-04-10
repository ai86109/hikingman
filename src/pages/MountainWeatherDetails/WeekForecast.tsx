import { Image, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getWeekWeatherDetail } from "utils/getWeather";
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'
import { sunriseAndSunsetTime, weekWeatherDataType } from "types/WeatherDataType"
import { TFunction } from "i18next";
import SelectButtons from "components/SelectButtons";
import { weekTabs } from "data/constant";
import { TemperatureContext } from "context/TemperatureContext";

const TableBlock = ({ 
  data, 
  t,
  table
} : { 
  data: weekWeatherDataType[],
  t: TFunction,
  table: string
}) => {
  const { isCelsius } = useContext(TemperatureContext)
  return (
    <TableContainer bg="white" borderRadius={10}>
      <Table variant='simple' bg="gray.200">
        <Thead>
          <Tr>
            <Th></Th>
            {table === "table1" && (
            <>
              <Th textAlign={"center"}>天気 / 降水確率</Th>
              <Th textAlign={"center"}>気温({isCelsius ? "°C" : "°F"})</Th>
            </>)}
            {table === "table2" && (
            <>
              <Th textAlign={"center"}>體感溫度({isCelsius ? "°C" : "°F"})</Th>
              <Th textAlign={"center"}>濕度</Th>
              <Th textAlign={"center"}>風</Th>
            </>)}
            {table === "table3" && (
            <>
              <Th textAlign={"center"}>舒適度</Th>
              <Th textAlign={"center"}>日出日落</Th>
            </>)}
          </Tr>
        </Thead>
        <Tbody>
          {table === "table1" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td>{datum.date.month}/{datum.date.date} ({t(`time.daysOfTheWeek.${datum.date.day}`)})</Td>
                <Td display={"flex"} flexDirection={"row"} bg="white">
                  {/* image need to change */}
                  <Image src="https://cdn1.n-kishou.co.jp/image/icon_weather/13.png" w="40px" /> 
                  {/* Wx 用 tooltip 表示 */}
                  <div>{datum.PoP || "--"}%</div>
                </Td>
                <Td textAlign="center" bg="white">
                  {isCelsius 
                    ? datum.maxTemp 
                    : convertCelsiusToFahrenheit(Number(datum.maxTemp))
                  } / 
                  {isCelsius 
                    ? datum.minTemp : 
                    convertCelsiusToFahrenheit(Number(datum.minTemp))
                  }
                </Td>
              </Tr>
            ))
          }
          {table === "table2" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td>{datum.date.month}/{datum.date.date} ({t(`time.daysOfTheWeek.${datum.date.day}`)})</Td>
                <Td textAlign="center" bg="white">
                  {isCelsius 
                    ? datum.maxBodyTemp 
                    : convertCelsiusToFahrenheit(Number(datum.maxBodyTemp))
                  } / 
                  {isCelsius 
                    ? datum.minBodyTemp 
                    : convertCelsiusToFahrenheit(Number(datum.minBodyTemp))
                  }
                </Td>
                <Td textAlign="center" bg="white">{datum.humidity}</Td>
                {/* wind direction image */}
                <Td textAlign="center" bg="white">{datum.wind.direction} / {datum.wind.speed}</Td>
              </Tr>
            ))
          }
          {table === "table3" &&
          data.length > 0 && 
            data.map((datum) => (
              <Tr key={`${table}-${datum.date.day}`}>
                <Td>{datum.date.month}/{datum.date.date} ({t(`time.daysOfTheWeek.${datum.date.day}`)})</Td>
                <Td textAlign="center" bg="white">{datum.maxComfortIdx} / {datum.minComfortIdx}</Td>
                {/* sunrise / sunset */}
                <Td textAlign="center" bg="white">
                  {datum.sunriseAndSunset.sunRiseTime} / {datum.sunriseAndSunset.sunSetTime}
                </Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default function WeekForecast({ 
  weekWeatherData,
  sunriseAndSunsetList
}: {
  weekWeatherData: any[],
  sunriseAndSunsetList: sunriseAndSunsetTime[]
}) {
  const { t } = useTranslation()
  const [selectedType, setSelectedType] = useState('table1')
  const data = getWeekWeatherDetail(weekWeatherData, sunriseAndSunsetList)

  return (
    <>
      <SelectButtons 
        tabs={weekTabs}
        setSelectedType={setSelectedType} 
      />
      <TableBlock data={data} t={t} table={selectedType} />
    </>
  )
}