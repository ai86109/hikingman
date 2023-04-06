import { Route, Routes } from 'react-router-dom';
import Layouts from 'components/Layouts';
import Home from 'pages/Home';
import MountainWeatherDetails from './pages/MountainWeatherDetails'

function App() {
  return (
    <div className="App">
      <Layouts />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mountainId' element={<MountainWeatherDetails />} />
      </Routes>
    </div>
  );
}

export default App;
