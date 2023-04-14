import { Route, Routes } from 'react-router-dom';
import Layouts from 'components/Layouts';
import Home from 'pages/Home';
import MountainWeatherDetails from './pages/MountainWeatherDetails'

function App() {
  return (
    <div className="App">
      <Layouts />
      <Routes>
        <Route path='/hikingman/' element={<Home />} />
        <Route path='/hikingman/:mountainId' element={<MountainWeatherDetails />} />
      </Routes>
    </div>
  );
}

export default App;
