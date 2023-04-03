import { extendTheme } from '@chakra-ui/react'

const style = {
  colors: {
    black: '#000000',
    green: '#6eb32e',
  }
}

const breakpoints = {
  sm: '414px',
}

const config = {

}

const theme = extendTheme({ ...style, breakpoints, config })

export default theme