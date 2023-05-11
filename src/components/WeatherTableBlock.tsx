import { Flex, Image, SystemCSSProperties, Text, Tooltip } from "@chakra-ui/react"
import { windDirection } from "data/constant"
import { useTranslation } from "react-i18next"
import { getCIindex, getWxName } from "utils/getWeather"
import { convertCelsiusToFahrenheit } from "utils/unitCalculate"
import TdContainer from "./TdContainer"

export const WeatherAndPoPBlock = ({
  Wx, PoP, isDayTime, style
} : { 
  Wx: { text: string, index: string },
  PoP: string,
  isDayTime: boolean,
  style?: SystemCSSProperties
}) => {
  const { t } = useTranslation()
  return (
    <TdContainer style={{...style}}>
      <Flex justifyContent="center" alignItems="center">
        <Tooltip label={t(`Wx.${getWxName(Wx.text)}`)}>
          <Image 
            src={require(`assets/icons/Wx/wx_${isDayTime ? "day" : "night"}_${Wx.index}.svg`)} 
            alt={t(`Wx.${getWxName(Wx.text)}`) || "--"}
            boxSize="40px"
            objectFit={'contain'}
          />
        </Tooltip>
        <Text ml={2} as="b">{PoP || "--"}%</Text>
      </Flex>
    </TdContainer>
  )
}

export const SingleTemperatureBlock = ({ 
  temp, isCelsius, style
} : { 
  temp: string, 
  isCelsius: boolean,
  style?: SystemCSSProperties
}) => {
  return (
    <TdContainer style={{...style}}>
      <Text as="b">
        {isCelsius 
          ? temp 
          : convertCelsiusToFahrenheit(Number(temp))
        }
      </Text>
    </TdContainer>
  )
}

export const MultiTemperatureBlock = ({ 
  maxTemp, minTemp, isCelsius, style
} : { 
  maxTemp: string, 
  minTemp: string,
  isCelsius: boolean,
  style?: SystemCSSProperties
}) => {
  return (
    <TdContainer style={{...style}}>
      <Flex justifyContent="center">
        <Text color="#ed4350" as="b">
          {isCelsius 
            ? maxTemp 
            : convertCelsiusToFahrenheit(Number(maxTemp))
          }
        </Text>
        <Text mx={2}>/</Text>
        <Text color="#1477d0" as="b">
          {isCelsius 
            ? minTemp 
            : convertCelsiusToFahrenheit(Number(minTemp))
          }
        </Text>
      </Flex>
    </TdContainer>
  )
}

export const HumidityBlock = ({
  humidity, style
} : {
  humidity: string,
  style?: SystemCSSProperties
}) => {
  return <TdContainer style={{...style}}>{humidity || "--"}%</TdContainer>
}

export const WindBlock = ({
  wind, style
} : {
  wind: { direction: string, speed: string },
  style?: SystemCSSProperties
}) => {
  return (
    <TdContainer style={{...style}}>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Image
          src={require('assets/icons/windDirection.png')}
          w="14px"
          mb={1}
          transform={`rotate(${windDirection[wind.direction]}deg)`}
        />
        <Text as="b">{isNaN(Number(wind.speed)) ? "0~1" : wind.speed}</Text>
      </Flex>
    </TdContainer>
  )
}

export const CIBlock = ({
  maxIndex, minIndex, style
} : {
  maxIndex: number,
  minIndex: number,
  style?: SystemCSSProperties
}) => {
  const { t } = useTranslation()
  const max = getCIindex(maxIndex)
  const min = getCIindex(minIndex)

  return (
    <TdContainer style={{...style}}>
      <Flex alignItems="center" justifyContent="center">
        {max !== min && 
          <>
            <Tooltip label={`${t(`CItext.${min}`)}，${minIndex}`}>
              <Image w="50px" src={require(`assets/icons/CI/${min}.svg`)} />
            </Tooltip>
            ～
          </>}
        <Tooltip label={`${t(`CItext.${max}`)}，${maxIndex}`}>
          <Image w="50px" src={require(`assets/icons/CI/${max}.svg`)} />
        </Tooltip>
      </Flex>
    </TdContainer>
  )
}

export const SunriseAndSunset = ({
  sunriseAndSunset, style
} : {
  sunriseAndSunset: { sunRiseTime: string, sunSetTime: string },
  style?: SystemCSSProperties
}) => {
  return (
    <TdContainer style={{...style}}>
      {sunriseAndSunset.sunRiseTime.length > 0
        ? <>{sunriseAndSunset.sunRiseTime} / {sunriseAndSunset.sunSetTime}</>
        : <>--</>
      }
    </TdContainer>
  )
}