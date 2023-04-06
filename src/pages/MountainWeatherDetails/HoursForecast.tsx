import { Box, Image, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import SelectButtons from "components/SelectButtons";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { getHourWeatherDetail } from "utils/getWeather";
import { convertCelsiusToFahrenheit } from 'utils/unitCalculate'
import { TFunction } from "i18next";
import { hourWeatherListType } from "types/WeatherDataType"
import { hourTabs } from "data/constant";
import { TemperatureContext } from "context/TemperatureContext";

const TableBlock = ({ 
  data, 
  t,
  table
} : { 
  data: hourWeatherListType[],
  t: TFunction,
  table: string
}) => {
  const { isCelsius } = useContext(TemperatureContext)
  // console.log("data", data)
  return (
    <>
      {data.length > 0 &&
        data.map(({date, weatherData}) => (
          <Fragment key={date.date}>
            <Box bg="#c2ddf6" borderRadius={10} p={3} margin="25px 0 15px">
              {date.month}/{date.date}（{t(`time.daysOfTheWeek.${date.day}`)}）
            </Box>
            <TableContainer bg="white" borderRadius={10}>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>時間</Th>
                    {table === "table1" && (
                      <>
                        <Th textAlign={"center"}>天気 / 降水確率</Th>
                        <Th textAlign={"center"}>気温({isCelsius ? "°C" : "°F"})</Th>
                      </>)}
                    {table === "table2" && (
                    <>
                      <Th textAlign={"center"}>濕度</Th>
                      <Th textAlign={"center"}>風</Th>
                    </>)}
                    {table === "table3" && (
                    <>
                      <Th textAlign={"center"}>體感溫度({isCelsius ? "°C" : "°F"})</Th>
                      <Th textAlign={"center"}>舒適度</Th>
                    </>)}
                  </Tr>
                </Thead>
                <Tbody>
                  {table === "table1" &&
                  weatherData.length > 0 &&
                    weatherData.map((datum) => (
                      <Tr key={`${table}-${datum.time}`}>
                        <Td>{datum.time}點</Td>
                        <Td display={"flex"} flexDirection={"row"}>
                          {/* image need to change */}
                          <Image src="https://cdn1.n-kishou.co.jp/image/icon_weather/13.png" w="40px" />
                          {/* Wx 用 tooltip 表示 */}
                          <div>{datum.PoP || "--"}%</div>
                        </Td>
                        <Td>
                          {isCelsius 
                            ? datum.temp 
                            : convertCelsiusToFahrenheit(Number(datum.temp))
                          }
                        </Td>
                      </Tr>
                    ))
                  }
                  {table === "table2" &&
                  weatherData.length > 0 &&
                    weatherData.map((datum) => (
                      <Tr key={`${table}-${datum.time}`}>
                        <Td>{datum.time}點</Td>
                        <Td textAlign="center" bg="white">{datum.humidity}</Td>
                        {/* wind direction image */}
                        <Td textAlign="center" bg="white">{datum.wind.direction} / {datum.wind.speed}</Td>
                      </Tr>
                    ))
                  }
                  {table === "table3" &&
                  weatherData.length > 0 &&
                    weatherData.map((datum) => (
                      <Tr key={`${table}-${datum.time}`}>
                        <Td>{datum.time}點</Td>
                        <Td textAlign="center" bg="white">
                          {isCelsius 
                            ? datum.bodyTemp 
                            : convertCelsiusToFahrenheit(Number(datum.bodyTemp))
                          }
                        </Td>
                        <Td textAlign="center" bg="white">{datum.comfortIdx}</Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </Fragment>
        ))
      }
    </>
  )
}

export default function HoursForecast({ 
  hourWeatherData
}: {
  hourWeatherData: any[]
}) {
  const [selectedType, setSelectedType] = useState('table1')
  const { t } = useTranslation()
  const data: hourWeatherListType[] = getHourWeatherDetail(hourWeatherData)

  return (
    <>
      <SelectButtons
        tabs={hourTabs}
        setSelectedType={setSelectedType} 
      />
      <TableBlock data={data} t={t} table={selectedType} />
    </>
  )
}