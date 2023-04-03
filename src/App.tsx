import { Route, Routes } from 'react-router-dom';
import MountainWeatherDetails from './pages/MountainWeatherDetails'
import Home from 'pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:mountainId' element={<MountainWeatherDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
