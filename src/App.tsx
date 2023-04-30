import { Route, Routes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Header from 'components/Header';
import Home from 'pages/Home';
import MountainWeatherDetails from './pages/MountainWeatherDetails'

function App() {
  return (
    <Box className="App" maxW="500px" mx="auto">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mountainId' element={<MountainWeatherDetails />} />
      </Routes>
    </Box>
  );
}

export default App;
