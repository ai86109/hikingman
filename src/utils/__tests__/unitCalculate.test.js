import { convertCelsiusToFahrenheit, convertMeterToFeet } from "../unitCalculate.ts"

describe('convertCelsiusToFahrenheit', () => {
  test('case1_integer', () => {
    expect(convertCelsiusToFahrenheit(10)).toBe("50")
  })

  test('case2_decimal', () => {
    expect(convertCelsiusToFahrenheit(1.234)).toBe("34")
  })

  test('case3_negative', () => {
    expect(convertCelsiusToFahrenheit(-21.44)).toBe("-7")
  })
})

describe('convertMeterToFeet', () => {
  test('case1_integer', () => {
    expect(convertMeterToFeet(1000)).toBe("3280")
  })

  test('case2_decimal', () => {
    expect(convertMeterToFeet(3456.789)).toBe("11338")
  })
})