import { extendTheme } from '@chakra-ui/react'

const style = {
  colors: {
    black: '#000000',
    yyy: '#C53030',
  }
}

const breakpoints = {}

const config = {

}

const theme = extendTheme({ ...style, breakpoints, config })

export default theme