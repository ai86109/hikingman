import { createContext, useState, ReactNode } from "react"

interface TemperatureContextType {
  isCelsius: boolean,
  toggleTemperature: () => void,
}

interface TemperatureContextProviderPropsType {
  children: ReactNode
}

const TemperatureContext = createContext<TemperatureContextType>({
  isCelsius: true,
  toggleTemperature: () => {}
})

const TemperatureContextProvider = ({children}: TemperatureContextProviderPropsType) => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true)
  const toggleTemperature = () => setIsCelsius(!isCelsius)

  return (
    <TemperatureContext.Provider value={{ isCelsius, toggleTemperature }}>
      {children}
    </TemperatureContext.Provider>
  )
}

export { TemperatureContext, TemperatureContextProvider }