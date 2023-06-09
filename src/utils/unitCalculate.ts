export const convertCelsiusToFahrenheit = (temp: number): string => {
  return (temp * 1.8 + 32).toFixed(0)
}

export const convertMeterToFeet = (meter: number): string => {
  return (meter * 3.28).toFixed(0)
}