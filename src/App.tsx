import { Route, Routes } from 'react-router-dom';
import Layouts from 'components/Layouts';
import Home from 'pages/Home';
import MountainWeatherDetails from './pages/MountainWeatherDetails'
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box className="App" maxW="500px" mx="auto">
      <Layouts />
      <Routes>
        <Route path='/hikingman/' element={<Home />} />
        <Route path='/hikingman/:mountainId' element={<MountainWeatherDetails />} />
      </Routes>
    </Box>
  );
}

export default App;
